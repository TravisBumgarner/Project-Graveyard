import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HomeWrapper } from './Home.styles';

export class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        Hi.
      </HomeWrapper>
    );
  }
}

export default connect(() => ({

}), {

})(Home);
