import React, { Component } from 'react';
import './style.css';
import cursor from '../../img/cursor.png'

class TileHover extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className = 'arrow' src = {cursor} />
        );
    }
}
export default TileHover;
