const { Router } = require('express');

// Controllers
const {
    getAllConsoles,
    deleteConsole,
    newConsole,
    updateConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');
const { consolesValidators } = require('../middlewares/validation.middleware');

const consolesRoutes = Router();

consolesRoutes.get('/', getAllConsoles);

consolesRoutes.use(protectSession);

consolesRoutes.post('/', consolesValidators, newConsole);

consolesRoutes
    .use('/:id', consoleExists)
    .route('/:id')
    .patch(updateConsole)
    .delete(deleteConsole);

module.exports = { consolesRoutes };
