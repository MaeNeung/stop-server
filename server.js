const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const app = express();
const path = require('path');
const port = 3001;
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const router = express.Router();

const client = mysql.createConnection({
    user: 'root',
    password: '3897', //본인의 db root 계정 비밀번호
    database: 'Shalendar' //본인의 db
})

const connection = mysql.createConnection(dbconfig);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is running at : ${port}`)
})

app.get('/', (req, res) => {
  res.send('Main')
})

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.get('/user', function(req, res) {
        connection.query('SELECT * from user_data', (err, rows) =>{
        if (err) throw err;
        console.log('User info is:', rows);
        res.send(rows);
        });
    })
    // .get('/user/insert', function(req, res){
    //     const sql = 'SELECT * FROM user_data';
    //     connection.query(sql, function(err, user_data, fields){
    //         if(err){
    //             console.log(err);
    //             res.status(500).send('Internal Server Error')
    //         }
    //             res.render('user', {user_data : user_data});
    //     });
    // })
    .get('/user/insert', function(req, res) {
        const sql = `INSERT INTO user_data (user_name, email, phone_number, pw, bank_number, bank, connecting) VALUES(?, ?, ?, ?, ?, ?, ?)`;
        const params = ['user1', 'user@a.com', '010-1111-1111', '1111', '1111', 'testbank', 1]
        connection.query(sql, params, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
        res.redirect('/user')
    })
    })
    .get('/user/delete/:id' ,function (req, res) {
        const sql = "DELETE FROM user_data WHERE id = ?";
        connection.query(sql, [req.params.id], function(err, result, fields){
            if (err) throw err;
            console.log(result)
            res.redirect('/user')
        })
    })
    .get('/user/update/:id' ,function (req, res) {
        const sql = `UPDATE user_data SET user_name="?", email="?", phone_number="?", pw="?", bank_number="?", bank="?", connecting="?" WHERE id=?`;
        const id = req.params.id;
        const params = ['user3', 'user2@b.com', '010-2222-2222', '2222', '2222', 'testbank2', 1, id];
        
        connection.query(sql, params, function(err, rows, fields){
            if(err) console.log(err);
            console.log(rows);
            res.redirect('/user')
        });
    })

app.get('/calendar', function(req, res) {
        connection.query('SELECT * from calendar', (err, rows) =>{
        if (err) throw err;
        console.log('Calendar info is:', rows);
        res.send(rows);
        });
    })   
    .post('/calendar/insert', function(req, res){   //  3001/user 로 post 요청 , templates 파일 action 과 동일한 URI
        connection.query(`INSERT INTO calendar VALUES ('?','?','?','?','?')`, req.body, function(err,results,fields){  // 연결할 데이터베이스 변수명 db 로 설정해둿음 맨위에
        if (err) throw err;
        console.log(results);       
        res.redirect('/calendar')
        })
    })
    .get('/calendar/delete/:id' ,function (req, res) {
        const sql = "DELETE FROM calendar WHERE id = ?";
        connection.query(sql, [req.params.id], function(err, result, fields){
            if (err) throw err;
            console.log(result)
            res.redirect('/calendar')
        })
    })
    .get('/calendar/update/:id', function(req,res){ 
        const sql = "SELECT * FROM calendar WHERE id = ?";
        
        connection.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('calendar',{id : req.params.id}); 
        });
    });


app.get('/alarm', function(req, res) {
        connection.query('SELECT * from alarm', (err, rows) =>{
        if (err) throw err;
        console.log('Alarm info is:', rows);
        res.send(rows);
        });
    })       
    .post('/alarm/insert', function (req, res) {
        const body = req.body

        client.query('INSERT INTO alarm VALUES (?,?,?,?,?);', [
            body.id,
            body.accept,
            body.payment,
            body.schedule,
            body.before
        ], function() {
            res.redirect('/alarm')
        })
    })
    .get('/alarm/delete/:id' ,function (req, res) {
        const sql = "DELETE FROM alarm WHERE id = ?";
        connection.query(sql, [req.params.id], function(err, result, fields){
            if (err) throw err;
            console.log(result)
            res.redirect('/alarm')
        })
    })
    .get('/alarm/update/:id', function(req,res){ 
        const sql = "SELECT * FROM alarm WHERE id = ?";
        
        connection.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('alarm',{id : req.params.id}); 
        });
    });

    
app.get('/schedule', function(req, res) {
    connection.query('SELECT * from schedule', (err, rows) =>{
        if (err) throw err;
        console.log('Schedule info is:', rows);
        res.send(rows);
        });
    })       
    .post('/schedule/insert', function (req, res) {
        const body = req.body

        client.query('INSERT INTO schedule VALUES (?,?,?,?);', [
            body.id,
            body.title,
            body.content,
            body.date
        ], function() {
            res.redirect('/schedule')
        })
    })
    .get('/schedule/delete/:id' ,function (req, res) {
        const sql = "DELETE FROM schedule WHERE id = ?";
        connection.query(sql, [req.params.id], function(err, result, fields){
            if (err) throw err;
            console.log(result)
            res.redirect('/schedule')
        })
    })
    .get('/schedule/update/:id', function(req,res){ 
        const sql = "SELECT * FROM schedule WHERE id = ?";
        
        connection.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('schedule',{id : req.params.id}); 
        });
    });
