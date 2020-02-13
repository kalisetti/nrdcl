import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';
import {
  Container,
  Text,
  Icon,
  Form,
  Item,
  Input,
  Button,
  Content,
  Spinner,
} from 'native-base';

import {startLogin} from '../../redux/actions/userActions';
import {setLoading} from '../../redux/actions/commonActions';
import globalStyles from '../../styles/globalStyle';
import Logo from '../base/header/Logo';

const Login = ({
  navigation,
  userState,
  commonState,
  setLoading,
  startLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (userState.logged_in) {
      navigation.navigate('Auth');
    } else {
      fetchUsername();
    }
  }, [reload]);

  //Fill preverious filled username by default
  const fetchUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('nrdcl_username');
      if (storedUsername) {
        setUsername(storedUsername.slice(5));
      }
    } catch (error) {}
  };

  const performLogin = () => {
    setLoading(true);
    startLogin(username, password);
  };

  return commonState.isLoading ? (
    <Container style={globalStyles.container}>
      <Spinner color="green" />
    </Container>
  ) : (
    <Container>
      <NavigationEvents
        onWillFocus={_ => {
          setReload(1);
        }}
        onWillBlur={_ => {
          setReload(0);
        }}
      />
      <Content style={styles.content}>
        <Logo />
        <Form>
          <Item regular style={globalStyles.mb10}>
            <Icon name="person" />
            <Input
              value={username}
              onChangeText={usr => setUsername(usr)}
              placeholder="CID Number"
              keyboardType={'numeric'}
            />
          </Item>

          <Item regular style={globalStyles.mb10}>
            <Icon name="unlock" />
            <Input
              secureTextEntry={true}
              value={password}
              onChangeText={pwd => setPassword(pwd)}
              placeholder="PIN"
              keyboardType={'numeric'}
            />
          </Item>
          <Button
            block
            success
            iconRight
            style={globalStyles.mb10}
            onPress={performLogin}>
            <Text>Login</Text>
            <Icon name="log-in" />
          </Button>
        </Form>
        <Form style={globalStyles.mb10}>
          <Button
            block
            info
            iconLeft
            style={globalStyles.mb10}
            onPress={() =>
              navigation.navigate('Terms', {title: 'Terms & Conditions'})
            }>
            <Text>Register</Text>
            <Icon name="person-add" />
          </Button>
        </Form>

        <Form style={styles.reset}>
          <Text>Forgot your PIN? </Text>
          <Text
            onPress={() =>
              navigation.navigate('PinRecover', {title: 'Recover Pin'})
            }
            style={{textDecorationLine: 'underline'}}>
            Reset PIN
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  reset: {
    flexDirection: 'row',
    marginVertical: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userState: state.userState,
    commonState: state.commonState,
  };
};

export default connect(mapStateToProps, {
  startLogin,
  setLoading,
})(Login);
