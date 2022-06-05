const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const client = mysql.createConnection({
    user: 'root',
    password: '3897',
    database: 'Shalendar' 
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
    .get('/calendar/insert', function(req, res) {
        const sql = `INSERT INTO calendar (title, content, date, participant) VALUES(?, ?, ?, ?, ?)`;
        const params = ['calendar2', 'content2', '2022-06-05', 'participant']
        connection.query(sql, params, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
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
    .get('/calendar/update/:id' ,function (req, res) {
        const sql = `UPDATE calendar SET title="?", content="?", date="?" participant="?" WHERE id=?`;
        const id = req.params.id;
        const params = ['calendar3', 'content3', '2022-02-22', 'participants', id];
        
        connection.query(sql, params, function(err, rows, fields){
            if(err) console.log(err);
            console.log(rows);
            res.redirect('/calendar')
        });
    })


app.get('/alarm', function(req, res) {
        connection.query('SELECT * from alarm', (err, rows) =>{
        if (err) throw err;
        console.log('Alarm info is:', rows);
        res.send(rows);
        });
    })       
    .get('/alarm/insert', function(req, res) {
        const sql = `INSERT INTO alarm (accept, payment, schedule) VALUES(?, ?, ?)`;
        const params = ['accept2', 'payment2', 'schedule2']
        connection.query(sql, params, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
        res.redirect('/alarm')
    })
    })
    .get('/alarm/delete/:before' ,function (req, res) {
        const sql = "DELETE FROM alarm WHERE before = ?";
        connection.query(sql, [req.params.before], function(err, result, fields){
            if (err) throw err;
            console.log(result)
            res.redirect('/alarm')
        })
    })
    .get('/alarm/update/:before' ,function (req, res) {
        const sql = `UPDATE alarm SET accept="?", payment="?", schedule="?" WHERE before=?`;
        const before = req.params.before;
        const params = ['alarm3', 'payment3', 'shcedule3', before];
        
        connection.query(sql, params, function(err, rows, fields){
            if(err) console.log(err);
            console.log(rows);
            res.redirect('/alarm')
        });
    })

    
app.get('/schedule', function(req, res) {
    connection.query('SELECT * from schedule', (err, rows) =>{
        if (err) throw err;
        console.log('Schedule info is:', rows);
        res.send(rows);
        });
    })       
    .get('/schedule/insert', function(req, res) {
        const sql = `INSERT INTO schedule (title, content, date) VALUES(?, ?, ?)`;
        const params = ['title2', 'content2', '2022-06-05']
        connection.query(sql, params, function(err, rows, fields){
        if(err) console.log(err);
        console.log(rows);
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
    .get('/schedule/update/:id' ,function (req, res) {
        const sql = `UPDATE schedule SET title="?", content="?", date="?" WHERE id=?`;
        const id = req.params.id;
        const params = ['schedule3', 'content3', '2022-02-22', id];
        
        connection.query(sql, params, function(err, rows, fields){
            if(err) console.log(err);
            console.log(rows);
            res.redirect('/schedule')
        });
    })