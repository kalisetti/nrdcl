import React from 'react';
import { Container, Content, Text, Body, Card, CardItem, View } from 'native-base';
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
                            <Text style={{ alignSelf: 'center' }}>Transaction successfully with </Text>
                            <Text style={{ alignSelf: 'center' }}>Transaction No: {navigation.state.params.transaction_id}</Text>
                            <Text style={{ alignSelf: 'center' }}>Amount: {navigation.state.params.amount} </Text>
                            <Text style={{ alignSelf: 'center' }}>Date: {navigation.state.params.transaction_time} </Text>
                            <Text style={{ alignSelf: 'center' }}>Thank you</Text>
                        </View>
                    </CardItem>
                </Card>
            </Content>

        </Container>
    );
};

export default SuccessMsg;
