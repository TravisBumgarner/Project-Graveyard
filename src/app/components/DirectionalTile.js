import React from 'react';



export class DirectionalTile extends React.Component {
    flickrUrl = "https://farm" + this.props.farmId + ".staticflickr.com/" + this.props.serverId + "/" + this.props.id + "_" + this.props.secret + ".jpg";

    render(){
    	const tileStyle = {
    		float: "left",
    		width: '30vh',
            height: '30vh',
    		margin: '1vh',
            position: 'relative',
            backgroundColor: "#000"
    	}
    	const imgStyle = {
    		maxWidth: "100%",
            maxHeight: "100%",
            verticalAlign: "center",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)"
    	}
        return(
            <div className="directional-tile" style={tileStyle}>
            	
                <img src={this.flickrUrl} style={imgStyle}/>
            </div>
        );
    }
}