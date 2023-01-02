import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",
        };
    }

    componentWillReceiveProps(){
      const {lat, lon} = this.props.coordData;
      this.getImgSrc(lat, lon);
    }

    getImgSrc = (lat, lon) => {
        console.log("latlon", lat, lon);
        let imgSrc = "";
        axios.get('https://api.flickr.com/services/rest',
            {
              params: {
                lat,
                lon,
                api_key: "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
                format: "json",
                nojsoncallback: 1,
                method: "flickr.photos.search",
              }
            })
            .then(response => {
              console.log("res", response);
              const images = response.data.photos.photo;
              console.log("imgs", images);
              if (images.length){
                const idx = Math.floor(Math.random() * images.length); // Grab random image index to display
                const img = images[idx];
                imgSrc = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;
              } else {
                imgSrc = "http://placehold.it/200x200";
              }
            });
        this.setState({
          imgSrc
        })
    };

    render() {
        return (
            <div className ={"tile peripheralTile"}>
                <img src = {this.state.imgSrc} className = "tileImage"/>
            </div>
        );
    }
}

export default Tile;
