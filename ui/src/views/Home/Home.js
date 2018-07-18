import React, {Component} from 'react';

import {
  SearchBar,
} from '../../containers';

import {
  HomeCard
} from "./Home.styles";

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: [],
    }
  }

  render(){
    return (
      <HomeCard>
        <SearchBar />
      </HomeCard>
    )

  }
}
