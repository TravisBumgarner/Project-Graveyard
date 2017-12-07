import React, {Component} from 'react';
import { connect } from 'react-redux';

class RecentHistory extends Component {
  render() {
    const { } = this.props;

    return (
      <div>
        Hi
      </div>
    );
  }
}

export default connect(state => ({
  width: state.ui.meta.window.width,
}), {
})(RecentHistory);
