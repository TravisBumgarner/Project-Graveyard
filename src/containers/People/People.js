import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import Person from '../../components/Person';

export class People extends Component {
  render() {
    const {
      people,
    } = this.props;

    const PeopleCards = people.map(p => <Person key={p._id} details={p}/> );
    return (
      <Fragment>
        { PeopleCards }
      </Fragment>

    )
  }
}

export default connect((state) => ({
  people: state.people.all,
}), {
})(People);

