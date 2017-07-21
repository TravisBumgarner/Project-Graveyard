import React from "react";
import { render } from "react-dom";
import axios from 'axios';

import { CenterTile } from "./components/CenterTile"
import { DirectionalTile } from "./components/DirectionalTile"
import { Search }  from "./components/Search"

class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	constructor(props){
		super(props);
		this.state = {
			"freshLoad": true,
			"location" : ""
		}
		axios.get('/test')
	 			.then(data => {
	 			console.log(data);
			 });
	}

	setLocation(location){
		console.log("setLocation called");
		this.setState( {
			"location": location,
			"freshLoad": false
		});

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


	
	render(){ 
		const leftContainerStyle = {
			width: "80vw",
			float: "left"
		}
		const rightContainerStyle = {
			width: "20vw",
			float: "right"
		}
		const imgsContainerStyle = {
			margin: "0px auto",
			width: "100vh"
		}


		const imgRow = {
			width: "100vh"
		}

		return (
			<div className = "index">
				{!this.state.freshLoad &&
					<div>
						<div className = "leftContainer" style = {leftContainerStyle}>
							<div className = "imgsContainer" style = {imgsContainerStyle}>
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
						<div className = "rightContainer" style = {rightContainerStyle}>
							<h1>{this.state.location}</h1>
						</div>
					</div>
				} 
				{ this.state.freshLoad &&
					<Search setLocation = {this.setLocation.bind(this) } hello = {"Hello"}/>
				}
			</div>
		);
	} 
}

render(<App />, window.document.getElementById("app")); // How it should be rendered