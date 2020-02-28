import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';

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

export const AddTransport = ({
  userState,
  commonState,
  navigation,
  startTransportRegistration,
  handleError,
  getImages,
  setLoading,
}) => {
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
            <Button block success style={globalStyles.mb10}>
              <Text>Apply for Approval</Text>
            </Button>
          </Form>
        </Content>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTransport);
