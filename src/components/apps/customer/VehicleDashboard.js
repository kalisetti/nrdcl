import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Icon, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import globalStyle from '../../../styles/globalStyle';
import Logo from '../../base/header/Logo';

export const VehicleDashboard = ({ userState, navigation }) => {
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    }
    if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    }
  }, []);

  return (
    <Container>
      <Grid>
        <Row size={2}>
          <Col style={{ justifyContent: 'space-evenly' }}>
            <Logo />
          </Col>
        </Row>
        <Row size={1}>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('ListVehicle')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('ListVehicle')}>
              <Icon
                name="truck-fast"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>List Vehicles</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('AddVehicle')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('AddVehicle')}>
              <Icon
                name="truck-check"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Add Vehicle</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDashboard);
