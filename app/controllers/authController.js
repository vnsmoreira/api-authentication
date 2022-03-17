const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../config/jwt');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const register_POST = async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' });
  }
};

const authenticate_POST = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (error) {
    return res.status(400).send({ error: 'Authentication failed' });
  }
};

const forgot_password_POST = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'vnsmoreira.me@gmail.com',
        template: 'auth/forgot_password',
        context: { token },
      },
      err => {
        if (err) {
          return res.status(400).send({ error: 'Cannot send forgot password email' });
        }

        return res.send();
      }
    );
  } catch (error) {
    res.status(400).send({ error: 'Error on forgot password, try again' });
  }
};

const reset_password_POST = async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({ error: 'Token invalid' });
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      return res.status(400).send({ error: 'Token expired, generate a new one' });
    }

    user.password = password;

    await user.save();

    res.send();
  } catch (error) {
    res.status(400).send({ error: 'Cannot reset password, try again' });
  }
};

module.exports = { register_POST, authenticate_POST, forgot_password_POST, reset_password_POST };
