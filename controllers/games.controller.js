// Models
const { Games } = require('../models/games.model');
const { GameInConsoles } = require('../models/gameInConsole.model');
const { Reviews } = require('../models/reviews.model');

// Utils
const { errorHandler } = require('../utils/errorHandler.util');

// get all games
exports.getAllGames = errorHandler(async (req, res, next) => {
    const games = await Games.findAll();
    res.status(200).json({ games });
});

// create game - protected
exports.newGame = errorHandler(async (req, res, next) => {
    const { title, genre } = req.body;
    const newGame = await Games.create({
        title,
        genre,
    });
    res.status(201).json({ status: 'created', newGame });
});

// assign console - protected
exports.assignConsole = errorHandler(async (req, res, next) => {
    const { gameId, consoleId } = req.body;
    const gameInConsoles = await GameInConsoles.create({ gameId, consoleId });
    res.status(201).json({ gameInConsoles });
});

// update game - protected
exports.updateGame = errorHandler(async (req, res, next) => {
    const { dbGame } = req;
    const { title } = req.body;
    await dbGame.update({ title });
    res.status(200).json({ status: 'updated', dbGame });
});

// delete game - protected
exports.deleteGame = errorHandler(async (req, res, next) => {
    const { dbGame } = req;
    await dbGame.update({ status: 'inactive' });
    res.status(200).json({ status: 'deleted' });
});

// create review - protected
exports.newReview = errorHandler(async (req, res, next) => {
    const { gameId } = req.params;
    const { comment } = req.body;
});
