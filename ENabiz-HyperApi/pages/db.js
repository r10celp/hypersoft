const mysql = require('mysql');

var dbConfig = {
    host     : '89.252.183.61',
    user     : 'hypersof_hypercare',
    password : '*******',
    database : 'hypersof_hypercare',
    charset  : 'utf8mb4_unicode_ci',
    connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true
};
var database = mysql.createPool(dbConfig);

module.exports = database

