module.exports = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        filename: process.env.DB_FILE_NAME
    },
    useNullAsDefault: true
});