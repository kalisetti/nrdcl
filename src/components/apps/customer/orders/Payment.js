import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Dialog from "react-native-dialog";

import {
    Container,
    Content,
    Form,
    Picker,
    Item,
    Button,
    Text,
    Input,
} from 'native-base';
import {
    callAxios,
    handleError,
    getImages,
    setLoading,
} from '../../../../redux/actions/commonActions';
import {
    submitMakePayment, submitCreditPayment
} from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
export const Payment = ({
    userState,
    commonState,
    navigation,
    handleError,
    setLoading,
    submitMakePayment,
    submitCreditPayment
}) => {
    //state info for forms
    const [order_no, setorder_no] = useState([undefined]);
    const [remitter_bank, setremitter_bank] = useState([undefined]);
    const [remitter_acc_no, setremitter_acc_no] = useState([undefined]);
    const [all_financial_inst, setall_financial_inst] = useState([]);
    const [showDialog, setshowDialog] = useState(false);
    const [otp, setOTP] = useState(false);
    const [creditAllowed, setCreditAllowed] = useState([undefined]);
    const [modeOfPayment, setModeOfPayment] = useState([undefined]);

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
                fields: JSON.stringify([
                    'name',
                    'bank_name',
                    'bank_code',
                ]),
                filters: JSON.stringify([
                    ['bank_code', '!=', null],
                ]),
            };
            const bankList = await callAxios('resource/Financial Institution', 'get', params);
            setall_financial_inst(bankList.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };

    //Confirming the remitter bank and account number with getting OTP SMS
    const paymentRequest = async () => {
        try {
            setLoading(true);
            const paymentData = {
                'customer_order': navigation.getParam('orderNumber'),
                'bank_code': remitter_bank,
                'bank_account': remitter_acc_no,
                'amount': 1
            };
            const res = await callAxios('method/erpnext.crm_api.init_payment',
                'post',
                paymentData,
            );
            if (res.status == 200) {
                setLoading(false);
                setshowDialog(true);
            }
        } catch (error) {
            handleError(error);
        }
    };

    //Crdite payment 
    const paymentLater = async () => {
        const creditPaymentInfo = {
            user: userState.login_id,
            'customer_order': navigation.getParam('orderNumber'),
            'mode_of_payment': modeOfPayment,
            'paid_amount': navigation.getParam('totalPayableAmount'),
            'docstatus': 1,

        };
        submitCreditPayment(creditPaymentInfo);
    };

    //Payment confrimation
    const makePayment = async () => {
        setLoading(true);
        setshowDialog(false);
        const data = {
            'customer_order': navigation.getParam('orderNumber'),
            'otp': otp,
        };
        submitMakePayment(data);
    };

    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyles.content}>
            <Form>
                <Item>

                    <Text style={globalStyles.label}>Your Order Number is :</Text>
                    <Input style={globalStyles.label} disabled
                        value={JSON.stringify(navigation.getParam('orderNumber'))}
                        onChangeText={val => setorder_no(val)}
                    />
                </Item>
                <Text></Text>
                <Item regular style={globalStyles.mb10}>
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
                                    <Picker.Item label={val.bank_name} value={val.bank_code} key={idx} />
                                );
                            })}
                    </Picker>
                </Item>
                <Item regular style={globalStyles.mb10}>
                    <Input
                        keyboardType='number-pad'
                        onChangeText={val => setremitter_acc_no(val)}
                        placeholder="Remitter Account No"
                    />
                </Item>
                <Button
                    block
                    success
                    iconLeft
                    style={globalStyles.mb10}
                    onPress={paymentRequest}>
                    <Text>Pay Now</Text>
                </Button>
                {creditAllowed == 1 ? (
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
                        <Dialog.Input placeholder='Please enter your OTP'
                            wrapperStyle={globalStyles.dialogueInput}
                            onChangeText={val => setOTP(val)}
                        ></Dialog.Input>
                        <Dialog.Button label="Cancel" color="red" onPress={() => setshowDialog(false)} />
                        <Dialog.Button label="Make Payment" onPress={makePayment} />
                    </Dialog.Container>
                </View>
                <Text></Text>
            </Form>
        </Content>
    </Container >
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
    submitCreditPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
