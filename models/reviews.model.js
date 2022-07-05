const { DataTypes, db } = require('../utils/database.util');

const Reviews = db.define(
    'review',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'active',
            validate: {
                isIn: [['active', 'inactive']],
            },
        },
    },
    { timestamps: false }
);

module.exports = { Reviews };
