import React, { Component } from 'react';
import './style.css';
import TileHover from '../tileHover';

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {isHovered: false};
    }

    handleHover = () =>{
        this.setState({
            isHovered: !this.state.isHovered
        });
    };

    render() {
        const tileLocation = this.props.center ?
            "centerTile" :
            "peripheralTile";

        const tileFocus = this.state.isHovered ? "activeTile" : "";

        return (
            <div
                className ={"tile " + tileLocation + " " + tileFocus}
                onMouseEnter = {this.handleHover}
                onMouseLeave = {this.handleHover}
            >
            {tileFocus?
                <TileHover title = 'France' url='https://flickr.com' /> :
                null
            }
            </div>
        );
    }
}
export default Tile;
