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
			images: []
		}
	}

	buildFlickrUrl(api_method, api_key,  api_arguments){
		var api_url = "https://api.flickr.com/services/rest/?method=" + api_method;
		api_url += Object.entries(api_arguments).map(([key,value]) => {
			return(
				"&" + key + "=" + value
			);
		})
		console.log(api_url);
		return api_url;
	}

	componentDidMount(){
		{/* componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM 
		nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the 
		network request. Setting state in this method will trigger a re-rendering.*/}

		var api_method = "flickr.photos.getPopular";
		var flickr_secret = "60f11289eebaf65c";
		var flickr_arguments = {
			"api_key" : "0ebb6cf43cd6ccab59f2ffaf1b63f0c5",
			"per_page" : 9,
			"user_id" : "126568985@N04",
			"format" : "json"
		}
		var flickr_url = this.buildFlickrUrl(api_method, flickr_key, api_arguments);
	}

	render(){ 
		{
		return (
			<div className = "container">
				<div className = "row">
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
				</div>

				<div className = "row">
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
					<div className = "col-xs-4">
						<CenterTile/>
					</div>
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
				</div>

				<div className = "row">
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
					<div className = "col-xs-4">
						<DirectionalTile/>
					</div>
				</div>
			</div>
		);
	} 
}

render(<App/>, window.document.getElementById("app")); // How it should be rendered