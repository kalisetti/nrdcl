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
    handleError,
    callAxios,
} from '../../../../redux/actions/commonActions';
import { startVehicleDeregistration } from '../../../../redux/actions/siteActions';

export const DeliverySummary = ({
    userState,
    commonState,
    navigation,
    handleError,
    setLoading,
}) => {
    const [order, setOrder] = useState({});
    const [deliverList, setDeliverList] = useState([]);

    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            setLoading(true);
            getDeliverySummary();
        }
    }, []);

    const getDeliverySummary = async () => {
        const params = {
            fields: JSON.stringify([
                'name',
                'docstatus',
                'delivery_note',
                'branch',
                'confirmation_status',
            ]),
            filters: JSON.stringify([
                ['user', '=', userState.login_id],
            ]),
        };
        try {
            const response = await callAxios(
                'resource/Delivery Confirmation?order_by=creation%20desc',
                'GET',
                params,
            );
            console.log(response.data.data)
            setDeliverList(response.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };
    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (<Container>
        <Content style={globalStyle.content}>
            <Row style={[globalStyle.tableContainer, globalStyle.mb50]}>
                <Grid>
                    <Row style={globalStyle.tableHeaderContainer}>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>DN No.</Text>
                        </Col>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Order No.</Text>
                        </Col>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Qty(Cubic Meter)</Text>
                        </Col>
                        <Col size={2} style={globalStyle.colContainer}>
                            <Text>Status</Text>
                        </Col>
                    </Row>
                    {deliverList.map((deliver, idx) => (
                        <Row key={idx} style={globalStyle.rowContainer}>
                            <Col size={2} style={globalStyle.colContainer}>
                                <Text>{deliver.delivery_note}</Text>
                            </Col>
                            <Col size={1.5} style={globalStyle.colContainer}>
                                <Text></Text>
                            </Col>
                            <Col size={1.5} style={globalStyle.colContainer}>
                                <Text></Text>
                            </Col>
                            <Col size={1.5} style={globalStyle.colContainer}>
                                <Text></Text>
                            </Col>
                        </Row>
                    ))}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySummary);
