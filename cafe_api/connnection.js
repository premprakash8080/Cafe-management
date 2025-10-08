const mysql = require("mysql");
require("dotenv").config();

var connection= mysql.createConnection({
    port: process.env.DB_PORT,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST
})

connection.connect((err) =>{
    if(!err){
        console.log("db connected successfully");

    }else{
        console.log(err)
    }
})

module.exports = connection;