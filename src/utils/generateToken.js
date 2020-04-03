const jwt = require('jsonwebtoken');

const authconfig = require('../config/auth.json');

module.exports = function generateToken(id) {
    return jwt.sign(id, authconfig.secret, {
        expiresIn: 3600,
    });
}