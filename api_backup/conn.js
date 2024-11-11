const mysql = require('mysql2');
// database connect
const conn = mysql.createConnection({
    host: 'localhost', 
    user: 'poommeri_ec',
    password: 'ecproject',
    database: 'poommeri_ec',
port: 3306
});

module.exports = conn;