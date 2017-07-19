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
			"freshLoad": true,
			"location" : ""
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

	welcomePromptSubmit = (e) => {
	    if (e.key === 'Enter') {
      		this.setState({
      			freshLoad: false,
      			location: e.target.value
      		})
	    }
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
		const helloWindowStyle = {
			width: "250px",
			border: "2px solid #4286f4",
			borderRadius: "5px",
			backgroundColor: "#adccff",
			margin: "40vh auto 0px",
			padding: "10px",
			textAlign: "center",
			color: "#fff"
		}

		const inputStyle = {
			"backgroundColor":"rgb(66, 134, 244)",
			"border":"0px",
			"borderRadius":"5px",
			"padding":"5px",
			"textAlign":"center"}

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
					<div className = "helloWindow" style = {helloWindowStyle}>
						<label>Where would you like to go?</label><br />
						<input name = "welcomePrompt" id="welcomePrompt" style = {inputStyle} onKeyUp={this.welcomePromptSubmit}/>
					</div>
				}
			</div>
		);
	} 
}

render(<App/>, window.document.getElementById("app")); // How it should be rendered