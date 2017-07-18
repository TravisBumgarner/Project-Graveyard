import React from "react";
import { render } from "react-dom";
import axios from 'axios';

import { CenterTile } from "./components/CenterTile"
import { DirectionalTile } from "./components/DirectionalTile"

class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	constructor(props){
		super(props);
		this.state = {
		}
	}

	getFlickrPhotos(){
		var photos = [];
		var flickr_method = "flickr.photos.getPopular";
		var flickr_secret = "60f11289eebaf65c";
		var flickr_arguments = {
			"api_key" : "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
			"per_page" : 9,
			"user_id" : "126568985@N04",
			"format" : "json",
			"nojsoncallback": 1 // Good lord was this confusing. USE THIS. 
		}
		var flickr_url = "https://api.flickr.com/services/rest/?method=" + flickr_method;
		Object.entries(flickr_arguments).map(([key,value]) => {
			flickr_url += "&" + key + "=" + value;
		})

		axios.get(flickr_url)
			 .then(data => {
			 	var photos = data.data.photos.photo;
	 			this.setState({ "photos": photos, show: true });
	 			console.log(this.state);
			 });


	}

	componentWillMount(){
	}

	componentDidMount(){
		{/* componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM 
		nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the 
		network request. Setting state in this method will trigger a re-rendering.*/}

		this.getFlickrPhotos();
	}
	
	render(){ 
		const containerStyle = {
			margin: "0px auto",
			width: "100vh"
		}

		const googleMapsStyle = {
		  height: "100vh", 
		  width: "100vw",
		  position: "absolute", 
		  top: "0", 
		  left: "0",
		  zIndex: "-1",
		  backgroundColor: "black"
		}

		const imgRow = {
			width: "100vh"
		}
		return (
			<div className = "index">
				<div id="googlemaps" style={ googleMapsStyle }></div>
				<div className = "container" style = {containerStyle}>
					<div className = "img-row" style={imgRow}>
						<DirectionalTile />
						<DirectionalTile />
						<DirectionalTile />							
					</div>
					<div className = "img-row" style={imgRow}>
						<DirectionalTile />
						<CenterTile />
						<DirectionalTile />							
					</div>
					<div className = "img-row" style={imgRow}>
						<DirectionalTile />
						<DirectionalTile />
						<DirectionalTile />							
					</div>
				</div>
			</div>
		);
	} 
}

render(<App/>, window.document.getElementById("app")); // How it should be rendered