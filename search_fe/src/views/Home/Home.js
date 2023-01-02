import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';


import SearchBar from '../../containers/SearchBar';
import People from '../../containers/SearchResults';
import Pagination from '../../containers/Pagination';

import {
  HomeCard
} from "./Home.styles";

export class Home extends Component {
  render(){
    const {
      wasSearchPerformed,
    } = this.props;

    return (
      <Fragment>
        <SearchBar />
        { wasSearchPerformed && <Pagination /> }
        <People />
      </Fragment>

    )

  }
}

export default connect((state) => ({
  wasSearchPerformed: state.search.meta.wasSearchPerformed,
}), {

})(Home);
