import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Text, Icon, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import globalStyle from '../../../styles/globalStyle';
import Logo from '../../base/header/Logo';
import { Image } from 'react-native'
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
        <Row size={1} >
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('ListTransport')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => navigation.navigate('ListTransport')}
            >
              <Icon
                name="truck-fast"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
                onPress={() => navigation.navigate('ListTransport')}
              />
              <Text style={globalStyle.homeIconText}
                onPress={() => navigation.navigate('ListTransport')}>List Transport</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('AddTransport')}>
            <Button vertical transparent style={{ alignSelf: 'center' }} >
              <Icon
                name="truck-check"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
                onPress={() => navigation.navigate('AddTransport')}
              />
              <Text style={globalStyle.homeIconText}
                onPress={() => navigation.navigate('AddTransport')}>Add Transport</Text>
            </Button>
          </Col>
        </Row>

        <Row size={1}>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('AddToQueue')}>
            <Button vertical transparent style={{ alignSelf: 'center' }}>
              <Icon
                name="link-box"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
                onPress={() => navigation.navigate('AddToQueue')}
              />
              <Text style={globalStyle.homeIconText}
              onPress={() => navigation.navigate('AddToQueue')}>Manage Queue</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}
            onPress={() => navigation.navigate('TransporterTermsRead')}>
            <Button
              vertical
              transparent
              style={{ alignSelf: 'center' }}
            >
              <Icon
                name="forward"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
                onPress={() => navigation.navigate('TransporterTermsRead')}
              />
              <Text style={globalStyle.homeIconText}
              onPress={() => navigation.navigate('TransporterTermsRead')}>TOR</Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransporterDashboard);
