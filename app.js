'use strict';

const express = require('express');
const engine = require('ejs-mate');
const cookieParser = require('cookie-parser');
const app = express();

/**
 * Middleware
 */
app.engine('ejs', engine);
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');

/**
 * Routes
 */
app.get('/', function (req, res) {
  res.render('index', {title: 'Demo'});
});

app.get('/one', function (req, res) {
  res.render('one', {title: 'Page One'});
});

app.get('/two', function (req, res) {
  res.render('two', {title: 'Page Two'});
});

app.get('/slow', function (req, res) {
  setTimeout(function () {
    res.render('slow', {title: 'Slow Page'});
  }, 2000);
});

app.get('/protected', function (req, res) {
  if (req.cookies.signed_in) {
    res.render('protected', {title: 'Protected'});
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/sign-in', function (req, res) {
  res.render('sign_in', {title: 'Sign In'});
});

app.post('/sign-in', function (req, res) {
  res.cookie('signed_in', true);
  res.redirect('/');
});


/**
 * Start server
 */
let server = app.listen(process.env.PORT || 9292, function () {
  let host = server.address().address;
  let port = server.address().port;

  if (host === '::') {
    host = 'localhost';
  }

  console.log('Node.js app listening at http://%s:%s', host, port);
});
