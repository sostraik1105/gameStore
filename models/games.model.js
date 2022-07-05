const { DataTypes, db } = require('../utils/database.util');

const Games = db.define(
    'game',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
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

module.exports = { Games };
