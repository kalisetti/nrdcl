import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from "react-native-dialog";
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

  const [fullNameReqMsg, setFullNameReqMsg] = useState('');
  const [fullNameLenMsg, setFullNameLenMsg] = useState('');
  const [cidReqMsg, setCidReqMsg] = useState('');
  const [mobilePriReqMsg, setMobilePriReqMsg] = useState('');
  const [mobilePriLenMsg, setMobilePriLenMsg] = useState('');
  const [mobileAltLenMsg, setMobileAltLenMsg] = useState('');

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
    // //Mobile number primary BMobile and Tcell validation
    //  else if ((mobileno.substring(0, 2)!=='17')  {
    //   setMobilePriReqMsg('B mobile number starts from 17 or 16 and TCell number starts from 77');
    // }
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
        <Content style={globalStyles.content}>
          <Form>
            <Item regular style={globalStyles.mb10}>
              <Icon name="person" />
              <Input
                value={fullname}
                onChangeText={usr => { setFullname(usr), setFullNameReqMsg(''), setFullNameLenMsg('') }
                }
                placeholder="Full Name *"
              />
            </Item>

            <Item regular style={globalStyles.mb10}>
              <Icon name="lock" />
              <Input
                value={loginid}
                onChangeText={usr => { setLoginid(usr), setCidReqMsg('') }}
                placeholder="CID Number *"
                keyboardType={'numeric'}
              />
            </Item>

            <Item regular style={globalStyles.mb10}>
              <Icon name="call" />
              <Input
                value={mobileno}
                onChangeText={usr => {
                  setMobileno(usr), setMobilePriReqMsg('')
                    , setMobilePriLenMsg('')
                }}
                placeholder="Mobile No *"
                keyboardType={'numeric'}
              />
            </Item>

            <Item regular style={globalStyles.mb10}>
              <Icon name="call" />
              <Input
                value={alternate_mobile_no}
                onChangeText={usr => { setAlternate_mobile_no(usr), setMobileAltLenMsg('') }}
                placeholder="Alternate Mobile No"
                keyboardType={'numeric'}
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
              onPress={() => requestPIN()}
            >
              <Text>Get your PIN</Text>
              <Icon name="send" />
            </Button>

            <View>
              <Dialog.Container visible={showDialog}>
                <Dialog.Title>Please enter your PIN</Dialog.Title>
                <Dialog.Input placeholder='Please enter PIN'
                  wrapperStyle={globalStyles.dialogueInput}
                  onChangeText={usr => setPin(usr)}
                  secureTextEntry={true}
                  keyboardType={'numeric'}
                ></Dialog.Input>
                <Dialog.Button label="Cancel" color="red" onPress={() => setshowDialog(false)} />
                <Dialog.Button label="Sign Up" onPress={registerUser} />
              </Dialog.Container>
            </View>

            {/* <Item regular style={globalStyles.mb10}>
              <Icon name="key" />
              <Input
                value={pin}
                onChangeText={usr => setPin(usr)}
                placeholder="PIN"
              />
            </Item> */}

            {/* <Button
              block
              success
              iconLeft
              style={globalStyles.mb10}
              onPress={registerUser}>
              <Text>Sign Up</Text>
              <Icon name="book" />
            </Button> */}

            <Button
              block
              warning
              iconLeft
              style={globalStyles.mb10}
              onPress={() => navigation.navigate('Login')}>
              <Text>Back to Login</Text>
              <Icon name="arrow-round-back" />
            </Button>

            <Item>
              <Text style={globalStyles.italicFont}>All the fields in (*) are required</Text>
              <Input disabled />
            </Item>

            <View>
              <Text style={globalStyles.errorMsg}>
                {fullNameReqMsg}
                {fullNameLenMsg}
                {cidReqMsg}
                {mobilePriReqMsg}
                {mobilePriLenMsg}
                {mobileAltLenMsg}
              </Text>
            </View>

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

export default connect(mapStateToProps, { startPin, startRegister, showToast })(Signup);
