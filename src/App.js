/**
 * NRDCL eServices
 * @format
 * @flow
 */

// import React from 'react';
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { StatusBar } from 'react-native';
import Config from 'react-native-config';

import AppContainer from './components/base/navigation/AppNavigator';
import NavigationService from './components/base/navigation/NavigationService';
import NormalAppFooter from './components/base/footer/AppFooter';
import AuthAppFooter from './components/base/footer/AppFooterAuthenticated';

import globalStyle from './styles/globalStyle';
import UserInactivity from 'react-native-user-inactivity';
import { startLogout } from './redux/actions/userActions';
const App = ({ userState, startLogout }) => {
   
  return (
    <Container style={globalStyle.container}>
      <UserInactivity
        timeForInactivity={parseFloat(Config.SESSION_TIME_OUT)}
        onAction={startLogout}
      >
        <StatusBar
          backgroundColor={Config.APP_HEADER_COLOR}
          barStyle="light-content"
        />
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        {userState.logged_in && userState.profile_verified ? (
          <AuthAppFooter />
        ) : (
            <NormalAppFooter />
          )}
      </UserInactivity>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userState: state.userState,
    commonState: state.commonState,
  };
};

export default connect(mapStateToProps, { startLogout })(App);
