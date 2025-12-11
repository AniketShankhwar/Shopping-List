// backend/config/db.js
require("dotenv").config();
const mysql = require("mysql2");

const urlDB = process.env.MYSQL_URL;

// create connection
const connection = mysql.createConnection(urlDB);

// simple promise query helper
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { connection, query };
