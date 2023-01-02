import React, { Component } from 'react';


import {
  Input
} from './SearchBar.styles';

export default class SearchBar extends Component {
  onChange = (e) => {
    const {
      onChange
    } = this.props;

  };


  render() {
    const {
      searchInput,
    } = this.state;
    return (
      <Input
        name="userInput"
        onChange={this.onChange}
        value={searchInput}
      />
    )
  }
} 
