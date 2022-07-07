const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

// Models
const { Users } = require('../models/users.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { errorHandler } = require('../utils/errorHandler.util');

exports.protectSession = errorHandler(async (req, res, next) => {
    let token;

    // extract the token from headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Invalid session', 403));
    }

    // Ask JWT (library), if the token is still valid
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Check in db that user still exists
    const dbUser = await Users.findOne({
        where: { id: decoded.id, status: 'active' },
    });

    if (!dbUser) {
        return next(
            new AppError('The owner of this token doesnt exist anymore', 403)
        );
    }

    // grant access
    req.sessionUser = dbUser;
    next();
});
