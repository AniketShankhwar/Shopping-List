// backend/config/db.js
require("dotenv").config();
const mysql = require("mysql2");

const urlDB = process.env.MYSQL_URL; // Railway URL

// Use a pool for better concurrency and automatic reconnection
const pool = mysql.createPool(urlDB);

// Promise wrapper
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { pool, query };
