import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Map from '../../components/Map';

class RecentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };

  static propTypes = {
    width: PropTypes.number,
  };

  render() {
    const { } = this.props;
    return (
      <Map />
    );
  }
}

export default connect(state => ({
  width: state.ui.meta.window.width,
}), {
})(RecentHistory);
