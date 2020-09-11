import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [usernameLength, setusernameLength] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [incorectPassword, setIncorectPassword] = useState('');
  const [totalError, setTotalError] = useState('');
  const [sendRequest, setSendRequest] = useState(false);
  const [compleateForm, setCompleateForm] = useState(false);
  const [newRedirect, setNewLoginRedirect] = useState(false);

  const eventRegister = () => {
    setName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword1('');
    setPassword2('');
    axios({
      method: 'post',
      url: '/api/create',
      data: {
        name,
        lastname,
        email,
        username,
        password1,
        password2,
      },
    })
      .then((resp) => {
        console.log(resp);
        // if (
        //   resp.request.responseURL == 'http://localhost:8080/home' ||
        //   resp.request.responseURL == 'http://localhost:3000/home'
        // ) {
        //   setLoginName(resp.headers.name);
        //   setLoginRedirect(true);
        // }
        if (
          resp.request.responseURL == 'http://localhost:8080/login' ||
          resp.request.responseURL == 'http://localhost:3000/login'
        ) {
          setNewLoginRedirect(true);
        }
      })
      .catch((err) => console.log('error in fetch request Login', err));
  };

  useEffect(() => {
    setSendRequest(false);
    if (username.length == 0) {
      setusernameLength('');
    } else if (username.length > 0 && username.length < 4) {
      setusernameLength('Username must be minimum 4 letter');
    } else if (username.length > 4) {
      setSendRequest(true);
      setusernameLength('');
    }
  });
  useEffect(() => {
    setSendRequest(false);
    if (password1 !== password2) {
      setIncorectPassword('Please Check Password');
    } else if (password1 === password2) {
      setSendRequest(true);
      setIncorectPassword('');
    }
  });
  useEffect(() => {
    setSendRequest(false);
    if (
      name.length == 0 ||
      lastname.length == 0 ||
      email.length == 0 ||
      username.length == 0 ||
      password1.length == 0 ||
      password2.length == 0
    ) {
      setSendRequest(false);
      //   setTotalError('All fields need to be compleat');
    } else if (password1 === password2) {
      setSendRequest(true);
      setTotalError('');
    }
  });
  console.log(sendRequest);
  if (newRedirect === true) {
    return <Redirect to="/" />;
  } else
    return (
      <div>
        <h1>Register New User</h1>
        <h4>{totalError}</h4>
        <div className="createUserFields">
          <label htmlFor="name">name:</label>
          <input
            id="nameR"
            value={name}
            placeholder="username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="createUserFields">
          <label htmlFor="lastname">lastname:</label>
          <input
            id="lastnameR"
            value={lastname}
            placeholder="lastname"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></input>
        </div>
        <div className="createUserFields">
          <label htmlFor="email">email:</label>
          <input
            id="emailR"
            value={email}
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="createUserFields">
          <label htmlFor="email">username:</label>
          <input
            id="username"
            value={username}
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <h6>{usernameLength}</h6>
        </div>
        <div className="createUserFields">
          <label htmlFor="password1">password:</label>
          <input
            id="password1"
            value={password1}
            placeholder="password"
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          ></input>
        </div>
        <div className="createUserFields">
          <label htmlFor="password1">Confirm password:</label>
          <input
            id="password2"
            value={password2}
            placeholder="password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          ></input>
          <h6>{incorectPassword}</h6>
        </div>
        <br />
        <button
          onClick={() => {
            if (sendRequest === true) {
              eventRegister();
            } else {
              setTotalError('All fields need to be compleat');
              setCompleateForm('Please compleat Registration Form');
            }
          }}
        >
          Register New User
        </button>
        <h6>{compleateForm}</h6>
      </div>
    );
};

export default Register;
