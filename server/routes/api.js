const express = require('express');
// const path = require('path');
const router = express.Router();
const useControler = require('../controlers/useControler');
const passport = require('passport');
const initializePassport = require('../aouth/passportConfig');
const session = require('express-session');
// const flash = require('express-flash');

initializePassport(passport);

// router.post('/login', useControler.loginUser);
router.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Funtion inside passport which initializes passport
router.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
router.use(passport.session());

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/check',
    failureRedirect: '/api/trylogin',
    failureFlash: true,
  })
);
router.get('/trylogin', useControler.checkNotAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  //   console.log(req.session.flash.error);
  //   console.log('besik - 1');
  res.redirect('/login');
});

router.get(
  '/check',
  useControler.checkNotAuthenticated,
  useControler.setCookie,
  (req, res) => {
    // console.log('besik - 2');
    // console.log(req.isAuthenticated());
    // console.log(req.user.name);
    res.redirect('/home');
  }
);

router.post('/create', useControler.createUser, (req, res) => {
  res.redirect('/login');
});

module.exports = router;
