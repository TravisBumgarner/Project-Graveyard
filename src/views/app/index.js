import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
import CenterTile from '../../containers/centerTile/index';
import PropTypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="App">
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
