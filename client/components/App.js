import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewLogin from './Login.js';
import Profile from './Profile';
import NewUser from './LoginNewUser.js';
import Register from './Register.js';

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <NewLogin />
        </Route>
        <Route exact path="/login">
          <NewUser />
        </Route>
        <Route path="/home" render={(props) => <Profile {...props} />}></Route>
        <Route exact path="/create">
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
