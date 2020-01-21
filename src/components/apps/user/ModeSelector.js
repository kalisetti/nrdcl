import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Text, Button, Icon, Grid, Row, Col} from 'native-base';
import Logo from '../../base/header/Logo';
import globalStyle from '../../../styles/globalStyle';

export const ModeSelector = ({userState, navigation}) => {
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    }

    if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    }
  }, []);

  return (
    <Grid>
      <Row>
        <Col style={{justifyContent: 'space-evenly'}}>
          <Logo />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            vertical
            transparent
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('CustomerTerms')}>
            <Icon name="ios-people" style={globalStyle.modeIcon} />
            <Text style={globalStyle.homeIconText}>Customer</Text>
          </Button>
        </Col>
        <Col>
          <Button
            vertical
            transparent
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate('TransporterTerms')}>
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
