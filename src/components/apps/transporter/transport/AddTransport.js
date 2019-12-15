import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {View, Image} from 'react-native';

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
import {startTransportRegistration} from '../../../../redux/actions/transportActions';
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
  const [vehicle_owner, setvehicle_owner] = useState(undefined);
  const [crm_branch, setcrm_branch] = useState(undefined);
  const [vehicle_capacity, setVehicle_capacity] = useState(undefined);
  const [drivers_name, setdrivers_name] = useState(undefined);
  const [contact_no, setcontact_no] = useState(undefined);
  const [driver_cid, setdriver_cid] = useState(undefined);
  const [registration_document, setregistration_document] = useState([]);
  const [images, setImages] = useState([]);

  //all values
  const [all_capacities, setall_capacities] = useState([]);
  const [all_branches, setall_branches] = useState([]);

  //For proper navigation/auth settings
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      //get all capacities
      setLoading(true);
      getFormData();
    }
  }, []);

  useEffect(() => {
    setImages([]);
    setTimeout(() => {
      setImages(registration_document);
    }, 600);
  }, [registration_document]);

  const getFormData = async () => {
    try {
      const all_st = await callAxios('resource/Vehicle Capacity');
      setall_capacities(all_st.data.data);

      const params = {filters: JSON.stringify([['has_common_pool', '=', 1]])};
      const all_br = await callAxios(
        'resource/CRM Branch Setting',
        'GET',
        params,
      );
      setall_branches(all_br.data.data);

      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  //image picker
  const getBluebook = async () => {
    const images = await getImages('Bluebook');
    setregistration_document(images);
  };

  const submitVehicleInfo = async () => {
    const vehicle_info = {
      approval_status: 'Pending',
      user: userState.login_id,
      common_pool: 1,
      vehicle_no: vehicle_no.toUpperCase(),
      vehicle_capacity,
      vehicle_owner,
      drivers_name,
      contact_no,
      driver_cid,
      items: [
        {
          crm_branch,
        },
      ],
    };

    startTransportRegistration(vehicle_info, images);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Item regular style={globalStyles.mb10}>
            <Input
              value={vehicle_no}
              onChangeText={val => setVehicle_no(val)}
              placeholder="Vehicle No."
            />
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={vehicle_capacity}
              onValueChange={val => setVehicle_capacity(val)}>
              <Picker.Item
                label={'Select Vehicle Capacity'}
                value={undefined}
                key={-1}
              />
              {all_capacities &&
                all_capacities.map((pur, idx) => {
                  return (
                    <Picker.Item label={pur.name} value={pur.name} key={idx} />
                  );
                })}
            </Picker>
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Picker
              mode="dropdown"
              selectedValue={crm_branch}
              onValueChange={val => setcrm_branch(val)}>
              <Picker.Item label={'Select Branch'} value={undefined} key={-1} />
              {all_branches &&
                all_branches.map((pur, idx) => {
                  return (
                    <Picker.Item label={pur.name} value={pur.name} key={idx} />
                  );
                })}
            </Picker>
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Input
              value={drivers_name}
              onChangeText={val => setdrivers_name(val)}
              placeholder="Driver Name"
            />
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Input
              value={contact_no}
              onChangeText={val => setcontact_no(val)}
              placeholder="Driver's Contact No"
            />
          </Item>
          <Item regular style={globalStyles.mb10}>
            <Input
              value={driver_cid}
              onChangeText={val => setdriver_cid(val)}
              placeholder="Driver's CID"
            />
          </Item>

          <Button info style={globalStyles.mb10} onPress={getBluebook}>
            <Text>Attach Bluebook</Text>
          </Button>
          {images.length === 0 ? null : (
            <View style={{height: 300, width: '100%', marginBottom: 20}}>
              <Text style={{alignSelf: 'center', color: 'red'}}>
                Swipe to review all images
              </Text>
              <DeckSwiper
                dataSource={registration_document}
                renderItem={image => (
                  <Card style={{elevation: 3}}>
                    <CardItem cardBody>
                      <Image
                        source={{
                          uri: image.path,
                        }}
                        style={{height: 250, width: '100%'}}
                      />
                    </CardItem>
                    <CardItem>
                      <Icon name="heart" style={{color: '#ED4A6A'}} />
                      <Text>
                        {image.path.substring(image.path.lastIndexOf('/') + 1)}
                      </Text>
                    </CardItem>
                  </Card>
                )}
              />
            </View>
          )}
          <View style={{marginBottom: 20}}></View>

          <Button success style={globalStyles.mb50} onPress={submitVehicleInfo}>
            <Text>Submit for Approval</Text>
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
