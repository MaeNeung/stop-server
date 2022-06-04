const express = require('express')
const app = express();
const port = 3001;
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const router = express.Router();

const connection = mysql.createConnection(dbconfig);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
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
    .put(function (req, res) {
        res.send('Got a PUT request at /user');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /user');
    });


app.get('/schedule', function(req, res) {
        connection.query('SELECT * from schedule', (err, rows) =>{
        if (err) throw err;
        console.log('Schedule info is:', rows);
        res.send(rows);
        });
    })
    .put(function (req, res) {
        res.send('Got a PUT request at /schedule');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /schedule');
    })

app.get('/calendar', function(req, res) {
        connection.query('SELECT * from calendar', (err, rows) =>{
        if (err) throw err;
        console.log('Calendar info is:', rows);
        res.send(rows);
        });
    })   
    .put(function (req, res) {
        res.send('Got a PUT request at /calendar');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /calendar');
    });


app.get('/alarm', function(req, res) {
        connection.query('SELECT * from alarm', (err, rows) =>{
        if (err) throw err;
        console.log('Alarm info is:', rows);
        res.send(rows);
        });
    })       
    .put(function (req, res) {
        res.send('Got a PUT request at /alarm');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /alarm');
    });

    
app.get('/schedule', function(req, res) {
    connection.query('SELECT * from schedule', (err, rows) =>{
        if (err) throw err;
        console.log('Schedule info is:', rows);
        res.send(rows);
        });
    })       
    .put(function (req, res) {
        res.send('Got a PUT request at /schedule');
    })
    .delete(function (req, res) {
        res.send('Got a DELETE request at /schedule');
    });