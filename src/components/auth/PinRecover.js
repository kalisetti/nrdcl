import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Text,
  Form,
  Input,
  Item,
  Icon,
  Button,
  Content,
} from 'native-base';

import globalStyles from '../../styles/globalStyle';
import { startResetPin } from '../../redux/actions/userActions';
import { setLoading } from '../../redux/actions/commonActions';

export const PinRecover = ({ userState, navigation, startResetPin }) => {
  useEffect(() => {
    if (userState.logged_in) {
      navigation.navigate('App');
    }
  }, []);

  const [loginid, setLoginid] = useState('');
  const [mobileno, setMobileno] = useState('');

  const requestPin = () => {
    setLoading(true)
    startResetPin(loginid, mobileno);
  };

  return (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Item regular style={globalStyles.mb10}>
            <Icon name="lock" />
            <Input
              value={loginid}
              onChangeText={usr => setLoginid(usr)}
              placeholder="CID Number"
              keyboardType={'numeric'}
            />
          </Item>

          <Item regular style={globalStyles.mb10}>
            <Icon name="call" />
            <Input
              value={mobileno}
              onChangeText={usr => setMobileno(usr)}
              placeholder="Mobile No"
              keyboardType={'numeric'}
            />
          </Item>

          <Button
            block
            success
            iconLeft
            style={globalStyles.mb10}
            onPress={requestPin}>
            <Text>Send my new PIN</Text>
            <Icon name="send" />
          </Button>

          <Button
            block
            warning
            iconLeft
            style={globalStyles.mb10}
            onPress={() => navigation.goBack()}>
            <Text>Go Back</Text>
            <Icon name="arrow-round-back" />
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

PinRecover.propTypes = {
  prop: PropTypes.object,
};

const mapStateToProps = state => ({
  userState: state.userState,
});

export default connect(mapStateToProps, { startResetPin })(PinRecover);
