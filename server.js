const express = require('express')
const app = express()
const port = 3001

app.use

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.put('/user', function (req, res) {
res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
res.send('Got a DELETE request at /user');
});

app.put('/schedule', function (req, res) {
    res.send('Got a PUT request at /schedule');
});
    
app.delete('/schedule', function (req, res) {
    res.send('Got a DELETE request at /schedule');
});

app.put('/calendar', function (req, res) {
    res.send('Got a PUT request at /calendar');
});
    
app.delete('/calendar', function (req, res) {
    res.send('Got a DELETE request at /calendar');
});

app.put('/alarm', function (req, res) {
    res.send('Got a PUT request at /alarm');
});
    
app.delete('/alarm', function (req, res) {
    res.send('Got a DELETE request at /alarm');
});