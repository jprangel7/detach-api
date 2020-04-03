const bcrypt = require('bcryptjs');

module.exports = function generateHash(password) {
    return bcrypt.hash(password, 10);
}