import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Container,
  Text,
  Form,
  Input,
  Item,
  Icon,
  Button,
  Content,
  Spinner,
} from 'native-base';

import globalStyles from '../../styles/globalStyle';

import {startPin, startRegister} from '../../redux/actions/userActions';

export const Signup = ({
  userState,
  commonState,
  navigation,
  startPin,
  startRegister,
}) => {
  useEffect(() => {
    if (userState.logged_in) {
      navigation.navigate('App');
    }
  }, []);

  const [fullname, setFullname] = useState('Kinley');
  const [loginid, setLoginid] = useState('11705001761');
  const [mobileno, setMobileno] = useState('17314743');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const requestPin = () => {
    startPin(fullname, loginid, mobileno);
  };

  const registerUser = () => {
    startRegister(fullname, loginid, mobileno, email, pin);
  };

  return commonState.isLoading ? (
    <Spinner />
  ) : (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Item regular style={globalStyles.mb10}>
            <Icon name="person" />
            <Input
              value={fullname}
              onChangeText={usr => setFullname(usr)}
              placeholder="Full Name"
            />
          </Item>

          <Item regular style={globalStyles.mb10}>
            <Icon name="lock" />
            <Input
              value={loginid}
              onChangeText={usr => setLoginid(usr)}
              placeholder="CID/License No"
            />
          </Item>

          <Item regular style={globalStyles.mb10}>
            <Icon name="call" />
            <Input
              value={mobileno}
              onChangeText={usr => setMobileno(usr)}
              placeholder="Mobile No"
            />
          </Item>

          <Item regular style={globalStyles.mb10}>
            <Icon name="mail" />
            <Input
              value={email}
              onChangeText={usr => setEmail(usr)}
              placeholder="Email"
            />
          </Item>

          <Button
            block
            info
            iconLeft
            style={globalStyles.mb10}
            onPress={requestPin}>
            <Text>Get your PIN</Text>
            <Icon name="send" />
          </Button>

          <Item regular style={globalStyles.mb10}>
            <Icon name="key" />
            <Input
              value={pin}
              onChangeText={usr => setPin(usr)}
              placeholder="PIN"
            />
          </Item>

          <Button
            block
            success
            iconLeft
            style={globalStyles.mb10}
            onPress={registerUser}>
            <Text>Sign Up</Text>
            <Icon name="book" />
          </Button>

          <Button
            block
            info
            iconLeft
            style={globalStyles.mb10}
            onPress={() => navigation.navigate('Login')}>
            <Text>Back to Login</Text>
            <Icon name="arrow-round-back" />
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Signup.propTypes = {
  prop: PropTypes.object,
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

export default connect(mapStateToProps, {startPin, startRegister})(Signup);
