const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register_POST = async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' });
  }
};

const authenticate_POST = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  user.password = undefined;

  res.send({ user });
};

module.exports = { register_POST, authenticate_POST };
