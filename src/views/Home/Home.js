import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HomeWrapper } from './Home.styles';

export class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <Link to="/snippets/create">Create a snippet.</Link>
      </HomeWrapper>
    );
  }
}

export default connect(() => ({

}), {

})(Home);
