// Models
const { Games } = require('../models/games.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { errorHandler } = require('../utils/errorHandler.util');

exports.gameExists = errorHandler(async (req, res, next) => {
    const { id } = req.params;

    const dbGame = await Games.findOne({ where: { id, status: 'active' } });

    if (!dbGame) {
        return next(new AppError('Game not found', 404));
    }

    req.dbGame = dbGame;

    next();
});
