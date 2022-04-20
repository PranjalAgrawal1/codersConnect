const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const db = require('./config/mongoose');


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-str');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google.oauth2-str');


const MongoStore = require('connect-mongo');
const saasMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');




app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));
app.use(express.urlencoded());

app.use(cookieparser());

app.use(express.static('./assets'));

//make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'cosersconnect',
    // todo change the secret before deployment in production mode
    secret: 'pranjal',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (24 * 60 * 60 * 1000),
    },
    store: MongoStore.create(
        {

            mongoUrl: db._connectionString,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongose setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use routers
app.use('/', require('./routes'));



app.listen(port, function (err) {
    if (err) {
        console.log("error surver is not running on port : ", port);
    }
    console.log("surver is runing on port : ", port);
})