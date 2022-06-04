const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

// const db = require('./../db');

/* GET home page. */
app.set('port', process.env.PORT || 3001);

app.get('/', function(req, res) {
  res.send('Root');
});

app.get('/user', function(req, res) {
  connection.query('SELECT * from user_data', (err, rows) =>{
    if (err) throw err;
    console.log('User info is:', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port' + app.get('port'))
});

module.exports = router;
