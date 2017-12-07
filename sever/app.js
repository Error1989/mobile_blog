var express = require('express');
var static = require('express-static');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var consolidate = require('consolidate');
var ejs = require('ejs');

var api_index = require('./routes/api_index');
var users = require('./routes/users');
var api_science = require('./routes/api_science');
var api_article = require('./routes/api_article');
var api_admin = require('./routes/api_admin');
var api_search = require('./routes/api_search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: './www/upload'}).any());

app.use('/api_index', api_index);
app.use('/users', users);
app.use('/api_science', api_science);
app.use('/api_article', api_article);
app.use('/api_admin', api_admin);
app.use('/api_search', api_search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
