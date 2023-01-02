import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Favorite from 'react-icons/lib/md/favorite';
import FaArrowsAlt from 'react-icons/lib/fa/arrows-alt';
import MdFlightTakeoff from 'react-icons/lib/md/flight-takeoff';

const ICON_SIZE = 40;

const GridHover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.8);
  text-align: center;
  opacity: 0;
  
  &:hover{
    background-color: #fff;
    opacity: 0.6;
  }
`;

export class TileHover extends Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    flickrPage: PropTypes.string.isRequired,
  };


  render() {
    const { direction, onClick, flickrPage } = this.props;
    return (
      <GridHover>
        <h1 >{direction}</h1>
        <MdFlightTakeoff size={ICON_SIZE} onClick={onClick} />
        <a target="_blank" href={flickrPage}>
          <Favorite
            size={ICON_SIZE}
          />
        </a>
        <FaArrowsAlt size={ICON_SIZE} />
      </GridHover>
    );
  }
}


export default connect(() => ({
}), {
})(TileHover);
