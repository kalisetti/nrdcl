import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, Text, Icon, Button} from 'native-base';
import {Grid, Col, Row} from 'react-native-easy-grid';
import globalStyle from '../../../styles/globalStyle';
import Logo from '../../base/header/Logo';

export const TransportDashboard = ({userState, navigation}) => {
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
          <Col style={{justifyContent: 'space-evenly'}}>
            <Logo />
          </Col>
        </Row>
        <Row size={1}>
          <Col style={globalStyle.homeButton}>
            <Button
              vertical
              transparent
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('QueueStatus')}>
              <Icon
                name="sort"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Queue Status</Text>
            </Button>
          </Col>
          <Col style={globalStyle.homeButton}>
            <Button
              vertical
              transparent
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('AddToQueue')}>
              <Icon
                name="sort-ascending"
                type="MaterialCommunityIcons"
                style={globalStyle.homeIcon}
              />
              <Text style={globalStyle.homeIconText}>Apply for Queue</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransportDashboard);
