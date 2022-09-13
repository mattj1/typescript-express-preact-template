import * as fs from "fs";

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// var session = require('express-session');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'pug');

// https://github.com/xpepermint/express-hash-webpack/blob/master/index.js

const WebpackBundleLoader = function (options) {
    let _webpackStats = null;

    return function (req, res, next) {

        res.locals.bundlePath = function (chunk_id) {
            if (!_webpackStats) {
                const data = fs.readFileSync('./webpack-stats.json', 'utf8');
                const webpackStats = JSON.parse(data);
                console.log(webpackStats);
                _webpackStats = webpackStats;

                console.log("*** Loaded webpackstats ***");
            }

            let chunk = _webpackStats["chunks"][chunk_id]
            console.log("got chunk", chunk[0]);
            return chunk[0];
        }

        next();
    }
}

app.use(WebpackBundleLoader({}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.static(path.join(__dirname, '../../public')))
app.use('/static/bundle', express.static(path.join(__dirname, '../../bundle')))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export {
    app
}

// https://bytearcher.com/articles/refresh-changes-browser-express-livereload-nodemon/