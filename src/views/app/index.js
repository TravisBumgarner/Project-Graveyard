import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
import CenterTile from '../../containers/centerTile/index';
import PropTypes from 'prop-types'
import axios from 'axios';

class App extends Component {
  getData = () =>{
    axios.get('http://127.0.0.1:8000/api/hello')
        .then(data => {
          console.log(data);
        })
  }

  render() {
    return (
      <div className="App">
        <a href="http://127.0.0.1:8000/api/hello" target="_blank">Enable IG</a>
        <button onClick={this.getData}>Test</button>
        <div id="tile-wrapper-all">
          <div id ="tile-wrapper-row">
            <Tile numVal={1}>  </Tile>
            <Tile numVal={2}>  </Tile>
            <Tile numVal={3}>  </Tile>
          </div>
          <div id ="tile-wrapper-row">
            <Tile numVal={4}>  </Tile>
            <CenterTile>  </CenterTile>
            <Tile numVal={6}>  </Tile>
          </div>
          <div id ="tile-wrapper-row">
            <Tile numVal={7}>  </Tile>
            <Tile numVal={8}>  </Tile>
            <Tile numVal={9}>  </Tile>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
