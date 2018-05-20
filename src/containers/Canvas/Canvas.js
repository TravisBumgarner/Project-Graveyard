import React, { Component } from 'react';

const CANVAS = {WIDTH: 500, HEIGHT: 500};

const TOWNS = {
    "loot_lake": {
      x: 200,
      y: 200,
      distance: -1,
    },
    "dusty_divot": {
      x: 50,
      y: 250,
      distance: -1,
    },
    "wailing_woods": {
      x: 25,
      y: 100,
      distance: -1,
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
      this.calculateDistances();
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

  // calculateLine = () => {
  //   const {
  //     x1,
  //     x2,
  //     y1,
  //     y2,
  //   } = this.state;
  //
  //   const m = (y2 - y1) / (x2 - x1);
  //   const b = y1 - m * x1;
  //
  //   this.setState({m ,b});
  // };

  calculateDistanceTownToFlightPath = (x, y) => {
    // https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
      const { x1, x2, y1, y2 } = this.state;

      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      let param = -1;
      if (len_sq != 0) { //in case of 0 length line
        param = dot / len_sq;
      }

      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      }
      else if (param > 1) {
        xx = x2;
        yy = y2;
      }
      else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
  }

  calculateDistances = () => {
      // For now returns shortest distance to flight path.
      Object.keys(TOWNS).map((t)=> {
        const {x, y} = TOWNS[t];
        TOWNS[t].distance = this.calculateDistanceTownToFlightPath(x, y);
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