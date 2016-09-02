import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import {range} from 'lodash';


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const width = 1000;
const height = 700;
const charge = -0.3;
const data = range(400).map((i) => {
  return {
    fill: getRandomColor(),
    r: Math.floor(Math.random() * 8 + 2),
    x: width / 2 + (Math.floor((Math.random() - 0.5) * 100)),
    y: height / 2 + Math.floor((Math.random() - 0.5) * 100),
    vx: 1,
    vy: 1
  };
});


class Circles extends React.Component {
  render() {
    let circles = this.props.data.map((d, i) => {

      return (
        <circle cx={d.x} cy={d.y} r={d.r} fill={d.fill} key={i} />
      );
    });
    return <g>{circles}</g>;
  }
}

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }

  componentDidMount() {
    this.force = d3.forceSimulation(data)
      .alphaDecay(0.01)
      .force('charge', d3.forceManyBody().strength(-1));
    this.force.on('tick', () => {
      this.setState({data: data});
    })
  }

  render() {
    return (
      <svg width={width} height={height}>
        <Circles data={this.state.data} />
      </svg>
    );
  }
}

setTimeout(function() {
  ReactDOM.render(
    <Scene/>,
    document.getElementById('container')
  );
}, 1000)
