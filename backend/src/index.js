
// import all modules
const Express = require('express');
const { Signale } = require('signale');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookieParser');
const passport = require('passport');

// initalise all instances
const logger = new Signale(); 
const app = Express();
const server = http.createServer(app);

//const user = require('./structs/user'); //tbc

app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.use((req, res, next) => {
    res.locals.user = req.user; // handle users
})

app.use('/', require('./rts/index')); // main homepage
app.use('/auth', require('./rts/auth')); // handle discord authenication stuff
app.use('/bots', require('./routes/bots')) // handle bot stuff

// 404 error: forward to main error handler
app.use((req, res, next) => {
    next(createError(404));
})

// catch errors and compile them into a page
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {title: 'Error', status: err.status, message: err.message});
})

// start up web server to listen on the environment variable 'port' or port 80. 
server.listen(process.env.PORT || 80);