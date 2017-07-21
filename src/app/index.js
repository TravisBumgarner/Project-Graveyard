import React from "react";
import { render } from "react-dom";
import axios from 'axios';

import { CenterTile } from "./components/CenterTile"
import { DirectionalTile } from "./components/DirectionalTile"
import { Search }  from "./components/Search"
import { Menu } from "./components/Menu"


class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	constructor(props){
		super(props);
		this.state = {
			"freshLoad": true,
			"location" : "",
			"photosArray": flickrJsonData.photos.photo
		}
	}

	setLocation(location){
		console.log("setLocation called");
		this.setState( {
			"location": location,
			"freshLoad": false
		});

	}

	getFlickrPhotos(){
		// var photos = [];
		// var flickr_method = "flickr.photos.getPopular";
		// var flickr_secret = "";
		// var flickr_arguments = {
		// 	"api_key" : "",
		// 	"per_page" : 9,
		// 	"user_id" : "126568985@N04",
		// 	"format" : "json",
		// 	"nojsoncallback": 1 // Good lord was this confusing. USE THIS. 
		// }
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
									{console.log(this.state.photosArray[0].farm)}
									<DirectionalTile farmId = {this.state.photosArray[0].farm} serverId = {this.state.photosArray[0].server} id = {this.state.photosArray[0].id} secret = {this.state.photosArray[0].secret} />
									<DirectionalTile farmId = {this.state.photosArray[1].farm} serverId = {this.state.photosArray[1].server} id = {this.state.photosArray[1].id} secret = {this.state.photosArray[1].secret} />
									<DirectionalTile farmId = {this.state.photosArray[2].farm} serverId = {this.state.photosArray[2].server} id = {this.state.photosArray[2].id} secret = {this.state.photosArray[2].secret} />							
								</div>
								<div className = "img-row" style={imgRow}>
									<DirectionalTile farmId = {this.state.photosArray[3].farm} serverId = {this.state.photosArray[3].server} id = {this.state.photosArray[3].id} secret = {this.state.photosArray[3].secret} />
									<CenterTile />
									<DirectionalTile farmId = {this.state.photosArray[4].farm} serverId = {this.state.photosArray[4].server} id = {this.state.photosArray[4].id} secret = {this.state.photosArray[4].secret} />							
								</div>
								<div className = "img-row" style={imgRow}>
									<DirectionalTile farmId = {this.state.photosArray[5].farm} serverId = {this.state.photosArray[5].server} id = {this.state.photosArray[5].id} secret = {this.state.photosArray[5].secret} />
									<DirectionalTile farmId = {this.state.photosArray[6].farm} serverId = {this.state.photosArray[6].server} id = {this.state.photosArray[6].id} secret = {this.state.photosArray[6].secret} />
									<DirectionalTile farmId = {this.state.photosArray[7].farm} serverId = {this.state.photosArray[7].server} id = {this.state.photosArray[7].id} secret = {this.state.photosArray[7].secret} />							
								</div>
							</div>
						</div>
						<div className = "rightContainer" style = {rightContainerStyle}>
							<Menu location = {this.state.location} />
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