const { Router } = require('express');

// Controllers
const {
    getAllGames,
    assignConsole,
    newGame,
    newReview,
    updateGame,
    deleteGame,
} = require('../controllers/games.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { gameExists } = require('../middlewares/games.middleware');
const {
    gamesValidators,
    reviwesValidators,
} = require('../middlewares/validation.middleware');

const gamesRoutes = Router();

gamesRoutes.get('/', getAllGames);

gamesRoutes.use(protectSession);

gamesRoutes.post('/', gamesValidators, newGame);

gamesRoutes.post('/assignConsole', assignConsole);

gamesRoutes.post('/reviews/:gameId', reviwesValidators, newReview);

gamesRoutes
    .use('/:id', gameExists)
    .route('/:id')
    .patch(updateGame)
    .delete(deleteGame);

module.exports = { gamesRoutes };
