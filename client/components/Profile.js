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
  let numbers4 = [];
  let numbers5 = [];
  let numbers6 = [];
  let numbersObject = {};
  let numbersObject2 = {};
  let numbersObject3 = {};
  let numbersObject4 = {};
  let numbersObject5 = {};
  let numbersObject6 = {};
  // console.log(numbersObject2);
  let data1 = [];
  let data2 = [];
  let data3 = [];
  let data4 = [];
  let data5 = [];
  let data6 = [];
  console.log(data4);
  for (let i = 0; i < winnNumbers.length; i++) {
    const [number1, number2, number3, number4, number5, number6] = winnNumbers[
      i
    ].winning_numbers.split(' ');
    numbers1.push(+number1);
    numbers2.push(+number2);
    numbers3.push(+number3);
    numbers4.push(+number4);
    numbers5.push(+number5);
    numbers6.push(+number6);
    // console.log(numbersObject4);
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
  numbers4.forEach(function (x) {
    numbersObject4[x] = (numbersObject4[x] || 0) + 1;
  });
  numbers5.forEach(function (x) {
    numbersObject5[x] = (numbersObject5[x] || 0) + 1;
  });
  numbers6.forEach(function (x) {
    numbersObject6[x] = (numbersObject6[x] || 0) + 1;
  });
  for (const key in numbersObject) {
    data1.push({ letter: key, frequency: numbersObject[key] });
  }
  for (const key in numbersObject2) {
    data2.push({ letter: key, frequency: numbersObject2[key] });
  }
  for (const key in numbersObject3) {
    data3.push({ letter: key, frequency: numbersObject3[key] });
  }
  for (const key in numbersObject4) {
    data4.push({ letter: key, frequency: numbersObject4[key] });
  }
  for (const key in numbersObject5) {
    data5.push({ letter: key, frequency: numbersObject5[key] });
  }
  for (const key in numbersObject6) {
    data6.push({ letter: key, frequency: numbersObject6[key] });
  }

  // const myRef = React.createRef();
  const barChart1 = useEffect(() => {
    let list = document.getElementById('barChart1');
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
      // .select(myRef.current) // It was in case of >>     // accessToRef.style('background-color', 'green'); line 79
      .select(list)
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
      data1.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data1, function (d) {
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
      .data(data1)
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
      .data(data1)
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
  // const myRef2 = React.createRef();
  const barChart2 = useEffect(() => {
    let list = document.getElementById('barChart2');
    list.innerHTML = '';

    var svg = d3
      // .select(myRef2.current)
      .select(list)
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
  // const myRef3 = React.createRef();
  const barChart3 = useEffect(() => {
    let list = document.getElementById('barChart3');
    list.innerHTML = '';

    var svg = d3
      .select(list)
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
  const barChart4 = useEffect(() => {
    let list = document.getElementById('barChart4');
    list.innerHTML = '';

    var svg = d3
      .select(list)
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
      data4.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data4, function (d) {
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
      .data(data4)
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
      .data(data4)
      .enter()
      .append('text')
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
  }, [numbers4]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const barChart5 = useEffect(() => {
    let list = document.getElementById('barChart5');
    list.innerHTML = '';

    var svg = d3
      .select(list)
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
      data5.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data5, function (d) {
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
      .data(data5)
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
      .data(data5)
      .enter()
      .append('text')
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
  }, [numbers5]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const barChart6 = useEffect(() => {
    let list = document.getElementById('barChart6');
    list.innerHTML = '';

    var svg = d3
      .select(list)
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
      data6.map(function (d) {
        return d.letter;
      })
    );
    y.domain([
      0,
      d3.max(data6, function (d) {
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
      .data(data6)
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
      .data(data6)
      .enter()
      .append('text')
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
  }, [numbers6]);

  /// #############################################################################################################################################################
  // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle1 = useEffect(() => {
    let list = document.getElementById('pieCircle1');
    list.innerHTML = '';
    let width = 600;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata1 = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data1);

    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      .attr('class', 'gcircle')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata1);

    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle')
      .selectAll('text')
      .data(piedata1)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers1]);

  // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle2 = useEffect(() => {
    let list = document.getElementById('pieCircle2');
    list.innerHTML = '';
    let width = 600;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata2 = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data2);
    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      .attr('class', 'gcircle2')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata2);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle2')
      .selectAll('text')
      .data(piedata2)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers2]);
  // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle3 = useEffect(() => {
    let list = document.getElementById('pieCircle3');
    list.innerHTML = '';
    let width = 500;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata3 = d3
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
      .attr('class', 'gcircle3')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata3);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle3')
      .selectAll('text')
      .data(piedata3)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers3]);
  // // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle4 = useEffect(() => {
    let list = document.getElementById('pieCircle4');
    list.innerHTML = '';
    let width = 600;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata4 = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data4);
    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      .attr('class', 'gcircle4')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata4);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle4')
      .selectAll('text')
      .data(piedata4)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers4]);

  // // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle5 = useEffect(() => {
    let list = document.getElementById('pieCircle5');
    list.innerHTML = '';
    let width = 600;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata5 = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data5);
    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      .attr('class', 'gcircle5')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata5);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle5')
      .selectAll('text')
      .data(piedata5)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers5]);
  // // //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const pieCircle6 = useEffect(() => {
    let list = document.getElementById('pieCircle6');
    list.innerHTML = '';
    let width = 500;
    let height = 500;
    let colors = d3.scaleOrdinal(d3.schemeDark2);
    let svg = d3
      .select(list)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let piedata6 = d3
      .pie()
      .sort(null)
      .value((d) => d.frequency)(data6);
    let segments = d3
      .arc()
      .innerRadius(0)
      .outerRadius(200)
      .padAngle(0.05)
      .padRadius(50);
    let section = svg
      .append('g')
      .attr('class', 'gcircle6')
      .attr('transform', 'translate(250,250)')
      .selectAll('path')
      .data(piedata6);
    section
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d) => colors(d.data.letter));
    let content = d3
      .selectAll('.gcircle6')
      .selectAll('text')
      .data(piedata6)
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
          .attr('fill', 'white')
          .text((d) => d.data.frequency.toLocaleString())
      );
  }, [numbers6]);

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
      <div className="barChart">
        <label className="barChartL">Bar Chart 1</label>
        <label className="barChartL">Bar Chart 2</label>
        <label className="barChartL">Bar Chart 3</label>
      </div>
      <div className="barChart">
        <div id="barChart1" ref={barChart1}></div>
        <div id="barChart2" ref={barChart2}></div>
        <div id="barChart3" ref={barChart3}></div>
      </div>
      <div className="barChart">
        <label className="barChartL">Bar Chart 4</label>
        <label className="barChartL">Bar Chart 5</label>
        <label className="barChartL">Bar Chart 6</label>
      </div>
      <div className="barChart">
        <div id="barChart4" ref={barChart4}></div>
        <div id="barChart5" ref={barChart5}></div>
        <div id="barChart6" ref={barChart6}></div>
      </div>
      <div className="barChart">
        <label className="barChartL">Number 1</label>
        <label className="barChartL">Number 2</label>
        <label className="barChartL">Number 3</label>
      </div>
      <div className="barChart">
        <div id="pieCircle1" ref={pieCircle1}></div>
        <div id="pieCircle2" ref={pieCircle2}></div>
        <div id="pieCircle3" ref={pieCircle3}></div>
      </div>
      <div className="barChart">
        <label className="barChartL">Number 4</label>
        <label className="barChartL">Number 5</label>
        <label className="barChartL">Number 6</label>
      </div>
      <div className="barChart">
        <div id="pieCircle4" ref={pieCircle4}></div>
        <div id="pieCircle5" ref={pieCircle5}></div>
        <div id="pieCircle6" ref={pieCircle6}></div>
      </div>
      <label htmlFor="Draw">Display Draw</label>
      <form>
        <input
          id="draw"
          // value={' '}
          placeholder="Enter Number of Draw's Here"
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
