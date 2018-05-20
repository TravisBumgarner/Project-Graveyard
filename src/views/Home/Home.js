import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  HomeWrapper,
} from './Home.styles'

export class Home extends Component {
  render() {

    return (
      <HomeWrapper>
        Sup dawg.
      </HomeWrapper>
    )

  }
}

export default connect((state) => ({

}), {

})(Home);
