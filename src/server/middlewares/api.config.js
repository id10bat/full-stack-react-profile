var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


const userRoutes = require('../mongose/routers/user');



mongoose.connect('mongodb://127.0.0.1:27017/profile', { autoIndex: false });

var db = mongoose.connection;
module.exports = (app) => {


  //handle mongo error
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
  });


  //use sessions for tracking logins
  app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

  // parse incoming requests
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));


  app.use('/api', userRoutes);

  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   var err = new Error('File Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  // error handler
  // define as the last app.use callback
  // app.use(function (err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.send(err.message);
  // });
};
