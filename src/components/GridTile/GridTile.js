import React, { Component } from 'react';
import { connect } from 'react-redux';

export class gridTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  render() {
    return (
      <div className="gridTile">
        HI
      </div>
    );
  }
}

export default connect(state => ({
}), {

})(gridTile);
