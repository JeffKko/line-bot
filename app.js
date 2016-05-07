var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');
var lineCallback = require('./routes/lineCallback');

var app = express();

/*================================
    line api validate
 ================================*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*',function(req,res,next){

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-COntrol-Allow-Headers','X-Requested-With');
    next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/callback', lineCallback);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//¼g¦¨­°¯Åª©

//app.post( '/data' , function (request, response) {
//
//    if(!request.body.hasOwnProperty('name') ||
//        !request.body.hasOwnProperty('pass')){
//
//        response.statusCode = 400;
//        return response.send('Error 400: Post syntax incorrect.');
//    }
//
//
//    var newData = {
//        "name" : request.body.name ,
//        "pass" : request.body.pass
//    };
//
//    person.push(newData);
//
//    response.writeHead(200, {"Content-Type": "application/json"});
//    response.write(JSON.stringify({
//        "res" : "success"
//    }));
//    response.end();
//});

module.exports = app;
