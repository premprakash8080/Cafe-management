const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost", // your host, usually localhost
  user: process.env.DB_USERNAME || "root",         // your MySQL username
  password:  process.env.DB_PASSWORD ||"root",         // your MySQL password (keep blank if none)
  database: process.env.DB_NAME ||"cafe"      // your database name
});

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;
