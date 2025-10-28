const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",         // your MySQL username
  password: "",         // your MySQL password (keep blank if none)
  database: "cafe"      // your database name
});

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;
