'use strict';

var express         = require('express'),
    path            = require('path'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    swig            = require('swig'),
    cors            = require('cors'),
    debug           = require('debug')('ganheinaloteria:app'),
    app             = express();
    
//config
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  if(req.url === '/favicon.ico'){
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end('');
  } else {
    next();
  }
});

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// routes
app.use('/', require('./routes'));

//errors
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next){
  res
    .status(err.status || 500)
    .json('error', {
      message: err.message,
      error: {}
    });
    debug(err);
});

//server
module.exports = app;