const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'3897',
    port:3306,
    database:'Shalendar'
});

connection.query('SELECT * from user_data', (err, rows, fields) => {
  if (err) throw err;
  console.log('User info is: ', rows);
});