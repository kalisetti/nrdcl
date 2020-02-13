import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Icon, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import globalStyle from '../../../styles/globalStyle';
import Logo from '../../base/header/Logo';

export const TransporterDashboard = ({ userState, navigation }) => {
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
          <Col style={globalStyle.homeButton}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('TransportDashboard')}>
              <Icon
                name="dump-truck"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Manage Transport</Text>
            </Button>
          </Col>
          {/* <Col style={globalStyle.homeButton}>
            <Button vertical transparent style={{alignSelf: 'center'}}>
              <Icon
                name="truck-delivery"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Manage Delivery</Text>
            </Button>
          </Col> */}
        </Row>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransporterDashboard);
