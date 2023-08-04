const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const mongoStore = require('connect-mongo');


const app = express();
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");

//Midlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: `mongodb://127.0.0.1/gradelist` 
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
}) 

//Routes
app.use(require('./routes/user.routes'));
app.use(require('./routes/main.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'assets')));

module.exports = app;