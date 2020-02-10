import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Text,
    Content,
    Card,
    CardItem,
    Body,
    View,
    Button,
    Textarea,
    Span
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import globalStyle from '../../../../styles/globalStyle';
import {
    setLoading,
    callAxios,
    handleError,
} from '../../../../redux/actions/commonActions';
import { startVehicleDeregistration, confirmRecived } from '../../../../redux/actions/siteActions';

export const OrderDetail = ({
    userState,
    commonState,
    navigation,
    handleError,
    setLoading,
    confirmRecived
}) => {
    const [remarks, setremarks] = useState(null);
    const [deliver, setDeliver] = useState({});
    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            setLoading(true);
            getDeliverDetails(navigation.state.params.id);
        }
    }, []);

    //Get all the delivery list under login user
    const getDeliverDetails = async id => {
        try {
            const response = await callAxios(`resource/Delivery Confirmation/${id}`);
            setDeliver(response.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };

    // Confirm delivery from customer.
    const confirmDelivery = async () => {
        const data = {
            delivery_note: deliver.delivery_note,
            user: userState.login_id,
            remarks
        };
        confirmRecived(data)
    };

    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyle.content}>
            <Card>
                <CardItem
                    header
                    bordered
                    style={globalStyle.tableHeader}>
                    <Body>
                        <Text style={globalStyle.label}>Please confirm us delivery</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <View>
                        <Text>Delivery Note  : {deliver.delivery_note}</Text>
                        <Text>Delivery Status  : {deliver.confirmation_status}</Text>
                        <Text>Branch  : {deliver.branch} </Text>
                        <Text>Vehicle No : {deliver.vehicle}</Text>
                        <Text>Driver Name  : {deliver.drivers_name}</Text>
                        <Text>Driver Contact  : {deliver.contact_no}</Text>
                        <Text>Exist Time  : {deliver.exit_date_time}</Text>
                        <Text>Recived Time  : {deliver.received_date_time}</Text>

                    </View>

                </CardItem>
                <Textarea
                    rowSpan={2}
                    width="100%"
                    bordered
                    placeholder="Please enter remakrs if any"
                    value={remarks}
                    onChangeText={val => setremarks(val)}
                    style={globalStyle.mb10}
                />

                {deliver.confirmation_status === 'In Transit' ? (
                    <Button
                        block
                        success
                        iconLeft
                        style={globalStyle.mb10}
                        onPress={confirmDelivery}
                    >
                        <Text>Recived</Text>
                    </Button>
                ) : (
                        <Text></Text>
                    )}


            </Card>
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
    setLoading,
    startVehicleDeregistration,
    confirmRecived
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
