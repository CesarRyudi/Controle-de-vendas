const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cookies",
    password: "cesaro223272",
    port: 5432,
});

module.exports = pool;