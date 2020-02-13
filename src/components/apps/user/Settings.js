import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Content,
  Picker,
  Label
} from 'native-base';
import SpinnerScreen from '../../base/SpinnerScreen';
import {
  handleError,
  setLoading,
  callAxios,
  startSubmitBillingAddress,
  startSubmitPerAddress,
  startSubmitBankAddress
} from '../../../redux/actions/commonActions';
import globalStyles from '../../../styles/globalStyle';

export const Setting = ({
  userState,
  commonState,
  startSubmitBillingAddress,
  startSubmitPerAddress,
  startSubmitBankAddress
}) => {
  //state info for forms
  // const [first_name, setfirst_name] = useState(undefined);

  // const [user, setUser] = useState('');
  const [user, setUser] = useState({ data: [] });
  const [all_dzongkhag, setall_dzongkhag] = useState([]);
  const [all_gewog, setall_gewog] = useState([]);
  const [billing_address_line1, setbilling_address_line1] = useState(undefined);
  const [billing_address_line2, setbilling_address_line2] = useState(undefined);
  const [billing_dzongkhag, setbilling_dzongkhag] = useState(undefined);
  const [billing_gewog, setbilling_gewog] = useState(undefined);


  // setdzongkhag(user.billing_dzongkhag)

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      getFormData();
      setLoading(true);
      getUserDetails(userState.login_id);
    }

  }, []);


  const getUserDetails = async id => {
    try {
      const response = await callAxios(`resource/User Account/${id}`);
      setUser(response.data.data);
      setbilling_address_line1(response.data.data.billing_address_line1);
      setbilling_address_line2(response.data.data.billing_address_line2);
      setbilling_dzongkhag(response.data.data.billing_dzongkhag);
      setbilling_gewog(response.data.data.billing_gewog);
     
      setLoading(false);
    } catch (error) {
      handleError(error);
    }

  };
  const getFormData = async () => {
    setLoading(true);
    try {
      const dz_all = await callAxios('resource/Dzongkhags', 'get');
      setall_dzongkhag(dz_all.data.data);
      const gewog_all = await callAxios('resource/Gewogs', 'get');
      setall_gewog(gewog_all.data.data);
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
                <Label>User Name:</Label>
                <Input editable={false}
                  value={user.first_name}
                />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>CID:</Label>
                <Input disabled value={user.cid} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Mobile No:</Label>
                <Input disabled value={user.mobile_no} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Alternative Mobile No:</Label>
                <Input disabled value={user.alternate_mobile_no} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Email ID:</Label>
                <Input disabled value={user.email_id} />
              </Item>
            </View>


            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Present Address</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 1:</Label>
                <Input
                  value={billing_address_line1}
                  onChangeText={
                    val => setbilling_address_line1(val)
                  }
                />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 2:</Label>
                <Input value={billing_address_line2}
                  onChangeText={
                    val => setbilling_address_line2(val)
                  }
                />
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
                <Picker
                  mode="dropdown"
                  selectedValue={billing_gewog}
                  onValueChange={val => setbilling_gewog(val)}>
                  <Picker.Item
                    label={'Select Gewog'}
                    value={undefined}
                    key={-1}
                  />
                  {all_gewog &&
                    all_gewog.map((val, idx) => {
                      return (
                        <Picker.Item label={val.name} value={val.name} key={idx} />
                      );
                    })}
                </Picker>
              </Item>
              <Button success onPress={submitBillingAddress} style={globalStyles.mb50} >
                <Text>Submit Billing Address</Text>
              </Button>
            </View>

            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Permanent Address</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 1:</Label>
                <Input disabled value={user.perm_address_line1} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Address line 2:</Label>
                <Input disabled value={user.perm_address_line2} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Dzongkhag:</Label>
                <Picker disabled
                  mode="dropdown"
                  selectedValue={user.perm_dzongkhag}>
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
                <Picker disabled
                  mode="dropdown"
                  selectedValue={user.perm_gewog}>
                  <Picker.Item
                    label={'Select Gewog'}
                    value={undefined}
                    key={-1}
                  />
                  {all_gewog &&
                    all_gewog.map((val, idx) => {
                      return (
                        <Picker.Item label={val.name} value={val.name} key={idx} />
                      );
                    })}
                </Picker>
              </Item>
            </View>

            <View style={globalStyles.fieldSet}>
              <Text style={globalStyles.legend}>Bank Information</Text>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Bank</Label>
                <Input disabled value={user.financial_institution} />
              </Item>
              <Item regular inlineLabel style={globalStyles.mb10}>
                <Label>Account Number</Label>
                <Input disabled value={user.account_number} />
              </Item>
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

const mapDispatchToProps = { handleError, startSubmitBillingAddress, startSubmitPerAddress, startSubmitBankAddress };

export default connect(mapStateToProps, mapDispatchToProps)(Setting);


