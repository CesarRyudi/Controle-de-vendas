const Pool = require('pg').Pool;
require("dotenv").config();

// const pool = new Pool({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
//   port: 5432,
// });


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});


pool.connect((err) => {
    if(err) throw err;
    console.log("Conectado ao banco de dados!") 
})

module.exports = pool;