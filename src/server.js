const express = require('express')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')


const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");

//Midlewares
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(flash());

//Global variables


//Routes
app.use(require('./routes/user.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'assets')));

module.exports = app;