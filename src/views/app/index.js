import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
import CenterTile from '../../containers/centerTile/index';
import PropTypes from 'prop-types'
import axios from 'axios';
import { getSurroundingCoords } from '../../utils/helper_functions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerImgSrc: "",
      textInputLat: "",
      textInputLong: "",
      textInputDistance: "",
    };
  }

  getInstagramData = () =>{
    const surroundingCords = getSurroundingCoords(this.state.textInputLat, this.state.textInputLong, this.state.textInputDistance);
    console.log(surroundingCords);
    axios.get('http://127.0.0.1:8000/instagram_api/get_images')
      .then(response => {
        let images = response.data.data;
        console.log(images);
        this.setState({
        centerImgSrc: images[0]["images"]["thumbnail"]["url"]
      })
    })
  };

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div className="App">
        <a href="https://api.instagram.com/oauth/authorize/?client_id=b34a768ac36a4f5c877eb9bdd8bae1be&redirect_uri=http://127.0.0.1:8000/instagram_api/hello_response&response_type=code&scope=public_content">Enable IG</a>
        <a href="http://127.0.0.1:8000/flickr_api/request_token">Enable Flickr</a>


        <input type="text" name = "textInputLat" value={this.props.textInputLat} onChange={this.handleInputChange}/>
        <input type="text" name = "textInputLong" value={this.props.textInputLong} onChange={this.handleInputChange} />
        <input type="text" name = "textInputDistance" value={this.props.textInputLat} onChange={this.handleInputChange}/>

        <button onClick={this.getInstagramData}>Get Images</button>
        <div id="tile-wrapper-all">
          <div id ="tile-wrapper-row">
            <Tile numVal={1}>  </Tile>
            <Tile numVal={2}>  </Tile>
            <Tile numVal={3}>  </Tile>
          </div>
          <div id ="tile-wrapper-row">
            <Tile numVal={4}>  </Tile>
            <CenterTile src={this.state.centerImgSrc}>  </CenterTile>
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
