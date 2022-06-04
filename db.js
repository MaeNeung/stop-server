const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'3897',
    port:3306,
    database:'Shalendar'
});

connection.connect();

// sql = "SELECT * FROM data"; 

connection.query(function(err){
    if (err) throw err;
    console.log('Connected');
    connection.query('CREATE DATEBASE sw', function(err, result){
    if (err) throw err;
        console.log('database created');
    });
});

connection.query(function(err){
    if (err) throw err;
    console.log('Connected');
    const sql = '위 SQL 쿼리 복사';
    connection.query(sql, function (err, result){
        if (err) throw err;
        console.log('table created');
    });
});

connection.query(function (err) {
    if (err) throw err;
    console.log('Connected');
    const sql = 'select * from user_data'
    connection.query(sql, function(err, result, fields){
    if (err) throw err;
    console.log(result)
    })
});

connection.end();