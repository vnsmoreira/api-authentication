const jwt = require('jsonwebtoken');

const generateToken = (params = {}) => {
  const token = jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });

  return token;
};

module.exports = { generateToken };
