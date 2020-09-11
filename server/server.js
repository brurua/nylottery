const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const apiRouter = require('./routes/api.js');

/**
 * handle parsing request body
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

/**
 * define route handlers
 */
app.use('/api', apiRouter);

app.use(
  '/bundle.js',
  express.static(path.join(__dirname, '../dist/bundle.js'))
);

app.get('/home', apiRouter, (req, res) => {
  if (req.isAuthenticated()) {
    res.set('name', [req.user.name]);
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
// catch-all route handler for any requests to an unknown route
app.get('*', (req, res) => {
  res.sendStatus(404).send('Sorry, cant find that');
});

//   /**
//    * configire express global error handler
//    * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
//    */

app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.sendStatus(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
