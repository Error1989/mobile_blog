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
var api_login = require('./routes/api_login');
var api_science = require('./routes/api_science');
var api_game = require('./routes/api_game');
var api_music = require('./routes/api_music');
var api_car = require('./routes/api_car');
var api_video = require('./routes/api_video');
var api_military = require('./routes/api_military');
var api_article = require('./routes/api_article');
var api_admin = require('./routes/api_admin');
var api_search = require('./routes/api_search');
var api_write = require('./routes/api_write');

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

app.use(function (req, res, next) {
  if (req.body.userId&&req.body.access_token) {
    next();
  }else {
    if (
      req.path == '/api_index' ||
      req.path == '/api_login' ||
      req.path == '/api_login/register' ||
      req.path == '/api_science' ||
      req.path == '/api_game' ||
      req.path == '/api_music' ||
      req.path == '/api_car' ||
      req.path == '/api_video' ||
      req.path == '/api_military' ||
      req.path == '/api_article' ||
      req.path == '/api_search'
    ) {
      next();
    }else {
      res.json({
        status: '-99',
        msg: '请先登录',
      })
    }
  }
});

app.use('/api_index', api_index);
app.use('/api_login', api_login);
app.use('/api_science', api_science);
app.use('/api_game', api_game);
app.use('/api_music', api_music);
app.use('/api_car', api_car);
app.use('/api_video', api_video);
app.use('/api_military', api_military);
app.use('/api_article', api_article);
app.use('/api_admin', api_admin);
app.use('/api_search', api_search);
app.use('/api_write', api_write);

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
