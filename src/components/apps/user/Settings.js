import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { View, Image } from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Content,
  Picker,
  Icon,
  Label,
  DeckSwiper,
  Card,
  CardItem,
} from 'native-base';
import SpinnerScreen from '../../base/SpinnerScreen';
import { handleError, setLoading, callAxios, startSubmitBillingAddress } from '../../../redux/actions/commonActions';
import globalStyles from '../../../styles/globalStyle';

export const Setting = ({
  userState,
  commonState,
  startSubmitBillingAddress
}) => {
  //state info for forms
  // const [first_name, setfirst_name] = useState(undefined);

  // const [user, setUser] = useState('');
  const [user, setUser] = useState({ data: [] });


  const [all_dzongkhag, setall_dzongkhag] = useState([]);

  const [first_name, setfirst_name] = useState(undefined);
  const [last_name, setlast_name] = useState(undefined);
  const [cid, setcid] = useState(undefined);
  const [mobile_no, setmobile_no] = useState(undefined);
  const [email_id, setemail_id] = useState(undefined);
  const [date_of_issue, setdate_of_issue] = useState(undefined);
  const [date_of_expiry, setdate_of_expiry] = useState(undefined);
  const [billing_address_line1, setbilling_address_line1] = useState(undefined);
  const [billing_address_line2, setbilling_address_line2] = useState(undefined);
  const [billing_dzongkhag, setbilling_dzongkhag] = useState(undefined);
  const [billing_gewog, setbilling_gewog] = useState(undefined);
  const [perm_address_line1, setperm_address_line1] = useState(undefined);
  const [perm_address_line2, setperm_address_line2] = useState(undefined);
  const [perm_dzongkhag, setperm_dzongkhag] = useState(undefined);
  const [perm_gewog, setperm_gewog] = useState(undefined);
  const [Bank, setBank] = useState(undefined);
  const [account_number, setaccount_number] = useState(undefined);

  // setdzongkhag(user.billing_dzongkhag)

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getFormData();
      getUserDetails(userState.login_id);
    }

  }, []);


  const getUserDetails = async id => {
    try {
      const response = await callAxios(`resource/User Account/${id}`);
      setUser(response.data.data);

      setfirst_name(response.data.data.first_name);
      setlast_name(response.data.data.last_name);
      setcid(response.data.data.cid);
      setmobile_no(response.data.data.mobile_no);
      setemail_id(response.data.data.email_id);
      setdate_of_issue(response.data.data.date_of_issue);
      setdate_of_expiry(response.data.data.date_of_expiry);
      setbilling_address_line1(response.data.data.billing_address_line1);
      setbilling_address_line2(response.data.data.billing_address_line2);
      setbilling_dzongkhag(response.data.data.billing_dzongkhag);
      setbilling_gewog(response.data.data.billing_gewog);
      setperm_address_line1(response.data.data.perm_address_line1);
      setperm_address_line2(response.data.data.perm_address_line2);
      setperm_dzongkhag(response.data.data.perm_dzongkhag);
      setperm_gewog(response.data.data.perm_gewog);
      setBank(response.data.data.Bank);
      setaccount_number(response.data.data.account_number);

      setLoading(false);
    } catch (error) {
      handleError(error);
    }



  };
  const getFormData = async () => {
    try {
      setLoading(true);
      const dz_all = await callAxios('resource/Dzongkhags', 'get');
      setall_dzongkhag(dz_all.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };



  const submitBillingAddress = () => {
    const billingAddressChangeRequestData = {
      approval_status: 'Pending',
      user: userState.login_id,
      request_type: "Change Request",
      request_category: "Address Details",
      new_address_type: "Billing Address",
      new_address_line1: billing_address_line1,
      new_address_line2: billing_address_line1,
      new_dzongkhag: billing_dzongkhag,
      new_gewog: billing_gewog
    }
    startSubmitBillingAddress(billingAddressChangeRequestData);
  }

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <Content style={globalStyles.content}>
          <Form >

            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>General Information</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>First Name:</Label>
                <Input editable={false}
                  value={first_name}
                  onChangeText={val => setfirst_name(val)}
                />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Last Name:</Label>
                <Input disabled value={last_name} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>CID:</Label>
                <Input disabled value={cid} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Mobile No:</Label>
                <Input disabled value={mobile_no} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Email ID:</Label>
                <Input disabled value={email_id} />
              </Item>

              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Date of Issue:</Label>
                <Input disabled value={date_of_issue} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Date of Expeiry:</Label>
                <Input disabled value={date_of_expiry} />
              </Item>
            </View>


            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Billing Address</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 1:</Label>
                <Input
                  value={billing_address_line1}
                  onValueChange={val => setbilling_address_line1(val)}
                />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 2:</Label>
                <Input value={billing_address_line2} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Dzongkhag:</Label>
                <Picker
                  mode="dropdown"
                  selectedValue={billing_dzongkhag}
                  onValueChange={val => setbilling_dzongkhag(val)}>
                  <Picker.Item
                    label={'Select Dzongkhag'}
                    value={undefined}
                    key={-1}
                  />
                  {all_dzongkhag &&
                    all_dzongkhag.map((val, idx) => {
                      return (
                        <Picker.Item label={val.name} value={val.name} key={idx} />
                      );
                    })}
                </Picker>
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Gewog:</Label>
                <Input value={billing_gewog} />
              </Item>
              <Button success onPress={submitBillingAddress} style={globalStyles.mb50} >
                <Text>Submit Billing Address</Text>
              </Button>
            </View>

            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Permanent Address</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 1:</Label>
                <Input value={perm_address_line1} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 2:</Label>
                <Input value={perm_address_line2} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Dzongkhag:</Label>
                <Input value={perm_dzongkhag} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Gewog:</Label>
                <Input value={perm_gewog} />
              </Item>

              <Button success style={globalStyles.mb50} >
                <Text>Submit Permanent Address</Text>
              </Button>
            </View>

            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Bank Information</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Bank</Label>
                <Input value={Bank} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Account Number</Label>
                <Input value={account_number} />
              </Item>
              <Button success
                // onPress={saveUserDetail}
                style={globalStyles.mb50} >
                <Text>Submit Bank Address</Text>
              </Button>
            </View>


          </Form>
        </Content>
      </Container>
    );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = { handleError, startSubmitBillingAddress };

export default connect(mapStateToProps, mapDispatchToProps)(Setting);


