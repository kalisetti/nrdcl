/**
 * NRDCL eServices
 * @format
 * @flow
 */

import React from 'react';
import {connect} from 'react-redux';
import {Container} from 'native-base';
import {StatusBar} from 'react-native';
import Config from 'react-native-config';

import AppContainer from './components/base/navigation/AppNavigator';
import NavigationService from './components/base/navigation/NavigationService';
import NormalAppFooter from './components/base/footer/AppFooter';
import AuthAppFooter from './components/base/footer/AppFooterAuthenticated';

import globalStyle from './styles/globalStyle';

const App = ({userState}) => {
  return (
    <Container style={globalStyle.container}>
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
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    userState: state.userState,
    commonState: state.commonState,
  };
};

export default connect(mapStateToProps)(App);
