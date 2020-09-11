import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {
  const [winnNumbers, setWinnNumbers] = useState('');
  // const [drawDate, setDrawDate] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://data.ny.gov/resource/d6yy-54nr.json',
    }).then((data) => {
      setWinnNumbers(data.data.slice(0, 10));
      console.log(data.data.slice(0, 10));
    });
  }, []);

  let cachedName = props.location.state.propName;
  let newName = '';
  let restString = '';
  for (let i = 1; i < cachedName.length; i++) {
    restString = restString + cachedName[i];
    newName = cachedName[0].toUpperCase() + restString;
  }
  let numbersList = [];
  for (let i = 0; i < winnNumbers.length; i++) {
    numbersList.push(
      <li key={`win${i}`}>
        {winnNumbers[i].winning_numbers} -{' '}
        {winnNumbers[i].draw_date.split('T')[0]}
      </li>
    );
  }
  return (
    <div>
      <h1>Welcome {newName}</h1>
      <div>{numbersList}</div>
      <Link to={`/`}>
        <button type="button" className="btnSecondary">
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default Profile;
