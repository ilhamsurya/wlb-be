const bcrypt = require('bcryptjs');

function generateHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  generateHash,
  compareHash,
};
