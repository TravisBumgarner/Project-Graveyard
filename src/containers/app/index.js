import React, { Component } from 'react';
import './style.css';
import Tile from '../../components/tile/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="tile-wrapper-all">
          <div id ="tile-wrapper-row">
            <Tile center = { false }/>
            <Tile center = { false }/>
            <Tile center = { false }/>
          </div>
          <div id ="tile-wrapper-row">
            <Tile center = { false }/>
            <Tile center = { true }/>
            <Tile center = { false }/>
          </div>
          <div id ="tile-wrapper-row">
            <Tile center = { false }/>
            <Tile center = { false }/>
            <Tile center = { false }/>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
