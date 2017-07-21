import React from 'react';

export class Menu extends React.Component {
    render(){
        return(
            <div className="menu">
                <h1>{this.props.location}</h1>
            </div>
        );
    }
}