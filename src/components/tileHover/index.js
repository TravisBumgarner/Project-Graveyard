import React, { Component } from 'react';
import PropTypes from 'prop-types'

import './style.css';
import cursor from '../../img/cursor.png'

class TileHover extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "tileHover">
                {/*<img className = 'arrow' src = {cursor} />*/}
                <button onClick = { this.props.updateCenterTile }>Center This</button>
            </div>
        );
    }
}

TileHover.propTypes = {
    flickrUrl: PropTypes.string,
    loadFullImage: PropTypes.func,
}

export default TileHover;
