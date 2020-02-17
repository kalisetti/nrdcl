import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, Button, Icon, Grid, Row, Col } from 'native-base';
import Logo from '../../base/header/Logo';
import globalStyle from '../../../styles/globalStyle';
import { StyleSheet, AsyncStorage } from 'react-native';

export const ModeSelector = ({ userState, navigation }) => {
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    }

    if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    }
  }, []);

  //Check customer aggreed tearms and condition before. If yes then navigate to customer deshboard
  const checkLocalStorageForCustomer = async () => {
    navigation.navigate('CustomerDashboard')
    // try {
    //   const value = await AsyncStorage.getItem('customerTermsAgreed');
    //   // console.log(value);
    //   if (value == null) {
    //     navigation.navigate('CustomerTerms')
    //   } else {
       
    //   }
    // } catch (error) {
    //   // Error retrieving data
    // }
  };

  //Check transporter aggreed tearms and condition before. If yes then navigate to transporter deshboard
  const checkLocalStorageTransporter = async () => {
    try {
      const value = await AsyncStorage.getItem('transporterTermsAgreed');
      // console.log(value);
      if (value == null) {
        navigation.navigate('TransporterTerms')
      } else {
        navigation.navigate('TransporterDashboard');
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <Grid>
      <Row>
        <Col style={{ justifyContent: 'space-evenly' }}>
          <Logo />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            vertical
            transparent
            style={{ alignSelf: 'center' }}
            onPress={checkLocalStorageForCustomer}>
            <Icon name="ios-people" style={globalStyle.modeIcon} />
            <Text style={globalStyle.homeIconText}>Customer</Text>
          </Button>
        </Col>
        <Col>
          <Button
            vertical
            transparent
            style={{ alignSelf: 'center' }}
            onPress={checkLocalStorageTransporter}>
            <Icon
              name="dump-truck"
              type="MaterialCommunityIcons"
              style={globalStyle.modeIcon}
            />
            <Text style={globalStyle.homeIconText}>Transporter</Text>
          </Button>
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelector);
