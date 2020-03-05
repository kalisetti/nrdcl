import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, TouchableHighlight, } from 'react-native';

import {
    Container,
    Content,
    Form,
    Text,
    CardItem
} from 'native-base';
import {
    setLoading,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


export const QueueStatus = ({
    userState,
    commonState,
    navigation,
    setLoading,
}) => {

    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const s = bootstrapStyleSheet.create();
    //For proper navigation/auth settings
    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            // setLoading(true);
            setLoading(false);
        }
    }, []);

    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (
            <Container>
                <Content style={globalStyles.content}>
                    <Form>
                        <View style={[s.card]}>
                            <CardItem>
                                <Text style={[s.h5, s.textSecondary]}>
                                    Vehicle No: BP-A-2020</Text>
                                <Text style={[s.h5, s.textSecondary]}>
                                    {'  '} Capacity: 10 M3</Text>
                            </CardItem>

                            <TouchableHighlight
                                style={{
                                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                                    width: Dimensions.get('window').width * 0.2,
                                    height: Dimensions.get('window').width * 0.2,
                                    backgroundColor: 'orange',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 140
                                }}
                                // onPress={() => alert('Hello')}
                                underlayColor='#ccc'>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>12</Text>
                            </TouchableHighlight>
                            <Text style={[s.text, s.textCenter, s.h5, s.textSecondary, s.myXs1, s.myMd3]}>
                                Truck(s) ahead of you
                            </Text>
                            <TouchableHighlight
                                style={{
                                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                                    width: Dimensions.get('window').width * 0.3,
                                    height: Dimensions.get('window').width * 0.3,
                                    backgroundColor: 'green',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 120
                                }}
                                underlayColor='#ccc'>
                                <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>11</Text>
                            </TouchableHighlight>
                            <Text style={[s.text, s.textCenter, s.h5, s.textSecondary, s.myXs1, s.myMd3]}>
                                Your position
                            </Text>

                            <TouchableHighlight
                                style={{
                                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                                    width: Dimensions.get('window').width * 0.2,
                                    height: Dimensions.get('window').width * 0.2,
                                    backgroundColor: 'orange',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 150
                                }}
                                underlayColor='#ccc'>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>10</Text>
                            </TouchableHighlight>
                            <Text style={[s.text, s.textCenter, s.h5, s.textSecondary, s.myXs1, s.myMd3]}>
                                Truck(s) behind you
                            </Text>
                        </View>
                        <Text style={[s.text, s.textCenter, s.h4, s.textSecondary, s.myXs1, s.myMd3]}>
                            Thank you for waiting
                            </Text>
                    </Form>
                </Content>
             </Container >
        );
};

const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.commonState,
});

const mapDispatchToProps = {
    setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueStatus);
