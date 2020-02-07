import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Text,
    Grid,
    Row,
    Col,
    Content,
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import globalStyle from '../../../../styles/globalStyle';
import {
    setLoading,
    callAxios,
    handleError,
} from '../../../../redux/actions/commonActions';
import { startVehicleDeregistration } from '../../../../redux/actions/siteActions';
import { default as commaNumber } from 'comma-number';

export const OrderDetail = ({
    userState,
    commonState,
    navigation,
    handleError,
    setLoading,
}) => {
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

    const getDeliverDetails = async id => {
        try {
            const response = await callAxios(`resource/Delivery Confirmation/${id}`);
            setDeliver(response.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };
    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyle.content}>
            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Delivery Status :</Text>
                </Col>
                <Col size={3}>
                    <Text>{deliver.confirmation_status}</Text>
                </Col>
            </Row>
            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Branch :</Text>
                </Col>
                <Col size={3}>
                    <Text>{deliver.branch}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Vehicle No :</Text>
                </Col>
                <Col size={3}>
                    <Text>{deliver.vehicle}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Driver Name :</Text>
                </Col>
                <Col size={3}>
                    <Text>{deliver.drivers_name}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Driver Contact No :</Text>
                </Col>
                <Col size={3}>
                    <Text>{deliver.contact_no}</Text>
                </Col>
            </Row>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
