import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from "react-native-dialog";
import Config from 'react-native-config';
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
  View
} from 'native-base';

import globalStyles from '../../styles/globalStyle';
import { showToast } from '../../redux/actions/commonActions';

import { startPin, startRegister } from '../../redux/actions/userActions';
import { SafeAreaView, ScrollView } from 'react-native';
export const Signup = ({
  userState,
  commonState,
  navigation,
  startPin,
  startRegister,
  showToast
}) => {
  useEffect(() => {
    if (userState.logged_in) {
      navigation.navigate('App');
    }
  }, []);

  const [fullname, setFullname] = useState('');
  const [loginid, setLoginid] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [alternate_mobile_no, setAlternate_mobile_no] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showDialog, setshowDialog] = useState(false);
  const registerUser = () => {
    startRegister(fullname, loginid, mobileno, alternate_mobile_no, email, pin);
  };

  const requestPIN = async () => {
    // Full name mandatory validation
    if ((fullname.trim() == '') || (fullname == undefined)) {
      showToast('Full name is mandatory');
    }

    // Full name length validation
    else if (fullname.length < 3) {
      showToast('Full Name should have more than three characters');
    }

    // CID mandatory validation
    else if ((loginid.trim() == '') || (loginid == undefined)) {
      showToast('CID is mandatory');
    }

    //Mobile number primary mandatory validation
    else if ((mobileno.trim() == '') || (mobileno == undefined)) {
      showToast('Mobile number is mandatory');
    }

    // //Mobile number primary length validation
    else if ((mobileno.trim().length < 8) || (mobileno.trim().length > 8)) {
      showToast('Mobile number should have eight digits');
    }
    // Mobile number alternative length validation
    else if ((alternate_mobile_no.trim() !== '') && ((alternate_mobile_no.trim().length < 8)
      || (alternate_mobile_no.trim().length > 8))) {
      showToast('Alternate mobile number should have eight digits');
    }
    else {
      // const frontPageImage = await getImages('Front');
      const res = await startPin(fullname, loginid, mobileno, alternate_mobile_no);
      if (res.status == 200) {
        setshowDialog(true);
      };
    }
  };

  return commonState.isLoading ? (
    <Spinner />
  ) : (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Content style={globalStyles.content}>
              <Form>
                <Item regular style={globalStyles.mb10}>
                  <Icon name="person" />
                  <Input
                    value={fullname}
                    onChangeText={usr => { setFullname(usr) }
                    }
                    placeholder="Full Name *"
                    placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                  />
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Icon name="lock" />
                  <Input
                    value={loginid}
                    onChangeText={usr => { setLoginid(usr) }}
                    placeholder="CID Number *"
                    placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                    keyboardType={'numeric'}
                  />
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Icon name="call" />
                  <Input
                    value={mobileno}
                    onChangeText={usr => { setMobileno(usr) }}
                    placeholder="Mobile No *"
                    placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                    keyboardType={'numeric'}
                  />
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Icon name="call" />
                  <Input
                    value={alternate_mobile_no}
                    onChangeText={usr => { setAlternate_mobile_no(usr) }}
                    placeholder="Alternate Mobile No"
                    placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                    keyboardType={'numeric'}
                  />
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Icon name="mail" />
                  <Input
                    value={email}
                    onChangeText={usr => setEmail(usr)}
                    placeholder="Email"
                    placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                  />
                </Item>

                <Button
                  block
                  info
                  iconLeft
                  style={globalStyles.mb10}
                  onPress={() => requestPIN()}
                >
                  <Text>Get your PIN</Text>
                  <Icon name="send" />
                </Button>

                <View>
                  <Dialog.Container visible={showDialog}>
                    <Dialog.Title>Please enter your PIN</Dialog.Title>
                    <Dialog.Input
                      placeholder='Please enter PIN'
                      placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                      wrapperStyle={globalStyles.dialogueInput}
                      onChangeText={usr => setPin(usr)}
                      secureTextEntry={true}
                      keyboardType={'numeric'}
                    ></Dialog.Input>
                    <Dialog.Button label="Cancel" color="red" onPress={() => setshowDialog(false)} />
                    <Dialog.Button label="Sign Up" onPress={registerUser} />
                  </Dialog.Container>
                </View>

                <Button
                  block
                  warning
                  iconLeft
                  style={globalStyles.mb10}
                  onPress={() => navigation.navigate('Login')}>
                  <Text>Back to Login</Text>
                  <Icon name="arrow-round-back" />
                </Button>
                <Text style={globalStyles.italicFont}>All the fields in (*) are required</Text>
              </Form>
            </Content>
          </ScrollView>
        </SafeAreaView>
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

export default connect(mapStateToProps, { startPin, startRegister, showToast })(Signup);
