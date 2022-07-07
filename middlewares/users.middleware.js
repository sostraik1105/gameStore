// Models
const { Users } = require('../models/users.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { errorHandler } = require('../utils/errorHandler.util');

exports.userExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const dbUser = await Users.findOne({ where: { id, status: 'active' } });

    if (!dbUser) {
        return next(new AppError('User not found', 404));
    }

    req.dbUser = dbUser;

    next();
});
