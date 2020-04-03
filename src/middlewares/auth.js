const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        return response.status(401).send({ error: 'No token provided' });

    const tokenParts = authHeader.split(' ');

    if (!tokenParts.length === 2)
        return response.status(401).send({ error: 'Token error' });

    const [scheme, token] = tokenParts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) 
            return response.status(401).send({ error: 'Invalid Token' });

        request.userId = decoded.id;

        return next();
    });

};