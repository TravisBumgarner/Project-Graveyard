import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
import CenterTile from '../../containers/centerTile/index';
import PropTypes from 'prop-types'
import axios from 'axios';

class App extends Component {
  getData = () =>{
    axios.get('http://127.0.0.1:8000/api/get_images')
        .then(response => {
          let images = response.data.data;

        })
  }

  render() {
    return (
      <div className="App">
        <a href="https://api.instagram.com/oauth/authorize/?client_id=b34a768ac36a4f5c877eb9bdd8bae1be&redirect_uri=http://127.0.0.1:8000/api/hello_response&response_type=code&scope=public_content">Enable IG</a>
        <button onClick={this.getData}>Get Images</button>
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
