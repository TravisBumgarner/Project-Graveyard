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

  getImgUrlFromFlickrRequest(flickrObj){
    const i = flickrObj;
    return `https://farm${i.farm}.staticflickr.com/${i.server}/${i.id}_${i.secret}.jpg`;
  }

  getFlickrDataByLatLong = (lat, lon) =>{
    axios.get('http://127.0.0.1:8000/flickr_api/get_images',
      {
        params: {
          lat,
          lon,
          rad: this.state.textInputDistance
        }
      })
      .then(response => {
        const images = response.data.photos.photo;
        const i = images[0];
        // This should be optimized
        const imgUrl = this.getImgUrlFromFlickrRequest(i);
        console.log(`${lat} and ${lon} give ${imgUrl}`);
        return imgUrl;
      })
  };

  getFlickrData = () => {
    let surroundingCoords = getSurroundingCoords(this.state.textInputLat, this.state.textInputLong, this.state.textInputDistance);
    // console.log(surroundingCoords);
    // console.log(surroundingCoords.N);
    // const lat = surroundingCoords.N.LAT;
    // const lon = surroundingCoords.N.LON;
    // console.log(lat);
    // surroundingCoords.N.imgUrl = this.getFlickrDataByLatLong(lat, lon);
    // console.log(surroundingCoords);


    Object.keys(surroundingCoords).map((key, index) => {
      let lat = surroundingCoords[key]["LAT"];
      let lon = surroundingCoords[key]["LON"];
      surroundingCoords[key]["imgUrl"] = this.getFlickrDataByLatLong(lat, lon);
      console.log(surroundingCoords[key]["imgUrl"]);
    })
  };


  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.getFlickrData}>Get Flickr Data</button>


        <input type="text" name = "textInputLat" value={this.props.textInputLat} onChange={this.handleInputChange}/>
        <input type="text" name = "textInputLong" value={this.props.textInputLong} onChange={this.handleInputChange} />
        <input type="text" name = "textInputDistance" value={this.props.textInputLat} onChange={this.handleInputChange}/>
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
