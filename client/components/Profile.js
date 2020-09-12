import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = (props) => {
  const [winnNumbers, setWinnNumbers] = useState('');
  const [numberOfDraw, setNumberOfDraw] = useState(2);
  // const [numberOfDrawB, setNumberOfDrawB] = useState(2);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://data.ny.gov/resource/d6yy-54nr.json',
    }).then((data) => {
      setWinnNumbers(data.data.slice(0, numberOfDraw));
      // console.log(data.data.slice(0, 10));
    });
  }, [numberOfDraw]);

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
      <Link to={`/`}>
        <button type="button" className="btnSecondary">
          Sign Out
        </button>
      </Link>
      <div className="headOfProfile">
        <h1>Welcome {newName}</h1>
        <img
          id="pimage"
          src="https://vidyakoshtest.nic.in/theme/enlightlite/pix/img_avatar.png"
          alt="img_avatar"
          style={{ width: '100px' }}
        ></img>
      </div>
      <label htmlFor="Draw">Display Draw</label>
      <form>
        <input
          id="draw"
          // value={' '}
          placeholder="Last Draw's"
          onChange={(e) => {
            setNumberOfDraw(e.target.value);
          }}
        ></input>
        {/* <button onClick={changDraw}>Draw Display</button> */}
      </form>
      <div className="column">{numbersList}</div>

      <div className="column">
        <label htmlFor="numInput">Create Lottery Ticket</label>
        <input id="num1"></input>
        <input id="num2"></input>
        <input id="num3"></input>
        <input id="num4"></input>
        <input id="num5"></input>
        <input id="num6"></input>
      </div>
    </div>
  );
};

export default Profile;
