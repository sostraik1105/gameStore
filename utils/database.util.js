const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: './config.env' });

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    logging: false,
});

module.exports = { db, DataTypes };
