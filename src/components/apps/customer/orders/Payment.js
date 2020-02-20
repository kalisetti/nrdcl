import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';
import Dialog from 'react-native-dialog';
import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Button,
  Text,
  Input,
  Icon,
  Card,
  CardItem,
  DeckSwiper,
  Fragment,
  Row,
  Col,
} from 'native-base';
import {
  callAxios,
  handleError,
  getImages,
  setLoading,
  showToast,
} from '../../../../redux/actions/commonActions';
import {
  submitMakePayment,
  submitCreditPayment,
} from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import {default as commaNumber} from 'comma-number';
export const Payment = ({
  userState,
  commonState,
  navigation,
  handleError,
  setLoading,
  submitMakePayment,
  submitCreditPayment,
  getImages,
  showToast,
}) => {
  //state info for forms
  const [order_no, setorder_no] = useState([undefined]);
  const [remitter_bank, setremitter_bank] = useState(undefined);
  const [remitter_acc_no, setremitter_acc_no] = useState(undefined);
  const [all_financial_inst, setall_financial_inst] = useState([]);
  const [showDialog, setshowDialog] = useState(false);
  const [otp, setOTP] = useState(undefined);
  const [creditAllowed, setCreditAllowed] = useState(undefined);
  const [modeOfPayment, setModeOfPayment] = useState(undefined);

  const [approvalDoc, setApprovalDoc] = useState([]);
  const [approvalDocmage, setApprovalDocmage] = useState([]);

  useEffect(() => {
    if (approvalDoc) {
      setApprovalDoc([]);
      setTimeout(() => {
        setApprovalDoc(approvalDocmage);
      }, 600);
    }
  }, [approvalDocmage]);

  //For proper navigation/auth settings
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getFinancialInstList();
      checkPaymentOption(navigation.getParam('site_type'));
    }
  }, []);

  //To get the approval document during pay later
  useEffect(() => {
    if (approvalDocmage) {
      setApprovalDoc([]);
      setTimeout(() => {
        setApprovalDoc(approvalDocmage);
      }, 600);
    }
  }, [approvalDocmage]);

  //Approval Document
  const getApprovalDoc = async () => {
    const image = await getImages('Front');
    setApprovalDocmage(image);
  };

  //Remove attachment
  const removeAttachment = () => {
    setApprovalDocmage(approvalDoc.filter((_, ind) => ind > 0));
  };

  //Check payment option based on site type for display pay later option
  const checkPaymentOption = async id => {
    try {
      const response = await callAxios(`resource/Site Type/${id}`);
      setCreditAllowed(response.data.data.credit_allowed);
      setModeOfPayment(response.data.data.mode_of_payment);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  //This methode is to get all the financial bank list for dropdown
  const getFinancialInstList = async () => {
    try {
      const params = {
        fields: JSON.stringify(['name', 'bank_name', 'bank_code']),
        filters: JSON.stringify([['bank_code', '!=', null]]),
      };
      const bankList = await callAxios(
        `resource/Financial Institution?fields=["name", "bank_name", "bank_code"]&filters=[["bank_code", "!=", null]]`,
        'get',
      );
      setall_financial_inst(bankList.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  //Confirming the remitter bank and account number with getting OTP SMS
  const paymentRequest = async () => {
    if (remitter_bank === undefined || remitter_bank === '') {
      showToast('Remitter bank is mandatory.', 'danger');
    } else if (remitter_acc_no === '' || remitter_acc_no === undefined) {
      showToast('Remitter account number is mandatory.', 'danger');
    } else {
      try {
        setLoading(true);
        const paymentData = {
          customer_order: navigation.getParam('orderNumber'),
          bank_code: remitter_bank,
          bank_account: remitter_acc_no,
          amount: navigation.getParam('totalPayableAmount'),
        };
        const res = await callAxios(
          'method/erpnext.crm_api.init_payment',
          'post',
          paymentData,
        );
        if (res && res.status === 200) {
          setshowDialog(true);
        }
        setLoading(false);
      } catch (error) {
        handleError(error);
      }
    }
  };
  //Crdite payment
  const paymentLater = async () => {
    if (approvalDoc.length < 1) {
      showToast('Approval document is mandatory.');
    } else {
      const creditPaymentInfo = {
        user: userState.login_id,
        customer_order: navigation.getParam('orderNumber'),
        mode_of_payment: modeOfPayment,
        paid_amount: navigation.getParam('totalPayableAmount'),
      };
      submitCreditPayment(creditPaymentInfo, approvalDocmage);
    }
  };
  //Payment confrimation
  const makePayment = async () => {
    setLoading(true);

    const data = {
      customer_order: navigation.getParam('orderNumber'),
      otp: otp,
    };
    const res = await submitMakePayment(data);
    if (res && res.status == 200) {
      navigation.navigate('SuccessMsg', {
        transaction_id: res.data.message.transaction_id,
        transaction_time: res.data.message.transaction_time,
        amount: res.data.message.amount,
      });
      setshowDialog(false);
      setLoading(false);
    }
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Row style={globalStyles.labelContainer}>
            <Col size={2}>
              <Text style={{textAlign: 'right'}}>Your Order Number is : </Text>
            </Col>
            <Col size={2}>
              <Text style={globalStyles.label}>
                {navigation.getParam('orderNumber')}
              </Text>
            </Col>
          </Row>
          <Row style={globalStyles.labelContainer}>
            <Col size={2}>
              <Text style={{textAlign: 'right'}}>Amount Payable : </Text>
            </Col>
            <Col size={2}>
              <Text style={globalStyles.label}>
                Nu.{commaNumber(navigation.getParam('totalPayableAmount'))}/-
              </Text>
            </Col>
          </Row>
          <View style={globalStyles.dropdown}>
            <Picker
              mode="dropdown"
              selectedValue={remitter_bank}
              onValueChange={val => setremitter_bank(val)}>
              <Picker.Item
                label={'Select Remitter Bank'}
                value={undefined}
                key={-1}
              />
              {all_financial_inst &&
                all_financial_inst.map((val, idx) => {
                  return (
                    <Picker.Item
                      label={val.bank_name}
                      value={val.bank_code}
                      key={idx}
                    />
                  );
                })}
            </Picker>
          </View>
          {remitter_bank && (
            <Item regular style={globalStyles.mb10}>
              <Input
                value={remitter_acc_no}
                keyboardType="number-pad"
                onChangeText={val => setremitter_acc_no(val)}
                placeholder="Remitter Account No"
              />
            </Item>
          )}
          {remitter_acc_no && (
            <Button
              block
              success
              iconLeft
              style={globalStyles.mb10}
              onPress={paymentRequest}>
              <Text>Pay Now</Text>
            </Button>
          )}
          {(creditAllowed == 1 &&
            navigation.getParam('approval_status') === '') ||
          (creditAllowed == 1 &&
            navigation.getParam('approval_status') === 'Rejected') ? (
            <Button
              block
              info
              style={globalStyles.mb10}
              onPress={getApprovalDoc}>
              <Text>Upload Approval Documents</Text>
            </Button>
          ) : (
            <Text></Text>
          )}

          {approvalDoc.length === 0 ? null : (
            <View style={{height: 300, width: '100%', marginBottom: 20}}>
              <Text style={{alignSelf: 'center', color: 'red'}}>
                Swipe to review all images
              </Text>
              <DeckSwiper
                dataSource={approvalDocmage}
                renderItem={image => (
                  <Card style={{elevation: 3}}>
                    <CardItem cardBody>
                      <Image
                        source={{
                          uri: image.path,
                        }}
                        style={{height: 250, width: '100%'}}
                      />
                    </CardItem>
                    <CardItem>
                      <Button
                        transparent
                        small
                        onPress={val => removeAttachment(val)}>
                        <Icon
                          name="delete"
                          type="AntDesign"
                          style={{color: 'red'}}
                        />
                      </Button>
                      <Text>
                        {image.path.substring(image.path.lastIndexOf('/') + 1)}
                      </Text>
                    </CardItem>
                  </Card>
                )}
              />
            </View>
          )}
          {(creditAllowed == 1 &&
            navigation.getParam('approval_status') === '') ||
          (creditAllowed == 1 &&
            navigation.getParam('approval_status') === 'Rejected') ? (
            <Button
              block
              success
              iconLeft
              style={globalStyles.mb10}
              onPress={paymentLater}>
              <Text>Pay Later</Text>
            </Button>
          ) : (
            <Text></Text>
          )}
          <View>
            <Dialog.Container visible={showDialog}>
              <Dialog.Title>Please enter your OTP</Dialog.Title>
              <Dialog.Input
                placeholder="Please enter your OTP"
                wrapperStyle={globalStyles.dialogueInput}
                onChangeText={val => setOTP(val)}
                keyboardType="number-pad"></Dialog.Input>
              <Dialog.Button
                label="Cancel"
                color="red"
                onPress={() => setshowDialog(false)}
              />
              <Dialog.Button label="Make Payment" onPress={makePayment} />
            </Dialog.Container>
          </View>
          <Text></Text>
        </Form>
      </Content>
    </Container>
  );
};
const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  handleError,
  getImages,
  setLoading,
  submitMakePayment,
  submitCreditPayment,
  showToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
