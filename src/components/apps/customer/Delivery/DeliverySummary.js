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

export const DeliverySummary = ({
    userState,
    commonState,
    navigation,
    handleError,
    setLoading,
}) => {
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
                'qty',
                'customer_order',
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
                        <Col size={1.7} style={globalStyle.colContainer}>
                            <Text style={{fontSize:14}}>DN No.</Text>
                        </Col>
                        <Col size={2.1} style={globalStyle.colContainer}>
                            <Text style={{fontSize:14}}>Order No.</Text>
                        </Col>
                        <Col size={1} style={globalStyle.colContainer}>
                            <Text style={{fontSize:14}}>Qty(M3)</Text>
                        </Col>
                        <Col size={1.5} style={globalStyle.colContainer}>
                            <Text style={{fontSize:14}}>Status</Text>
                        </Col>
                    </Row>
                    {deliverList.map((deliver, idx) => (
                        <Row key={idx} style={globalStyle.rowContainer}>
                            <Col size={1.7} style={globalStyle.colContainer}>
                                <Text style={{fontSize:14}}>{deliver.delivery_note}</Text>
                            </Col>
                            <Col size={2.1} style={globalStyle.colContainer}>
                                <Text style={{fontSize:14}}>{deliver.customer_order}</Text>
                            </Col>
                            <Col size={1} style={globalStyle.colContainer}>
                                <Text style={{fontSize:14}}>{deliver.qty}</Text>
                            </Col>
                            <Col size={1.5} style={globalStyle.colContainer}>
                                <Text style={{fontSize:14}}>{deliver.confirmation_status}</Text>
                            </Col>
                        </Row>
                    ))}
                </Grid>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySummary);
