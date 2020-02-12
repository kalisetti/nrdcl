import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Text,
    Body,
    Card,
    CardItem,
    Right,
    Icon,
    View,
    Button

} from 'native-base';

import SpinnerScreen from '../../../base/SpinnerScreen';
import {
    callAxios,
    setLoading,
    handleError,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { default as commaNumber } from 'comma-number';

export const DeliveryList = ({
    userState,
    commonState,
    navigation,
    setLoading,
    handleError,
}) => {
    const [deliveryList, setDeliverList] = useState([]);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            setLoading(true);
            getDeliveryList();
        }
    }, [reload]);

    const renderItem = ({ item }) => {
        return (
            <Card>
                <CardItem
                    header
                    bordered
                    button
                    onPress={() => navigation.navigate('DeliveryDetail', { id: item.name })}
                    style={globalStyles.tableHeader}>
                    <Body>
                        {item.docstatus === 0 ? (
                            <Text style={{ color: 'red' }}>{item.delivery_note}</Text>
                        ) : (
                                <Text style={globalStyles.label}>{item.delivery_note}</Text>
                            )}
                    </Body>

                    <Right>
                        <Icon name="ios-arrow-dropright" style={globalStyles.icon} />
                    </Right>
                </CardItem>
                <CardItem>
                    <View>
                        <Text>Delivery Status: {item.confirmation_status} </Text>
                        <Text>Branch: {item.branch} </Text>
                    </View>
                </CardItem>
            </Card>
        );
    };

    const getDeliveryList = async () => {
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
                // ['docstatus', '!=', 2],
            ]),
        };
        try {
            const response = await callAxios(
                'resource/Delivery Confirmation?order_by=creation%20desc',
                'GET',
                params,
            );
            console.log(response)
            setDeliverList(response.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };


    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (
            <Container style={globalStyles.listContent}>
                <Button
                    block
                    success
                    iconLeft
                    style={globalStyles.mb10}
                    onPress={() => navigation.navigate('DeliverySummary')}>
                    <Text>Delivery Summary</Text>
                </Button>
                <NavigationEvents
                    onWillFocus={_ => {
                        setReload(1);
                    }}
                    onWillBlur={_ => {
                        setReload(0);
                    }}
                />
                {deliveryList.length > 0 ? (
                    <FlatList
                        data={deliveryList}
                        renderItem={renderItem}
                        keyExtractor={item => item.name}
                    />
                ) : (
                        <Text style={globalStyles.emptyString}>Currently no delivery in transit for your order.</Text>
                    )}
            </Container>
        );
};

const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.commonState,
});

const mapDispatchToProps = {
    setLoading,
    handleError,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryList);
