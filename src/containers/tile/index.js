import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import * as tileActions from '../../store/actions/tileActions'

import './style.css';
import TileHover from '../../components/tileHover/index';

class Tile extends Component {
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

    updateCenterTile = () =>{
        this.props.dispatch(tileActions.moveTileToCenter(this.props.numVal));
    };


    render() {
        console.log(this.props.coordData);
        const tileFocus = this.state.isHovered ? "activeTile" : "";

        return (
            <div
                className ={"tile peripheralTile " + tileFocus}
                onMouseEnter = {this.handleHover}
                onMouseLeave = {this.handleHover}
            >
            {this.props.numVal}
            {tileFocus?
                <TileHover
                    title = 'France'
                    url='https://flickr.com'
                    updateCenterTile={this.updateCenterTile}
                /> :
                null
            }
            </div>
        );
    }
}

Tile.propTypes = {
};

function mapStateToProps(state, ownProps){
    return {
        tiles: state.tiles
    }
}

// Used for deciding what actions to expose on component
// Can be passed as second parameter to connect
function mapDispatchToProps(){

}

export default connect(mapStateToProps)(Tile);
