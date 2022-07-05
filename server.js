const { app } = require('./app');

// database
const { db } = require('./utils/database.util');

// models
const { rels } = require('./models/relations');

rels();

db.sync({ force: true })
    .then(() => console.log('db_sync'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
