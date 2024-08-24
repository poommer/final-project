const mysql = require("mysql2");




const conn = mysql.createConnection({
    user: "root",
    password: "",
    database: "ecproject",
});

if (conn) {
    console.log("connected!");
}

module.exports = conn;