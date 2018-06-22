import React, { Component, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { DefaultCard } from "../../theme";

import {
} from './SearchBar.styles';
import {withRouter} from "react-router-dom";
import searchActions from "../../store/search/actions";
import {connect} from "react-redux";

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };

  handleSubmit = () => {
    const {
      query,
    } = this.state;

    const {
      getSearch,
    } = this.props;

    getSearch();

  };

  render() {
    const {
      query,
    } = this.state;

    return (
     <DefaultCard>
       <CardContent>
          <TextField
            id="query"
            label="Search Term"
            value={query}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleSubmit}>
            Search
          </Button>
       </CardContent>
     </DefaultCard>

    )
  }
}

export default withRouter(connect((state) => ({
}), {
    getSearch: searchActions.getSearch,
})(SearchBar));
