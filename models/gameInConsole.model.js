const { db, DataTypes } = require('../utils/database.util');

const GameInConsoles = db.define(
    'gameInConsole',
    {
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
    },
    { timestamps: false }
);

module.exports = { GameInConsoles };
