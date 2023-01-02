import React, { Component } from 'react';

const CANVAS = {WIDTH: 500, HEIGHT: 500};

const TOWNS = [
   {
       name: "loot_lake",
       x: 200,
       y: 200,
       distance: -1,
   },
   {
      name: "dusty_divot",
      x: 50,
      y: 250,
      distance: -1,
   },
   {
      name: "wailing_woods",
      x: 25,
      y: 100,
      distance: -1,
    },
];

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
      this.canvas = this.refs.canvas;
      this.ctx = this.canvas.getContext("2d");

    this.canvas.addEventListener('mousedown', (e) => {
      this.setState({
        x1: e.clientX,
        y1: e.clientY,
      });
    }, false);

    this.canvas.addEventListener('mouseup', (e) => {
      this.setState({
        x2: e.clientX,
        y2: e.clientY
      });
      this.updateCanvas();
    }, false);
  }

  drawTowns = () => {
    // const canvas = this.refs.canvas;
    // const this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle="black";
    this.ctx.font = "10px Arial";

    TOWNS.map((t)=> {

        this.ctx.fillText(`${t.name}`, t.x + 8, t.y + 8);

        this.ctx.beginPath();
        this.ctx.arc(t.x, t.y, 5, 0, 2*Math.PI);
        this.ctx.stroke();
    });
  }

  drawLine = (x1, y1, x2, y2, color) => {
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();


    this.ctx.fillText(`${parseInt(x1, 10)} ${parseInt(y1, 10)}`, x1, y1);
    this.ctx.fillText(`${parseInt(x2, 10)} ${parseInt(y2, 10)}`, x2, y2);
  };

  clearCanvas = () => {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    this.ctx.fillStyle="white";
    this.ctx.fill();
  };

  updateCanvas = () => {
    const {
      x1,
      x2,
      y1,
      y2,
    } = this.state;



    this.clearCanvas(this.ctx);

    this.drawTowns();
    this.calculateDistancesToTowns();
    this.drawLine(x1, y1, x2, y2, 'black')
  };

  calculateDistanceTownToFlightPath = (x, y) => {
      const { x1, x2, y1, y2 } = this.state;
      const mFlightPath = (y2 - y1) / (x2 - x1);
      const bFlightPath = y1 - mFlightPath * x1;

      const mTownToFlightPath = -1 / mFlightPath;
      const bTownToFlightPath = y - mTownToFlightPath * x;

      const xIntercept = (bTownToFlightPath - bFlightPath) / (mFlightPath - mTownToFlightPath);
      const yIntercept = mTownToFlightPath * xIntercept + bTownToFlightPath;

      const townToFlightPathDistance = Math.sqrt((x - xIntercept)**2 + (y - yIntercept)**2);

      const flightStartToInterceptDistance = Math.sqrt((x1 - xIntercept)**2 + (y1 - yIntercept)**2);

      const distance = flightStartToInterceptDistance + townToFlightPathDistance;

      this.drawLine(xIntercept, yIntercept, x, y, 'red');

      return distance;
  }

  calculateDistancesToTowns = () => {
      TOWNS.map((t)=> {
        t.distance = this.calculateDistanceTownToFlightPath(t.x, t.y, this.ctx);
      });
      console.log(TOWNS);
  };

  render() {
    return(
      <div>
        <canvas ref="canvas" width={CANVAS.WIDTH} height={CANVAS.HEIGHT} />
      </div>
    )
  }
}