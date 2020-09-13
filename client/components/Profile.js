import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import axios from 'axios';

const Profile = (props) => {
  const [winnNumbers, setWinnNumbers] = useState('');
  const [numberOfDraw, setNumberOfDraw] = useState(2);
  // const [rawNumber1, setRawNumber1] = useState('');

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

  let numbers1 = [];
  for (let i = 0; i < winnNumbers.length; i++) {
    const [number1, number2, number3, number4, number5, number6] = winnNumbers[
      i
    ].winning_numbers.split(' ');
    numbers1.push(+number1);
    numbersList.push(
      <li key={`win${i}`}>
        {winnNumbers[i].winning_numbers} -{' '}
        {winnNumbers[i].draw_date.split('T')[0]}
      </li>
    );
  }

  const myRef = React.createRef();

  useEffect(() => {
    // accessToRef.style('background-color', 'green');
    let list = document.getElementById('chart');
    list.innerHTML = '';
    const w = numbers1.length * 70;

    const h = 400;
    const accessToRef = d3
      .select(myRef.current)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', 'green')
      .style('padding', 10)
      .style('margin-left', 50);

    accessToRef
      .selectAll('rect')
      .data(numbers1)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 40)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'tomato');
  }, [numbers1]);

  const bbb = [];
  bbb.push(<div id="chart" ref={myRef}></div>);

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
      <div>{bbb}</div>
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
