const db = require('../db/db');
const bcrypt = require('bcryptjs');

const useControler = {};

useControler.createUser = (req, res, next) => {
  const { name, lastname, email, username, password1 } = req.body;
  // console.log(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password1, salt, (err, hash) => {
      const userQuery = `INSERT INTO userList (name, surname, username, password, email) VALUES ('${name}', '${lastname}', '${username}', '${hash}', '${email}')`;
      db.query(userQuery, (err, data) => {
        if (err) {
          return next({
            log: `An error in create User`,
            status: 404,
            err: { err },
          });
        }
        return next();
      });
    });
  });
};

useControler.checkNotAuthenticated = (req, res, next) => {
  // console.log('good buy');
  if (req.isAuthenticated()) {
    // console.log('good buy', req.isAuthenticated());
    return next();
  }
  res.redirect('/login');
  // console.log('error');
};

useControler.setCookie = (req, res, next) => {
  // const token = res.locals.token;
  res.cookie('name', '123456');
  return next();
};
module.exports = useControler;
