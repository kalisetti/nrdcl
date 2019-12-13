import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';

const LoadingScreen = ({userState, navigation}) => {
  // Check Redux store and then navigate to our appropriate place
  useEffect(() => {
    navigation.navigate(userState.logged_in ? 'App' : 'Auth');
  }, []);

  //Rendering of the opening activity like animated logo, etc
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(LoadingScreen);
