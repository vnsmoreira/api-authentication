const User = require('../models/user');

const register_POST = async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.send(user);
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed' });
  }
};

module.exports = { register_POST };
