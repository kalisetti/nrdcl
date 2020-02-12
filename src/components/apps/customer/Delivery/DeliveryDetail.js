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
    Item,
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import globalStyle from '../../../../styles/globalStyle';
import {
    setLoading,
    callAxios,
    handleError,
} from '../../../../redux/actions/commonActions';
import { startVehicleDeregistration, confirmRecived } from '../../../../redux/actions/siteActions';
import Moment from 'moment';
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
                        <Text style={globalStyle.label}>Delivery Status</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <View>
                        <Text>Delivery Note No  : {deliver.delivery_note}</Text>
                        <Text>Status  : {deliver.confirmation_status}</Text>
                        <Text>Branch  : {deliver.branch} </Text>
                        <Text>Vehicle No : {deliver.vehicle}</Text>
                        <Text>Driver Name  : {deliver.drivers_name}</Text>
                        <Text>Driver Mobile No  : {deliver.contact_no}</Text>
                        <Text>Delivery Note Generated :  {Moment(deliver.exit_date_time).format('d MMM YYYY, hh:mma')}</Text>
                        <Text>Receive Time  : {deliver.received_date_time == undefined ? '' :
                            Moment(deliver.received_date_time).format('d MMM YYYY, hh:mma')}</Text>
                        <Text />
                        {deliver.confirmation_status === 'In Transit' ? (
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 16 }}>
                                Note* Please contact above driver for detail.</Text>) : (
                                <Text></Text>
                            )}
                    </View>
                </CardItem>
                {deliver.confirmation_status === 'In Transit' ? (
                    <Textarea
                        rowSpan={2}
                        width="100%"
                        bordered
                        placeholder="  Remarks"
                        value={remarks}
                        onChangeText={val => setremarks(val)}
                        style={globalStyle.mb10}
                    />
                ) : (
                        <Text></Text>
                    )}
                {deliver.confirmation_status === 'In Transit' ? (
                    <Text style={{ color: 'gray' }}>  Please click bellow button to acknowledge the receipt.</Text>
                ) : (
                        <Text></Text>
                    )}
                {deliver.confirmation_status === 'In Transit' ? (
                    <Button
                        block
                        success
                        iconLeft
                        style={globalStyle.mb10}
                        onPress={confirmDelivery}
                    >
                        <Text>Acknowledge Receipt</Text>
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
