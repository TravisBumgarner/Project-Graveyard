import React, {Component, Fragment} from 'react';

import SearchBar from '../../containers/SearchBar';
import People from '../../containers/SearchResults';
import Pagination from '../../containers/Pagination';

import {
  HomeCard
} from "./Home.styles";

export default class Home extends Component {
  render(){
    return (
      <Fragment>
        <SearchBar />
        <People />
      </Fragment>

    )

  }
}
