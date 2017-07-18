import React from 'react';

export class CenterTile extends React.Component {
    render(){
    	const tileStyle = {
    		float: "left",
    		width: '30vh',
    		margin: '1vh'
    	}
    	const imgStyle = {
    		maxWidth: "100%"
    	}
        return(
            <div className="center-tile" style={tileStyle}>
            	{ this.props.photo }
                <img src={"http://via.placeholder.com/300x300"} style={imgStyle}/>
            </div>
        );
    }
}