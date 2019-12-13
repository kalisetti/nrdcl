import React, {Fragment} from 'react';
import {Button, Icon} from 'native-base';
import NavigationService from '../navigation/NavigationService';
import {connect} from 'react-redux';

import {logout} from '../../../redux/actions/userActions';
import globalStyle from '../../../styles/globalStyle';

const Logout = ({userState, logout}) => {
  const performLogout = () => {
    logout();
    NavigationService.navigate('Login');
  };

  return (
    <Fragment>
      {userState.logged_in && (
        <Button transparent onPress={performLogout}>
          <Icon name="log-out" style={globalStyle.icon} />
        </Button>
      )}
    </Fragment>
  );
};

const mstp = state => ({
  userState: state.userState,
});

export default connect(mstp, {logout})(Logout);
