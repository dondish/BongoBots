require('dotenv').config()

// import all modules
const express = require('express');
const { Signale } = require('signale');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

// initalise all instances
const logger = new Signale(); 
const app = express();
const server = http.createServer(app);

const user = require('./modules/user'); //tbc

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended :false}));

app.use((req, res, next) => {
    res.locals.user = req.user; // handle users
    next();
})

app.use(cookieSession({
    keys: ['SOMAOFMAOWEIFHAOWEHFOAWEFHOWEF'],
    secret: process.env.COOKIE_SECRET, // this is a random string, so anything really goes. could be 'askdhasljdhgkajsdbasd'
    maxAge: 1000 * 60 * 60 * 24 * 7
  }));

app.use(cookieParser(process.env.COOKIE_SECRET));  
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./rts/index')); // main homepage
app.use('/auth', require('./rts/auth')); // handle discord authenication stuff 
app.use('/api/bots', require('./rts/bots')) // handle bot stuff

app.use(user.configure)

// 404 error: forward to main error handler
app.use((req, res, next) => {
    next(createError(404));
})

// catch errors and compile them into a page
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({message: err.message});
})

// start up web server to listen on the environment variable 'port' or port 80. 
server.listen(process.env.PORT || 80);
console.log(`Started server at port ${process.env.PORT || 80}`);