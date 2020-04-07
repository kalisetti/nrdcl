/**
 * NRDCL eServices
 * @format
 * @flow
 */

import React, {useState,Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { StatusBar, Alert, Linking, BackHandler } from 'react-native';
import Config from 'react-native-config';
import AppContainer from './components/base/navigation/AppNavigator';
import NavigationService from './components/base/navigation/NavigationService';
import NormalAppFooter from './components/base/footer/AppFooter';
import AuthAppFooter from './components/base/footer/AppFooterAuthenticated';

import globalStyle from './styles/globalStyle';
import UserInactivity from 'react-native-user-inactivity';
import { startLogout } from './redux/actions/userActions';
import VersionCheck from 'react-native-version-check';
const App = ({ userState, startLogout }) => { 
  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    let provider = 'playStore';
    if (Platform.OS === 'ios') {
      provider = 'appStore';
    }

    try {
      const latestVersion = await VersionCheck.getLatestVersion({
        provider,
      });

      let updateNeeded = await VersionCheck.needUpdate({
        currentVersion: VersionCheck.getCurrentVersion(),
        latestVersion,
      });

      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using.',
          [{text: 'Update', onPress: () => updateAppRedirect()}],
          {cancelable: false},
        );
      }
    } catch (error) {}
  };

  const updateAppRedirect = () => {
    BackHandler.exitApp();
    if (Platform.OS === 'android') {
      Linking.openURL('market://details?id=com.nrdcl');
    }
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'itms://itunes.apple.com/us/app/apple-store/com.nrdcl?mt=8',
      );
    }
  };

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