import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';


import SearchBar from '../../containers/SearchBar';
import People from '../../containers/People';

import {
  HomeCard
} from "./Home.styles";

export class Home extends Component {
  render(){

    return (
      <Fragment>
        <SearchBar />
        <People />
      </Fragment>

    )

  }
}

export default connect((state) => ({

}), {

})(Home);
