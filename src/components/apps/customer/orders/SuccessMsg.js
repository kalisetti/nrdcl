import React from 'react';
import { Container, Content, Text, Body, Card, CardItem, View, Button, Icon } from 'native-base';
import globalStyle from '../../../../styles/globalStyle';

export const SuccessMsg = ({
    navigation,
}) => {
    return (
        <Container style={{ paddingTop: 70 }}>
            <Content padder>
                <Card>
                    <CardItem
                        header
                        bordered
                        style={globalStyle.tableHeader}>
                        <Body>
                            <Text style={{ color: 'white', alignSelf: 'center' }}>Response</Text>
                        </Body>
                    </CardItem>
                    <CardItem style={{ alignSelf: 'center' }}>
                        <View >
                            <Text style={{ alignSelf: 'center' }}>Transaction successfull with </Text>
                            <Text style={{ alignSelf: 'center' }}>payment of Nu:{(navigation.state.params.amount).toFixed(2)} </Text>
                            <Text style={{ alignSelf: 'center' }}>Tran Ref No:{navigation.state.params.transaction_id}</Text>
                            <Text style={{ alignSelf: 'center' }}>Date: {navigation.state.params.transaction_time} </Text>
                            <Text style={{ alignSelf: 'center' }}>Thank you</Text>
                        </View>
                    </CardItem>
                </Card>
                <View style={{ marginTop: 15 }}>
                    <Button
                        block
                        warning
                        iconLeft
                        style={globalStyle.mb10}
                        onPress={() => navigation.navigate('OrderDashboard')}>
                        <Icon name="arrow-round-back" />
                        <Text>Go Back</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
};

export default SuccessMsg;
