const User = require('../models/user');

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

module.exports = { register_POST };
