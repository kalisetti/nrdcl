import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Image, Dimensions, TouchableHighlight, } from 'react-native';

import {
    Container,
    Input,
    Content,
    Form,
    Picker,
    Item,
    Button,
    Text,
    Card,
    CardItem,
    Icon,
    DeckSwiper,
    Modal
} from 'native-base';
import {
    callAxios,
    handleError,
    getImages,
    setLoading,
} from '../../../../redux/actions/commonActions';
import { startTransportRegistration } from '../../../../redux/actions/transportActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';


export const QueueStatus = ({
    userState,
    commonState,
    navigation,
    startTransportRegistration,
    handleError,
    getImages,
    setLoading,
}) => {

    const bootstrapStyleSheet = new BootstrapStyleSheet();
    const s = bootstrapStyleSheet.create();
    // const c = constants = bootstrapStyleSheet.constants;

    //state info for forms
    const [vehicle_no, setVehicle_no] = useState('');
    const [vehicle_capacity, setVehicle_capacity] = useState(undefined);
    const [drivers_name, setdrivers_name] = useState(undefined);
    const [contact_no, setcontact_no] = useState(undefined);
    const [registration_document, setregistration_document] = useState([]);
    const [images, setImages] = useState([]);

    //all values
    const [all_capacities, setall_capacities] = useState([]);

    //For proper navigation/auth settings
    useEffect(() => {
        if (!userState.logged_in) {
            navigation.navigate('Auth');
        } else if (!userState.profile_verified) {
            navigation.navigate('UserDetail');
        } else {
            //get all capacities
            setLoading(true);
            getCapacities();
        }
    }, []);

    useEffect(() => {
        setImages([]);
        setTimeout(() => {
            setImages(registration_document);
        }, 600);
    }, [registration_document]);

    //image picker
    const getBluebook = async () => {
        const bluebooks = await getImages('Bluebook');
        setregistration_document(bluebooks);
    };

    const removeImage = () => {
        setregistration_document(images.filter((_, ind) => ind > 0));
    };

    const getCapacities = async () => {
        try {
            const all_st = await callAxios('resource/Vehicle Capacity');
            setall_capacities(all_st.data.data);
            setLoading(false);
        } catch (error) {
            handleError(error);
        }
    };
    const submitVehicleInfo = async () => {
        const vehicle_info = {
            approval_status: 'Pending',
            user: userState.login_id,
            common_pool: 1,
            vehicle_no: vehicle_no.toUpperCase(),
            vehicle_capacity,
            drivers_name,
            contact_no,
            owner_cid: userState.login_id,
        };
        startTransportRegistration(vehicle_info, registration_document);
    };

    return commonState.isLoading ? (
        <SpinnerScreen />
    ) : (
            <Container>
                <Content style={globalStyles.content}>
                    <Form>
                        <View style={[s.card]}>
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
                                onPress={() => alert('Hello')}
                                underlayColor='#ccc'>
                                <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>10</Text>
                            </TouchableHighlight>
                            <Text style={[s.text, s.textCenter, s.h4, s.textSecondary, s.myXs1, s.myMd3]}>
                                Truck ahead of you
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
                            <Text style={[s.text, s.textCenter, s.h4, s.textSecondary, s.myXs1, s.myMd3]}>
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
                            <Text style={[s.text, s.textCenter, s.h4, s.textSecondary, s.myXs1, s.myMd3]}>
                                Truck behind you
                            </Text>
                        </View>

                        <Text style={[s.text, s.textCenter, s.h3, s.textSecondary, s.myXs1, s.myMd3]}>
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
    startTransportRegistration,
    handleError,
    getImages,
    setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueStatus);
