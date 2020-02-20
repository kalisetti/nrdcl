import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import Dialog from "react-native-dialog";
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
  View
} from 'native-base';

import { startLogin, startResetPin } from '../../redux/actions/userActions';
import { setLoading, showToast } from '../../redux/actions/commonActions';
import globalStyles from '../../styles/globalStyle';
import Logo from '../base/header/Logo';

const Login = ({
  navigation,
  userState,
  commonState,
  setLoading,
  startLogin,
  startResetPin,
  showToast
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reload, setReload] = useState(0);

  //Reset Pin attributes
  const [showDialog, setshowDialog] = useState(false);
  const [loginid, setLoginid] = useState('');
  const [mobileno, setMobileno] = useState('');

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
    } catch (error) { }
  };

  const performLogin = () => {
    setLoading(true);
    startLogin(username, password);
  };


  //Reset PIN function
  const showRequestPINDialog = async () => {
    setshowDialog(true);
  }

  const requestPin = async () => {
    setLoading(true);
    const res = await startResetPin(loginid, mobileno);
    if (res.status == 200) {
      showToast(`New PIN sent to ${mobileno}`, 'success');
      setshowDialog(false)
    }
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


          <Form style={styles.reset}>
            <Text>Forgot your PIN? </Text>
            <Text
              onPress={() => showRequestPINDialog()}
              style={{ textDecorationLine: 'underline', color: '#1E90FF' }}>
              Reset PIN
          </Text>
          </Form>
          <Form style={globalStyles.mb10}>
            <Button
              block
              info
              iconLeft
              style={globalStyles.mb10}
              onPress={() =>
                navigation.navigate('Terms', { title: 'Terms & Conditions' })
              }>
              <Text>Register</Text>
              <Icon name="person-add" />
            </Button>
          </Form>
          <View>
            <Dialog.Container visible={showDialog}>
              <Dialog.Title>Reset PIN</Dialog.Title>
              <Dialog.Input placeholder='CID Number'
                wrapperStyle={globalStyles.dialogueInput}
                onChangeText={cid => setLoginid(cid)}
                keyboardType={'number-pad'}
              ></Dialog.Input>
              <Dialog.Input placeholder='Mobile Number'
                wrapperStyle={globalStyles.dialogueInput}
                onChangeText={mobile_no => setMobileno(mobile_no)}
                keyboardType={'number-pad'}
              ></Dialog.Input>
              <Dialog.Button label="Cancel" color="red" onPress={() => setshowDialog(false)} />
              <Dialog.Button label="Send my new PIN" onPress={requestPin} />
            </Dialog.Container>
          </View>
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
  startResetPin,
  showToast
})(Login);
