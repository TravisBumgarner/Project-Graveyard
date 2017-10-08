import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
import CenterTile from '../../containers/centerTile/index';
import PropTypes from 'prop-types'
import axios from 'axios';
import { getCoordsData } from '../../utils/helper_functions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerImgSrc: "",
      textInputLat: "42.3736",
      textInputLon: "-71.1097",
      textInputRad: "0.5",
      coordsData: getCoordsData(),
    };
  }
  
  getFlickrData = () => {
    const latCenter = parseFloat(this.state.textInputLat);
    const lonCenter = parseFloat(this.state.textInputLon);
    const rad = parseFloat(this.state.textInputRad);

    let coordsData = getCoordsData(latCenter, lonCenter, rad);
    console.log(coordsData);
    let promises = [];

    for (let coord in coordsData) {
      promises.push(axios.get('https://api.flickr.com/services/rest',
            {
              params: {
                lat: coordsData[coord].lat,
                lon: coordsData[coord].lon,
                tags: "nature, wildlife, outdoors, travel, adventure, cityscape, landscape, city",
                api_key: "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
                format: "json",
                nojsoncallback: 1,
                method: "flickr.photos.search",
              }
            })
            .then(response => {
              console.log(response);
              const images = response.data.photos.photo;

              if (images.length){
                const idx = Math.floor(Math.random() * images.length); // Grab random image index to display
                const img = images[idx];
                const imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
                coordsData[coord]["imgUrl"] = imgUrl;
              } else {
                coordsData[coord]["imgUrl"] = "http://placehold.it/200x200"
              }

            })
      )
    }
    axios.all(promises).then((responses)=> {
      this.setState({coordsData});
    });
  };

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div className="App">
        <input type="text" name = "textInputLat" value={this.state.textInputLat} onChange={this.handleInputChange}/>
        <input type="text" name = "textInputLon" value={this.state.textInputLon} onChange={this.handleInputChange} />
        <input type="text" name = "textInputRad" value={this.state.textInputRad} onChange={this.handleInputChange}/>
        <button onClick={this.getFlickrData}>Get Flickr Data</button>
        <div id="tile-wrapper-all">
          <div id ="tile-wrapper-row">
            <Tile coordData={this.state.coordsData["NW"]}>  </Tile>
            <Tile coordData={this.state.coordsData["N"]}>  </Tile>
            <Tile coordData={this.state.coordsData["NE"]}>  </Tile>
          </div>
          <div id ="tile-wrapper-row">
            <Tile coordData={this.state.coordsData["W"]}>  </Tile>
            <Tile coordData={this.state.coordsData["C"]}  center = { true } >  </Tile>
            <Tile coordData={this.state.coordsData["E"]}>  </Tile>
          </div>
          <div id ="tile-wrapper-row">
            <Tile coordData={this.state.coordsData["SW"]}>  </Tile>
            <Tile coordData={this.state.coordsData["S"]}>  </Tile>
            <Tile coordData={this.state.coordsData["SE"]}>  </Tile>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
