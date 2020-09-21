import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import axios from 'axios';
import { pie } from 'd3';

const Profile = (props) => {
  const [winnNumbers, setWinnNumbers] = useState('');
  const [numberOfDraw, setNumberOfDraw] = useState(10);
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
  let numbers2 = [];
  let numbers3 = [];
  let numbersObject = {};
  let numbersObject2 = {};
  let numbersObject3 = {};
  // console.log(numbersObject2);
  let data = [];
  let data2 = [];
  let data3 = [];
  console.log(data3);
  for (let i = 0; i < winnNumbers.length; i++) {
    const [number1, number2, number3, number4, number5, number6] = winnNumbers[
      i
    ].winning_numbers.split(' ');
    numbers1.push(+number1);
    numbers2.push(+number2);
    numbers3.push(+number3);
    numbersList.push(
      <li key={`win${i}`}>
        {winnNumbers[i].winning_numbers} -{' '}
        {winnNumbers[i].draw_date.split('T')[0]}
      </li>
    );
  }

  numbers1.forEach(function (x) {
    numbersObject[x] = (numbersObject[x] || 0) + 1;
  });
  numbers2.forEach(function (x) {
    numbersObject2[x] = (numbersObject2[x] || 0) + 1;
  });
  numbers3.forEach(function (x) {
    numbersObject3[x] = (numbersObject3[x] || 0) + 1;
  });
  for (const key in numbersObject) {
    data.push({ letter: key, frequency: numbersObject[key] });
  }
  for (const key in numbersObject2) {
    data2.push({ letter: key, frequency: numbersObject2[key] });
  }
  for (const key in numbersObject3) {
    data3.push({ letter: key, frequency: numbersObject3[key] });
  }

  const myRef = React.createRef();

  useEffect(() => {
    // accessToRef.style('background-color', 'green');
    let list = document.getElementById('chart');
    list.innerHTML = '';

    // const w = numbers1.length * 70;
    // const h = 400;

    // const accessToRef = d3
    //   .select(myRef.current)
    //   .append('svg')
    //   .attr('width', w)
    //   .attr('height', h)
    //   .style('background-color', 'green')
    //   .style('padding', 10)
    //   .style('margin-left', 50);

    // accessToRef
    //   .selectAll('rect')
    //   .data(numbers1)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d, i) => i * 70)
    //   .attr('y', (d, i) => h - 10 * d)
    //   .attr('width', 40)
    //   .attr('height', (d, i) => d * 10)
    //   .attr('fill', 'tomato');

    // accessToRef
    //   .selectAll('.text')
    //   .data(newArray)
    //   .enter()
    //   .append('text')
    //   .attr('x', (d, i) => i * 70 + 20)
    //   .attr('y', (d, i) => h - 10 * d.letter - 5)
    //   .attr('text-anchor', 'middle')
    //   .attr('fill', 'black')
    //   .style('font-weight', 'bold')
    //   .text((d) => d.value);
    //Setting up of our svg with proper calculations
    var svg = d3
      .select(myRef.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    var margin = {
      top: 40,
      right: 20,
      bottom: 40,
      left: 40,
    };
    var width = svg.attr('width') - margin.left - margin.right;
    var height = svg.attr('height') - margin.top - margin.bottom;

    //Plotting our base area in svg in which chart will be shown
    var g = svg
      .append('g')
      .style('font-weight', 'bold')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    //X and Y scaling
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return +d.frequency;
      }),
    ]);

    //Final Plotting

    //for x axis
    g.append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,' + height + ')');

    //for y axis
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end');

    //for rectangles
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) {
        return x(d.letter);
      })
      .attr('y', function (d) {
        return y(d.frequency);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.frequency);
      });

    g.selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      // .style('font-weight', 'bold')
      .attr('dy', '.75em')
      .attr('y', function (d) {
        return y(d.frequency) - 16;
      })
      .attr('x', function (d) {
        return x(d.letter) + x.bandwidth() / 2;
      })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d.frequency;
      });
  }, [numbers1]);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const myRef2 = React.createRef();

  useEffect(() => {
    let list = document.getElementById('chart2');
    list.innerHTML = '';

    var svg = d3
      .select(myRef2.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    var margin = {
      top: 40,
      right: 20,
      bottom: 40,
      left: 40,
    };
    var width = svg.attr('width') - margin.left - margin.right;
    var height = svg.attr('height') - margin.top - margin.bottom;

    //Plotting our base area in svg in which chart will be shown
    var g = svg
      .append('g')
      .style('font-weight', 'bold')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //X and Y scaling
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data2.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data2, function (d) {
        return +d.frequency;
      }),
    ]);

    //Final Plotting

    //for x axis
    g.append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,' + height + ')');

    //for y axis
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      // .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end');

    //for rectangles
    g.selectAll('.bar')
      .data(data2)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) {
        return x(d.letter);
      })
      .attr('y', function (d) {
        return y(d.frequency);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.frequency);
      });

    g.selectAll('.text')
      .data(data2)
      .enter()
      .append('text')
      // .style('font-weight', 'bold')
      .attr('dy', '.75em')
      .attr('y', function (d) {
        // console.log(d.frequency);
        // console.log(y);
        return y(d.frequency) - 16;
      })
      .attr('x', function (d) {
        return x(d.letter) + x.bandwidth() / 2;
      })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d.frequency;
      });
  }, [numbers2]);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const myRef3 = React.createRef();

  useEffect(() => {
    let list = document.getElementById('chart3');
    list.innerHTML = '';

    var svg = d3
      .select(myRef3.current)
      .append('svg')
      .attr('width', 500)
      .attr('height', 300);
    var margin = {
      top: 40,
      right: 20,
      bottom: 40,
      left: 40,
    };
    var width = svg.attr('width') - margin.left - margin.right;
    var height = svg.attr('height') - margin.top - margin.bottom;

    //Plotting our base area in svg in which chart will be shown
    var g = svg
      .append('g')
      .style('font-weight', 'bold')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    //X and Y scaling
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      data3.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data3, function (d) {
        return +d.frequency;
      }),
    ]);

    //Final Plotting

    //for x axis
    g.append('g')
      .call(d3.axisBottom(x))
      .attr('transform', 'translate(0,' + height + ')');

    //for y axis
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      // .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end');

    //for rectangles
    g.selectAll('.bar')
      .data(data3)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) {
        return x(d.letter);
      })
      .attr('y', function (d) {
        return y(d.frequency);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.frequency);
      });

    g.selectAll('.text')
      .data(data3)
      .enter()
      .append('text')
      // .style('font-weight', 'bold')
      .attr('dy', '.75em')
      .attr('y', function (d) {
        // console.log(d.frequency);
        // console.log(y);
        return y(d.frequency) - 16;
      })
      .attr('x', function (d) {
        return x(d.letter) + x.bandwidth() / 2;
      })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d.frequency;
      });
  }, [numbers3]);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const myRef4 = React.createRef();

  // useEffect(() => {
  //   let list = document.getElementById('chart4');
  //   list.innerHTML = '';

  //   const accessToRef = d3.select(myRef4.current).append('svg');

  //   //   .select(myRef3.current)
  //   //   .append('svg')
  //   //   .attr('width', 500)
  //   //   .attr('height', 300);
  //   // var margin = {
  //   //   top: 40,
  //   //   right: 20,
  //   //   bottom: 40,
  //   //   left: 40,
  //   // };
  //   // var width = svg.attr('width') - margin.left - margin.right;
  //   // var height = svg.attr('height') - margin.top - margin.bottom;

  //   // //Plotting our base area in svg in which chart will be shown
  //   // var g = svg
  //   //   .append('g')
  //   //   .style('font-weight', 'bold')
  //   //   // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  //   //   .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //   // //X and Y scaling
  //   // var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  //   // var y = d3.scaleLinear().rangeRound([height, 0]);

  //   // x.domain(
  //   //   data3.map(function (d) {
  //   //     return d.letter;
  //   //   })
  //   // );
  //   // y.domain([
  //   //   0,
  //   //   d3.max(data3, function (d) {
  //   //     return +d.frequency;
  //   //   }),
  //   // ]);

  //   // //Final Plotting

  //   // //for x axis
  //   // g.append('g')
  //   //   .call(d3.axisBottom(x))
  //   //   .attr('transform', 'translate(0,' + height + ')');

  //   // //for y axis
  //   // g.append('g')
  //   //   .call(d3.axisLeft(y))
  //   //   .append('text')
  //   //   // .attr('transform', 'rotate(-90)')
  //   //   .attr('text-anchor', 'end');

  //   //for rectangles
  //   accessToRef
  //     .selectAll('circle')
  //     .data(data3)
  //     .enter()
  //     .append('circle')
  //     .style('stroke', 'gray')
  //     .style('fill', 'black')
  //     .attr('r', 40)
  //     .attr('cx', 50)
  //     .attr('cy', 20);
  //   // .attr('x', function (d) {
  //   //   return x(d.letter);
  //   // })
  //   // .attr('y', function (d) {
  //   //   return y(d.frequency);
  //   // })
  //   // .attr('width', x.bandwidth())
  //   // .attr('height', function (d) {
  //   //   return height - y(d.frequency);
  //   // });

  //   // g.selectAll('.text')
  //   //   .data(data3)
  //   //   .enter()
  //   //   .append('text')
  //   //   // .style('font-weight', 'bold')
  //   //   .attr('dy', '.75em')
  //   //   .attr('y', function (d) {
  //   //     // console.log(d.frequency);
  //   //     // console.log(y);
  //   //     return y(d.frequency) - 16;
  //   //   })
  //   //   .attr('x', function (d) {
  //   //     return x(d.letter) + x.bandwidth() / 2;
  //   //   })
  //   //   .attr('text-anchor', 'middle')
  //   //   .text(function (d) {
  //   //     return d.frequency;
  //   //   });
  // }, [numbers3]);
  useEffect(() => {
    let list = document.getElementById('chart4');
    list.innerHTML = '';
    let width = 600;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(myRef4.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    // .style('background', 'pink');
    let data = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data3);
    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      // .attr('text-anchor', 'middle')
      .attr('class', 'gcircle')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(data);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('transform', (d) => `translate(${segments.centroid(d)})`)
      .call((text) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d) => d.data.letter)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d) => d.data.frequency.toLocaleString())
      );
    // content
    //   .enter()
    //   .append('text')
    //   .each(function (d) {
    //     // console.log(d.data);
    //     let center = segments.centroid(d);
    //     d3.select(this)
    //       .attr('text-anchor', 'middle')
    //       // .attr('y', '-0.4em', center[1])
    //       .attr('x', center[0])
    //       .attr('y', center[1])
    //       .text(d.data.letter)
    //       .style('fill', 'white')
    //       .style('font-weight', 'bold')
    //       .style('font-size', '15px');
    //   });
    // content
    //   .enter()
    //   .append('text')
    //   .each(function (d) {
    //     // console.log(d.data);
    //     let center = segments.centroid(d);
    //     d3.select(this)
    //       .attr('x', center[0])
    //       .attr('y', center[1])
    //       .text(d.data.frequency)
    //       .style('fill', 'green')
    //       .style('font-weight', 'bold')
    //       .style('font-size', '15px');
    //   });
  }, [numbers3]);
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
      <div id="chart" ref={myRef}></div>
      <div id="chart2" ref={myRef2}></div>
      <div id="chart3" ref={myRef3}></div>
      <div id="chart4" ref={myRef4}></div>
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
