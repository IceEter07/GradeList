const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')


const app = express();

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
    saveUninitialized: true
}));

app.use(flash());

//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    next();
}) 

//Routes
app.use(require('./routes/user.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'assets')));

module.exports = app;