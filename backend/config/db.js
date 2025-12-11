// backend/config/db.js
require("dotenv").config();
const mysql = require("mysql2");

// Use Railway MYSQL_URL (single full URL)
const urlDB = process.env.MYSQL_URL;

// Recommended: use a pool instead of a single connection
const pool = mysql.createPool(urlDB);

// Promisified query function
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { pool, query };
