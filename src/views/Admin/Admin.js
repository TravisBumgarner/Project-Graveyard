import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { MEASUREMENTS_PROPERTIES_ORDERING } from '../../constants';

import AdminRow from '../../containers/AdminRow';
import AdminCreateEditModal from '../../containers/AdminCreateEditModal';

import {
  AdminCard
} from "./Admin.styles";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isEditMode: false,
      selectedId: '',
    };
  }

  setModalToCreate = () => {
    this.setState({
      isModalOpen: true,
      isEditMode: false,
      selectedId: '',
    })
  };

  setModalToEdit = (_id) => {
    this.setState({
      isModalOpen: true,
      isEditMode: true,
      selectedId: _id,
    })
  };

  setModaltoClosed = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  };

  render(){
    const {
      measurements,
    } = this.props;

    const {
      isModalOpen,
      isEditMode,
      selectedId,
    } = this.state;

    const headerCells = MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
      return <TableCell padding="none" key={ m }>{ m.toUpperCase() }</TableCell>
    });
    headerCells.push(<TableCell padding="none" key="edit">EDIT</TableCell>);
    headerCells.push(<TableCell padding="none" key="delete">DELETE</TableCell>);

    const rows = measurements.map(m => {
      return (
        <AdminRow
          key={ m._id }
          data={ m }
          openEditModal={ this.setModalToEdit }
        />
      )
    });
    return (
      <AdminCard>
        <CardHeader
           title="Admin"
        />
        <CardContent>
          <Button onClick={ this.setModalToCreate } variant="raised" color="primary">Create</Button>
          <Table>
            <TableHead>
              <TableRow>
                { headerCells }
              </TableRow>
            </TableHead>
            <TableBody>
              { rows }
            </TableBody>
          </Table>
          <AdminCreateEditModal
            closeModal = { this.setModaltoClosed }
            isModalOpen = { isModalOpen }
            isEditMode = { isEditMode }
            selectedId = { selectedId }
          />
        </CardContent>
      </AdminCard>
    )
  }
}

export default connect((state) => ({
  measurements: state.measurements.all,
}), {

})(Admin);




