import React, { Component } from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';

import { DIRECTIONS } from '../../utilities/constants';
import GridTile from '../GridTile';

// const style = (width, height) => ({
//   width: '80vw',
//   height: '80vw',
//   margin: '0px auto',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-around',
//   flexDirection: 'row',
//   flexFlow: 'row wrap',
// });

const MyGrid = styled.div`
  width: ${props => props.gridSideLength};
  height: ${props => props.gridSideLength};
  max-width: ${props => props.gridSideLength};
  max-height: ${props => props.gridSideLength};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-flow: row wrap;
`;

export class ThreeByThreeGrid extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    let { width, height } = this.props;

    const grid = DIRECTIONS.map(direction => {
      return (
        <GridTile
          key={direction}
          direction={direction}
        />
      );
    });

    const gridSideLength = height >= width + 50 // 50px for app bar height
      ? "100vw"
      : `${height - 50}px`;

    return (
      <MyGrid gridSideLength={gridSideLength}>
        { grid }
      </MyGrid>
    );
  }
}

export default connect(state => ({
  width: state.ui.meta.window.width,
  height: state.ui.meta.window.height,
}), {

})(ThreeByThreeGrid);
