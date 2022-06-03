const mysql = require('sw');

const connection = mysql.createConnection({
    host:'localhost',
    user:'test',
    password:'test',
    port:3001,
    database:'NODE_DB'
});