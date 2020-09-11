const db = require('../db/db');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
  const authenticateUser = (userName, passWord, done) => {
    // console.log(userName, passWord);
    const userQuery = `SELECT * FROM userList WHERE username = '${userName}'`;
    db.query(userQuery, (err, data) => {
      // console.log(data.rowCount);
      if (err) {
        throw err;
      }
      if (data.rowCount === 1) {
        const user = data.rows[0];
        // console.log('from here', user.password);
        bcrypt.compare(passWord, user.password, function (err, isMatch) {
          // console.log(isMatch);
          // console.log('heloo from bcrypt');
          if (err) {
            console.log(err);
            // throw err;
          }
          if (isMatch) {
            console.log('passwor is corect !!!');
            return done(null, user);
          } else {
            return done(null, false, { massage: 'Password is not correct' });
          }
        });
      } else {
        // console.log('akedan');
        return done(null, false, { massage: 'User is not registered' });
      }
    });
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'userName', passwordField: 'passWord' },
      authenticateUser
    )
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => {
    // console.log('from here >>>', user);
    done(null, user.user_id);
  });

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    // console.log('from here >>>', id);
    db.query(
      `SELECT * FROM userList WHERE user_id = '${id}'`,
      (err, results) => {
        if (err) {
          return done(err);
        }
        // console.log(`ID is ${results.rows[0].user_id}`);
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;
