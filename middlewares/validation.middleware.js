const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map(err => err.msg);
        const message = errorMsgs.join('. ');
        return next(new AppError(message, 400));
    }

    next();
};

exports.usersValidators = [
    body('username').notEmpty().withMessage('Username cannot be empty'),
    body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Must be provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters long')
        .isAlphanumeric()
        .withMessage('Password must contain letters and numbers'),
    checkResult,
];

exports.gamesValidators = [
    body('title').notEmpty().withMessage('Title cannot be empty'),
    body('genre').notEmpty().withMessage('Genre cannot be empty'),
    checkResult,
];

exports.reviwesValidators = [
    body('comment').notEmpty().withMessage('Comment cannot be empty'),
    checkResult,
];

exports.consolesValidators = [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('company').notEmpty().withMessage('Company cannot be empty'),
    checkResult,
];
