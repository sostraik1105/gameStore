// Models
const { Consoles } = require('../models/consoles.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { errorHandler } = require('../utils/errorHandler.util');

exports.consoleExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const dbConsole = await Games.findOne({ where: { id, status: 'active' } });

    if (!dbConsole) {
        return next(new AppError('Console not found', 404));
    }

    req.dbConsole = dbConsole;

    next();
});
