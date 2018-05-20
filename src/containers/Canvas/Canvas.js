import React, { Component } from 'react';

const CANVAS = {WIDTH: 500, HEIGHT: 500};

const TOWNS = {
    "loot_lake": {
      x: 200,
      y: 200,
    },
    "dusty_divot": {
      x: 50,
      y: 250,
    },
    "wailing_woods": {
      x: 25,
      y: 100,
    },
}

export default class Canvas extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        x1: 0,
        x2: CANVAS.WIDTH,
        y1: 0,
        y2: CANVAS.HEIGHT,
      }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;

    canvas.addEventListener('mousedown', (e) => {
      this.setState({
        x1: e.clientX,
        y1: e.clientY,
      });
    }, false);

    canvas.addEventListener('mouseup', (e) => {
      this.setState({
        x2: e.clientX,
        y2: e.clientY
      });
      this.drawLine();
      this.drawTowns();
    }, false);
  }

  drawTowns = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle="black";
    ctx.font = "10px Arial";

    Object.keys(TOWNS).map((t)=> {
        const {x, y} = TOWNS[t];

        ctx.fillText(t, x + 8, y + 8);

        ctx.beginPath();
        ctx.arc(x,y, 5, 0, 2*Math.PI);
        ctx.stroke();
    });


  }

  drawLine = () => {
    const {
      x1,
      x2,
      y1,
      y2,
    } = this.state;

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    ctx.fillStyle="white";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  getLine = () => {
    const {
      x1,
      x2,
      y1,
      y2,
    } = this.state;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    console.log(x1, x2, y1, y2, m, b)

  };

  render() {
    this.getLine();

    return(
      <div>
        <canvas ref="canvas" width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
      </div>
    )
  }
}