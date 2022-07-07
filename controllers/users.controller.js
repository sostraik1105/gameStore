const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

// models
const { Users } = require('../models/users.model');

// utils
const { errorHandler } = require('../utils/errorHandler.util');
const { AppError } = require('../utils/appError.util');

// signup
exports.signup = errorHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        username,
        email,
        password: hashPass,
    });

    newUser.password = undefined;

    res.status(201).json({ newUser });
});

// login
exports.login = errorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // user exist in DB
    const user = await Users.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    // comapre password
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentidals', 400));
    }

    // Generate JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;

    res.status(200).json({ token, user });
});

// get all users - protected
exports.getAllUsers = errorHandler(async (req, res, next) => {
    const users = await Users.findAll({
        where: { status: 'active' },
        attributes: { exclude: ['password'] },
    });
    res.status(200).json({ status: 'ok', users });
});

// update user - protected
exports.updateUser = errorHandler(async (req, res, next) => {
    const { dbUser } = req;
    const { username, email } = req.body;
    await dbUser.update({ username, email });
    dbUser.password = undefined;
    res.status(203).json({ status: 'updated', dbUser });
});

// delete user - protected
exports.deleteUser = errorHandler(async (req, res, next) => {
    const { dbUser } = req;
    await dbUser.update({ status: 'inactive' });
    res.status(200).json({ status: 'deleted' });
});
