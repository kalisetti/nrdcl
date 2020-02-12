import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Text,
    Grid,
    Row,
    Col,
    Content,
    Button
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
    const [order, setOrder] = useState({});

    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            setLoading(true);
            getOrderDetails(navigation.state.params.id);
        }
    }, []);

    const getOrderDetails = async id => {
        try {
            const response = await callAxios(`resource/Customer Order/${id}`);
            setOrder(response.data.data);
            console.log(response.data.data)
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };
    const proceedPayment = async () => {
        navigation.navigate('Payment',
            {
                orderNumber: navigation.state.params.id,
                site_type: order.site_type,
                totalPayableAmount: order.total_balance_amount,
                docstatus: order.approval_status
            })
    };
    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyle.content}>
            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Order Number :</Text>
                </Col>
                <Col size={3}>
                    <Text>{navigation.state.params.id}</Text>
                </Col>
            </Row>
            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Site :</Text>
                </Col>
                <Col size={3}>
                    <Text>{order.site}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Item :</Text>
                </Col>
                <Col size={3}>
                    <Text>{order.item_name}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Branch :</Text>
                </Col>
                <Col size={3}>
                    <Text>{order.branch}</Text>
                </Col>
            </Row>

            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Transport Mode :</Text>
                </Col>
                <Col size={3}>
                    <Text>{order.transport_mode}</Text>
                </Col>
            </Row>


            <Row style={[globalStyle.labelContainer]}>
                <Text style={globalStyle.label}>Invoice Details</Text>
            </Row>
            <Row style={globalStyle.labelContainer}>
                <Col size={2}>
                    <Text style={globalStyle.label}>Total Order Qty:</Text>
                </Col>
                <Col size={3}>
                    <Text>{order.total_quantity} M3</Text>
                </Col>
            </Row>
            <Row style={[globalStyle.tableContainer, globalStyle.mb50]}>
                <Grid>
                    <Row style={globalStyle.tableHeaderContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Particulars</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text>Amount(Nu)</Text>
                        </Col>
                    </Row>
                    <Row style={globalStyle.rowContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Total Item Amount</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text style={{ textAlign: 'right' }}>{commaNumber(order.total_item_rate)}</Text>
                        </Col>
                    </Row>
                    <Row style={globalStyle.rowContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Total Transportation Amount</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text style={{ textAlign: 'right' }}>{commaNumber(order.total_transportation_rate)}</Text>
                        </Col>
                    </Row>
                    <Row style={globalStyle.rowContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Total Payable Amount</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{commaNumber(order.total_payable_amount)}</Text>
                        </Col>
                    </Row>
                    <Row style={globalStyle.rowContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Total Balace Amount</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{commaNumber(order.total_balance_amount)}</Text>
                        </Col>
                    </Row>
                </Grid>
            </Row>

            {order.total_balance_amount > 0 ? (
                <Button
                    block
                    success
                    iconLeft
                    style={globalStyle.mb10}
                    onPress={proceedPayment}>
                    <Text>Proceed for Payment</Text>
                </Button>
            ) : (
                    <Text></Text>
                )}

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
