const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieparser());

//use routers
app.use('/', require('./routes'));


// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log("error surver is not running on port : ", port);
    }
    console.log("surver is runing on port : ", port);
})