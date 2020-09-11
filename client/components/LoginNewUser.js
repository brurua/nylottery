import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function NewUser() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [propName, setLoginName] = useState(0);

  const loginFetch = () => {
    setLoginUsername('');
    setLoginPassword('');
    axios({
      method: 'post',
      url: '/api/login',
      data: {
        userName: loginUsername,
        passWord: loginPassword,
      },
    })
      .then((resp) => {
        console.log(resp);
        if (
          resp.request.responseURL == 'http://localhost:8080/home' ||
          resp.request.responseURL == 'http://localhost:3000/home'
        ) {
          setLoginName(resp.headers.name);
          setLoginRedirect(true);
        }
      })
      .catch((err) => console.log('error in fetch request Login', err));
  };
  if (loginRedirect) {
    return (
      <Redirect
        to={{
          pathname: '/home',
          state: { propName: `${propName}` },
        }}
      />
    );
  } else
    return (
      <div className="login">
        <h2>Sign In or Register</h2>
        <h2>This user dosnot exists or need to register !!!</h2>
        <div className="createUserFields">
          <label htmlFor="userName">User:</label>
          <input
            id="user"
            value={loginUsername}
            placeholder="username"
            onChange={(e) => {
              setLoginUsername(e.target.value);
            }}
          ></input>
        </div>
        <div className="createUserFields">
          <label htmlFor="userName">Password:</label>
          <input
            id="pass"
            value={loginPassword}
            placeholder="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          ></input>
        </div>
        <button onClick={loginFetch}>login</button>
        <Link to={`/create`}>
          <button type="button" className="btnSecondary">
            Create New User
          </button>
        </Link>
      </div>
    );
}

export default NewUser;
