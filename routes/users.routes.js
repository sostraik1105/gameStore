const { Router } = require('express');

// Controller
const {
    login,
    getAllUsers,
    signup,
    updateUser,
    deleteUser,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middleware');
const { usersValidators } = require('../middlewares/validation.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const usersRoutes = Router();

usersRoutes.post('/signup', usersValidators, signup);
usersRoutes.post('/login', login);

usersRoutes.use(protectSession);

usersRoutes.get('/', getAllUsers);

usersRoutes
    .use('/:id', userExists)
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

module.exports = { usersRoutes };
