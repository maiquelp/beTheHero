const jwt = require('jsonwebtoken');
const auth = require('../config/auth')

module.exports = function generateToken(params = {}) {
        return jwt.sign(params , auth.md5, { expiresIn:  86400 })
} 

