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

const MAX_BEDS = 10;
const MIN_BEDS = 1;

export default class SearchBar extends Component {
  handleChange = (e) => {
  };

  handleSubmit = () => {
  };

  render() {
    return (
     <DefaultCard>
       <CardContent>
         <p>Hi</p>
       </CardContent>
     </DefaultCard>

    )
  }
}
