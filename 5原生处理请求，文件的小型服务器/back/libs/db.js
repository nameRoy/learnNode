const mysql = require('mysql')

const {DB_HOST,DB_USER,DB_PASS,DB_NAME} = require('../config/configDev')

let pool  = mysql.createPool({
  connectionLimit : 10,
  host            : DB_HOST,
  user            : DB_USER,
  password        : DB_PASS,
  database        : DB_NAME
});

module.exports = pool;