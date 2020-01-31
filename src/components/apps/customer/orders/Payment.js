import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import Dialog from "react-native-dialog";
// import React, { Component } from "react";


import {
    Container,
    Content,
    Form,
    Picker,
    Item,
    Button,
    // Text,
    Input,
    // View,
    Row,
    Col
} from 'native-base';
import {
    callAxios,
    handleError,
    getImages,
    setLoading,
} from '../../../../redux/actions/commonActions';
import { submitPayNow,submitMakePayment} from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import OrderQty from './OrderQty';
export const Payment = ({
    userState,
    commonState,
    navigation,
    submitPayNow,
    handleError,
    setLoading,
    submitMakePayment
}) => {
    //state info for forms
    const [order_no, setorder_no] = useState([undefined]);
    const [remitter_bank, setremitter_bank] = useState([undefined]);
    const [remitter_acc_no, setremitter_acc_no] = useState([undefined]);
    const [all_financial_inst, setall_financial_inst] = useState([]);

    const [showDialog, setshowDialog] = useState(false);
    const [otp, setOTP] = useState(false);

    //For proper navigation/auth settings
    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            setLoading(true);
            getFinancialInstList();
        }
    }, []);
    const getFinancialInstList = async () => {
        try {
            const params = {
                fields: JSON.stringify([
                    'name',
                    'bank_name',
                    'bank_code',
                ]),
                filters: JSON.stringify([
                    // ['user', '=', userState.login_id],
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

    const payNow = async () => {
        setshowDialog(true);
        setLoading(true);
        const paymentData = {
            'customer_order':navigation.getParam('orderNumber'),
            'bank_code': remitter_bank,
            'bank_account': remitter_acc_no,
            'amount': 1
        };
        submitPayNow(paymentData);
        setLoading(false);

    };

    const makePayment = async () => {
        setLoading(true);
        setshowDialog(false);
        const data = {
            'customer_order': "ORDR200100075",
            'otp': otp,
        };
        submitMakePayment(data);
        setLoading(false);

    };

    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyles.content}>
            <Form>
                <Item>
                    <Text style={globalStyles.label}>Your Order Number is :</Text>
                    <Input style={globalStyles.label} disabled value={JSON.stringify(navigation.getParam('orderNumber'))}
                        onChangeText={val => setorder_no(val)}
                    />
                </Item>

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
                        onChangeText={val => setremitter_acc_no(val)}
                        placeholder="Remitter Account No"
                    />
                </Item>
                <Text></Text>
                <Button success style={globalStyles.mb50} onPress={payNow}>
                    <Text>Pay Now</Text>
                </Button>

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
    submitPayNow,
    handleError,
    getImages,
    setLoading,
    submitMakePayment
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
