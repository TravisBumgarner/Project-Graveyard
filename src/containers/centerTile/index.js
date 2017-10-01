import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import * as tileActions from '../../store/actions/tileActions'

import './style.css';
import TileHover from '../../components/tileHover/index';

class CenterTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false
        };
    }

    handleHover = () =>{
        this.setState({
            isHovered: !this.state.isHovered
        });
    };

    render() {
        const tileFocus = this.state.isHovered ? "activeTile" : "";

        return (
            <div
                className ={"tile centerTile " + tileFocus}
                onMouseEnter = {this.handleHover}
                onMouseLeave = {this.handleHover}
            >
                <h1>{this.props.tiles.centerTile}</h1>
                <img src={this.props.src} />
            </div>
        );
    }
}

CenterTile.propTypes = {
};

function mapStateToProps(state, ownProps){
    return {
        tiles: state.tiles,
        centerTile: state.centerTile
    }
}

// Used for deciding what actions to expose on component
// Can be passed as second parameter to connect


export default connect(mapStateToProps)(CenterTile);
