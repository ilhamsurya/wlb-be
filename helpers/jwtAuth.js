const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function generateToken(userObject) {
  const { id, username, email, status } = userObject;
  return jwt.sign({ id, username, email, status }, secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  verifyToken,
};
