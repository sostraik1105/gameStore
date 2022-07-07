// Models
const { Consoles } = require('../models/consoles.model');
const { Games } = require('../models/games.model');

// Utils
const { errorHandler } = require('../utils/errorHandler.util');

// get all consoles
exports.getAllConsoles = errorHandler(async (req, res, next) => {
    const consoles = await Consoles.findAll({
        include: {
            model: Games,
            attributes: ['title', 'genre'],
        },
    });
    res.status(200).json({ consoles });
});

// create console - protected
exports.newConsole = errorHandler(async (req, res, next) => {
    const { name, company } = req.body;
    const newConsole = await Consoles.create({
        name,
        company,
    });
    res.status(201).json({ status: 'created', newConsole });
});

// update console - protected
exports.updateConsole = errorHandler(async (req, res, next) => {
    const { dbConsole } = req;
    const { name } = req.body;
    await dbConsole.update({ name });
    res.status(200).json({ status: 'updated', dbConsole });
});

// delete console - protected
exports.deleteConsole = errorHandler(async (req, res, next) => {
    const { dbConsole } = req;
    await dbConsole.update({ status: 'inactive' });
    res.status(200).json({ status: 'deleted' });
});
