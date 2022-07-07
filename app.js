const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routes
const { usersRoutes } = require('./routes/users.routes');
const { gamesRoutes } = require('./routes/games.routes');
const { consolesRoutes } = require('./routes/consoles.routes');
const { AppError } = require('./utils/appError.util');

const app = express();

app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/games', gamesRoutes);
app.use('/api/v1/consoles', consolesRoutes);

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found in this server`,
            404
        )
    );
});

// GLobal error handler
app.use(globalErrorHandler);

module.exports = { app };
