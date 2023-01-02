import React, { Component } from 'react';
import './style.css';
import Tile from '../../containers/tile/index';
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

  getRadialCoords = () => {
    const latCenter = parseFloat(this.state.textInputLat);
    const lonCenter = parseFloat(this.state.textInputLon);
    const rad = parseFloat(this.state.textInputRad);
    let coordsData = getCoordsData(latCenter, lonCenter, rad);
    console.log("coords", coordsData);
    this.setState({coordsData});
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
        <button onClick={this.getRadialCoords}>Get Flickr Data</button>
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
