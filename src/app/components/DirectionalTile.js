import React from 'react';

export class DirectionalTile extends React.Component {
    render(){
        return(
            <div className="directional-tile">
            	{ this.props.photo }
                <img src={"http://via.placeholder.com/300x300"} />
            </div>
        );
    }
}