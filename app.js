var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotEnv = require("dotenv");

// config
dotEnv.config();

var usersRouter = require('./routes/users');

var app = express();
try {
    mongoose.connect(process.env.DEV_DATABASE);
    console.log("Db Connected");
} catch (error) {
    console.error("Error ============ ON DB Connection");
    console.log(error);
}


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/users', usersRouter);

module.exports = app;
