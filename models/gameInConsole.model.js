const { db, DataTypes } = require('../utils/database.util');

const GameInConsole = db.define('gameInConsole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { GameInConsole };
