import React, { Component, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { DefaultCard } from "../../theme";

import {
} from './Pagination.styles';
import {withRouter} from "react-router-dom";
import searchActions from "../../store/search/actions";
import {connect} from "react-redux";

export class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
    };
  }

  getNextPage = () => {
    const {
      getMoreResults,
      currentPage,
      totalPages,
      query,
    } = this.props;

    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      getMoreResults(query, nextPage);
    } else {
      alert('No more results');
    }
  };

  getPrevPage = () => {
    const {
      getMoreResults,
      currentPage,
      query,
    } = this.props;

    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      getMoreResults(query, prevPage);
    } else {
      alert('No more results');
    }
  }

  render() {
    const {
      currentPage,
      totalPages,
    } = this.props;

    return (
     <DefaultCard>
       <CardContent>
         {currentPage} of {totalPages} pages
         <Button onClick={this.getNextPage}>Next</Button>
         <Button onClick={this.getPrevPage}>Prev</Button>
       </CardContent>
     </DefaultCard>

    )
  }
}

export default withRouter(connect((state) => ({
  currentPage: state.search.meta.currentPage,
  totalPages: state.search.meta.totalPages,
  query: state.search.meta.query,
}), {
    getMoreResults: searchActions.getMoreResults,
})(Pagination));
