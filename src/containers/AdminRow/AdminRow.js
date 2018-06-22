import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { MEASUREMENTS_PROPERTIES_ORDERING } from '../../constants';
import measurementActions from '../../store/measurements/actions';


import {
} from './AdminRow.styles';

export class AdminRow extends Component {
  handleEdit = () => {
    const {
      data: { _id },
      openEditModal,
    } = this.props;

    openEditModal(_id);
  };

  handleDelete = () => {
    const {
      data: { _id },
      deleteMeasurement,
    } = this.props;
    const shouldDelete = confirm("Are you sure you want to delete this entry?");
    if(shouldDelete) deleteMeasurement(_id);
  };

  render() {
    const {
      data,
    } = this.props;

    const cells = MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
      return <TableCell padding="none" key={ m }>{ data[m] }</TableCell>
    });

    cells.push(
      <TableCell padding="none" key="edit">
        <Button onClick={ this.handleEdit } variant="raised" color="primary">Edit</Button>
      </TableCell>
    );

    cells.push(
      <TableCell padding="none" key="delete">
        <Button onClick={ this.handleDelete } variant="raised" color="secondary">Delete</Button>
      </TableCell>
    );
    return (
      <TableRow>
        { cells }
      </TableRow>
    )
  }
}

AdminRow.propTypes = {
  data: PropTypes.object.isRequired,
  deleteMeasurement: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default connect((state, props) => ({
}), {
  deleteMeasurement: measurementActions.deleteMeasurement,
})(AdminRow);