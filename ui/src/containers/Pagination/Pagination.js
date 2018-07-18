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

import { DEFAULT_PAGINATION } from "../../constants";

export class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  getNextPage = () => {
    const {
      getMoreResults,
      currentPage,
      totalPages,
      query: {
        number_of_beds,
        min_square_feet,
        query,
      },
    } = this.props;

    const nextPage = currentPage + 1;

    if (nextPage <= totalPages) {
      const requestBody = {
        query,
        number_of_beds,
        min_square_feet,
        from: nextPage * DEFAULT_PAGINATION,
      };

      getMoreResults(requestBody, nextPage);
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

      // const requestBody = {
      //   query,
      //   number_of_beds: numberOfBeds,
      //   min_square_feet: sqFt,
      //   from: currentPage * DEFAULT_PAGINATION,
      // };

      getMoreResults(requestBody);
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
