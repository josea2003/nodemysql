const express = require("express"),
    path = require("path"),
    app = express(),
    puerto = 3000;
const mysql = require('mysql');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//MySql datails
let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydatabase',
    multipleStatements: true
});

//Read DB
app.get('/clients', (req, res)=>{
    mysqlConnection.query('SELECT * FROM clients', (err, rows, fields)=>{
        if(!err) res.send(rows)
        else console.log(err);
    });
});

mysqlConnection.connect((err)=>{
    if(!err) console.log('Connection successfully');
    else console.log('Connection failed'+ JSON.stringify(err, undefined, 2));
});

//listen
app.listen(puerto, ()=> console.log(`Listening on port ${puerto}...`));
