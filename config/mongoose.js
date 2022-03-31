const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coders_connect');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to db"));

db.once('open', function(){
    console.log("connected to :: mongo db")
})

module.exports = db;