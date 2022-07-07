const { Consoles } = require('./consoles.model');
const { Games } = require('./games.model');
const { Reviews } = require('./reviews.model');
const { Users } = require('./users.model');

const rels = () => {
    // Users 1:N Reviews
    Users.hasMany(Reviews);
    Reviews.belongsTo(Users);

    // Games 1:N Reviews
    Games.hasMany(Reviews);
    Reviews.belongsTo(Games);

    // Games N:M Consoles
    Games.belongsToMany(Consoles, {
        foreignKey: 'gameId',
        through: 'gameInConsole',
    });
    Consoles.belongsToMany(Games, {
        foreignKey: 'consoleId',
        through: 'gameInConsole',
    });
};

module.exports = { rels };
