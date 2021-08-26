const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true, useUnifiedTopology: true});

const Tasks = require('./task');

let db = mongoose.connection;
db.once('open', _ => {
    console.log("Connected!");
})

db.on('error', err => {
    console.log("err: ", err);
})

app.post('/add', async (req, res) => {
    let obj = new Tasks( req.body );
    let resu = await obj.save();
    res.json(resu);
})

app.delete('/delete/:id', async (req, res) => {
    let data = await Tasks.findOne( {_id: req.params.id} )
    let upd = await data.remove();
    res.json(upd);
})

app.get('/', async (req, res) => {
    let data = await Tasks.find();
    res.json(data);
})

app.put('/update/:key', (req, res) => {
    Tasks.findOne( {_id: req.params.key} ).then( (data) => {
        data.reminder = (data.reminder) ? false : true;
        data.save();
    }).then ( (data) => {
        res.json(data);
    }).catch( (err) => {
        throw err;
    })
})

let port = 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})