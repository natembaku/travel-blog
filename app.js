var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Users = require('./db.json').users;

var app = express();

// the routes for the views
var routes = [
  require('./routes/index'),
  require('./routes/create'),
  require('./routes/sign_in'),
  require('./routes/edit'),
  require('./routes/view'),
  require('./routes/register'),
  require('./routes/delete'),
  require('./routes/sign_out'),
  require('./routes/archive'),
  require('./routes/contact'),
];

// global variables

// variables for signed in user
  // gets username to display as loged in
app.locals.user = "";
  // if logedIn is true it allows for editing,deleting and creating
  // it represents a loged in user
app.locals.logedIn = false;
app.locals.regError = "";
app.locals.signError = "";
app.locals.cookieWarning = false;



/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// the pages
// displayed in the routes array
app.use('/', routes[0]);
app.use('/create', routes[1]);
app.use('/sign_in', routes[2]);
app.use('/edit', routes[3]);
app.use('/view', routes[4]);
app.use('/register', routes[5]);
app.use('/delete', routes[6]);
app.use('/sign_out', routes[7]);
app.use('/archive', routes[8]);
app.use('/contact', routes[9]);

/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
