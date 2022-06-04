const express = require('express')
const app = express();
const port = 3001;
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const router = express.Router();

const connection = mysql.createConnection(dbconfig);


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
    .post(function(req, res){   //  3001/user 로 post 요청 , templates 파일 action 과 동일한 URI
        var data = req.body.des // data 변수안에 요청받은 bodyparser 중에 파일에 des 
        var query = db.query('INSERT INTO user_data (des) VALUES (?)',[    // user_data 안의 des 테이블
            data
        ])
        var list = db.query('SELECT * FROM user_data', (err, results) => {  // err, results 콜백함수값으로 
            if(err) throw err;  // err 있으면 err 를 throw
            console.log('DATA RECEIVE:'); 
            console.log(results); // results (결과값) 출력
            res.send(results)
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
    .get('/user/update/:id', function(req,res){ // 수정링크를 타고 들어온 데이터의 id 값과 des 값을 받아서 update ejs 파일로 넘긴다
        var sql = "SELECT * FROM user_data WHERE id = ?";
        
        db.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('update',{users : results}); // 쿼리문 날린 results 값을 users 란 key 에 담기 
        });
    });

app.get('/calendar', function(req, res) {
        connection.query('SELECT * from calendar', (err, rows) =>{
        if (err) throw err;
        console.log('Calendar info is:', rows);
        res.send(rows);
        });
    })   
    .post(function(req, res){  
        var data = req.body.des 
        var query = db.query('INSERT INTO calendar (des) VALUES (?)',[    
            data
        ])
        var list = db.query('SELECT * FROM calendar', (err, results) => {  
            if(err) throw err; 
            console.log('DATA RECEIVE:'); 
            console.log(results);
            res.send(results)
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
        var sql = "SELECT * FROM calendar WHERE id = ?";
        
        db.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('update',{users : results});
        });
    });


app.get('/alarm', function(req, res) {
        connection.query('SELECT * from alarm', (err, rows) =>{
        if (err) throw err;
        console.log('Alarm info is:', rows);
        res.send(rows);
        });
    })       
    .post(function(req, res){   
        var data = req.body.des 
        var query = db.query('INSERT INTO alarm (des) VALUES (?)',[    
            data
        ])
        var list = db.query('SELECT * FROM alarm', (err, results) => {  
            if(err) throw err;  
            console.log('DATA RECEIVE:'); 
            console.log(results); 
            res.send(results)
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
        var sql = "SELECT * FROM alarm WHERE id = ?";
        
        db.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('update',{users : results});
        });
    });

    
app.get('/schedule', function(req, res) {
    connection.query('SELECT * from schedule', (err, rows) =>{
        if (err) throw err;
        console.log('Schedule info is:', rows);
        res.send(rows);
        });
    })       
    .post(function(req, res){  
        var data = req.body.des  
        var query = db.query('INSERT INTO schedule (des) VALUES (?)',[   
            data
        ])
        var list = db.query('SELECT * FROM schedule', (err, results) => {  
            if(err) throw err;  
            console.log('DATA RECEIVE:'); 
            console.log(results); 
            res.send(results)
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
        var sql = "SELECT * FROM schedule WHERE id = ?";
        
        db.query(sql, [req.params.id],function(err, results, fields){
            if (err) throw err;
            console.log(results);
            res.render('update',{users : results}); 
        });
    });
