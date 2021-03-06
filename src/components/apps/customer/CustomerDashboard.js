import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Icon, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import globalStyle from '../../../styles/globalStyle';
import Logo from '../../base/header/Logo';

export const CustomerDashboard = ({ userState, navigation }) => {
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
            onPress={() => navigation.navigate('SiteDashboard')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('SiteDashboard')}>
              <Icon name="md-construct" style={globalStyle.homeIcon} />
              <Text style={globalStyle.homeIconText}>Manage Site</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('VehicleDashboard')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('VehicleDashboard')}
            >
              <Icon
                name="dump-truck"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText} >Self Vehicle</Text>
            </Button>
          </Col>
        </Row>
        <Row size={1}>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('OrderDashboard')}>
            <Button vertical transparent style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('OrderDashboard')}>
              <Icon
                name="payment"
                type="MaterialIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Manage Orders</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('DeliveryList')}>
            <Button vertical transparent style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('DeliveryList')}>
              <Icon
                name="dump-truck"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Delivery</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
