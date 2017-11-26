import React, {Component} from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import uiActions from '../../store/ui/actions';

class NavBar extends Component {
  render() {
    const { toggleSideMenu } = this.props;

  const RightMenu = (props) => (
    <div>
      <IconButton onClick={ toggleSideMenu }><ActionFlightTakeoff /></IconButton>
    </div>
  );

    return (
        <AppBar
          title="PhotoVentures"
          iconElementRight={ <RightMenu /> }
        />
    );
  }
}

export default connect(state => ({
}), {
  toggleSideMenu: uiActions.toggleSideMenu,
})(NavBar);
