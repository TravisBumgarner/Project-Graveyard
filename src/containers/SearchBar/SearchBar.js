import React, { Component, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Slider from '@material-ui/lab/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { DefaultCard } from "../../theme";

import {
} from './SearchBar.styles';
import {withRouter} from "react-router-dom";
import searchActions from "../../store/search/actions";
import {connect} from "react-redux";

const MAX_BEDS = 10;
const MIN_BEDS = 1;

export class SearchBar extends Component {
  constructor(props){
    super(props);

    const {
      stats: {
        max_sq_ft,
        min_sq_ft,
      }
    } = this.props;

    this.state = {
      query: "",
      numberOfBeds: 1,
      maxSqFt: max_sq_ft,
      minSqFt: min_sq_ft,
      sqFt: min_sq_ft,
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSliderChange = (event, value) => this.setState({ [event.target.id]: value });

  handleSubmit = () => {
    console.log(this.state);

    const {
      query,
      numberOfBeds,
      sqFt,
    } = this.state;

    const {
      performNewSearch,
    } = this.props;

    const requestBody = {
      query,
      number_of_beds: numberOfBeds,
      min_square_feet: sqFt,
    };

    performNewSearch(requestBody);

  };

  render() {
    const {
      query,
      numberOfBeds,
      maxBeds,
      minBeds,
      maxSqFt,
      minSqFt,
      sqFt,
    } = this.state;

    const {
      stats: {
        max_sq_ft,
        min_sq_ft,
        distinct_beds,
      }
    } = this.props;

    const BedDropdownItems = distinct_beds.map(db => <MenuItem value={db} key={db}>{db}</MenuItem>);

    return (
     <DefaultCard>
       <CardContent>
          <TextField
            name="query"
            label="Search Term (City, State, Zip)"
            value={query}
            onChange={this.handleChange}
            fullWidth
          />
         <Typography id="label">Number of Beds:</Typography>
         <Select
           value={this.state.numberOfBeds}
           onChange={this.handleChange}
           inputProps={{
             name: 'numberOfBeds',
           }}
         >
           {BedDropdownItems}
         </Select>
         <Typography id="label">Min Square Feet: {Math.floor(sqFt)} ({minSqFt} to {maxSqFt})</Typography>
          <Slider
            max={max_sq_ft}
            min={min_sq_ft}
            step={(max_sq_ft - min_sq_ft) / 100}
            value={sqFt}
            id="sqFt"
            onChange={this.handleSliderChange}
          />
          <Button
            onClick={this.handleSubmit}
            fullWidth
          >
            Search
          </Button>
       </CardContent>
     </DefaultCard>

    )
  }
}

export default withRouter(connect((state) => ({
  stats: state.session.stats,
}), {
  performNewSearch: searchActions.performNewSearch,
})(SearchBar));
