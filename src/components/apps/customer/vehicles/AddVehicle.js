import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';

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
  showToast
} from '../../../../redux/actions/commonActions';
import { startVehicleRegistration } from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';

export const AddVehicle = ({
  userState,
  commonState,
  navigation,
  startVehicleRegistration,
  handleError,
  getImages,
  setLoading,
}) => {
  //state info for forms
  let [, setState] = useState();
  const [vehicle_no, setVehicle_no] = useState('');
  const [vehicle_owner, setvehicle_owner] = useState(undefined);
  const [vehicle_capacity, setVehicle_capacity] = useState(undefined);
  const [drivers_name, setdrivers_name] = useState('');
  const [contact_no, setcontact_no] = useState('');
  const [driver_cid, setdriver_cid] = useState('');
  const [registration_document, setregistration_document] = useState([]);
  const [images, setImages] = useState([]);

  const [marriage_certificate, setmarriage_certificate] = useState([]);
  const [mc, setMc] = useState([]);

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

  useEffect(() => {
    setMc([]);
    setTimeout(() => {
      setMc(marriage_certificate);
    }, 600);
  }, [marriage_certificate]);

  const getCapacities = async () => {
    try {
      const all_st = await callAxios('resource/Vehicle Capacity');
      setall_capacities(all_st.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  //image picker
  const getBluebook = async () => {
    const images = await getImages('Bluebook');
    setregistration_document(images);
  };

  const getMarriageCertificate = async () => {
    const images = await getImages('Marriage Certificate');
    setmarriage_certificate(images);
  };

  const removeBlueBook = () => {
    setregistration_document(images.filter((_, ind) => ind > 0));
  };

  const removeMc = () => {
    setmarriage_certificate(mc.filter((_, ind) => ind > 0));
  };

  const submitVehicleInfo = async () => {
    const site_info = {
      approval_status: 'Pending',
      user: userState.login_id,
      self_arranged: 1,
      vehicle_no: vehicle_no.toUpperCase(),
      vehicle_capacity,
      owner: vehicle_owner,
      owner_cid: vehicle_owner == 'Self' ? userState.login_id : driver_cid,
      drivers_name,
      contact_no
    };
    startVehicleRegistration(site_info, images, mc);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <NavigationEvents
          onWillFocus={_ => {
            setState({});
          }}
          onWillBlur={_ => {
            setState(undefined);
          }}
        />
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
                selectedValue={vehicle_owner}
                onValueChange={val => setvehicle_owner(val)}>
                <Picker.Item
                  label={'Select Vehicle Owner'}
                  value={undefined}
                  key={0}
                />
                <Picker.Item label={'Self'} value={'Self'} key={1} />
                <Picker.Item label={'Spouse'} value={'Spouse'} key={2} />
                {/* <Picker.Item label={'Others(Not applicable to Sha)'} value={'Other'} key={2} /> */}
              </Picker>
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
                keyboardType="numeric"
              />
            </Item>

            <Button block info style={globalStyles.mb10} onPress={getBluebook}>
              <Text>Attach Bluebook and Driving Licence</Text>
            </Button>
            {images.length === 0 ? null : (
              <View style={{ height: 300, width: '100%', marginBottom: 20 }}>
                <Text style={{ alignSelf: 'center', color: 'red' }}>
                  Swipe to review all images
              </Text>
                <DeckSwiper
                  dataSource={registration_document}
                  renderItem={image => (
                    <Card style={{ elevation: 3 }}>
                      <CardItem cardBody>
                        <Image
                          source={{
                            uri: image.path,
                          }}
                          style={{ height: 250, width: '100%' }}
                        />
                      </CardItem>
                      <CardItem>
                        <Button transparent small onPress={val => removeBlueBook(val)}>
                          <Icon name="delete" type="AntDesign" style={{ color: 'red' }} />
                        </Button>
                        <Text>
                          {image.path.substring(image.path.lastIndexOf('/') + 1)}
                        </Text>
                      </CardItem>
                    </Card>
                  )}
                />
              </View>
            )}
            <View style={{ marginBottom: 20 }}></View>

            {vehicle_owner === 'Spouse' ? (
              <Fragment>
                <Item regular style={globalStyles.mb10}>
                  <Input
                    value={driver_cid}
                    onChangeText={val => setdriver_cid(val)}
                    placeholder="Spouse CID Number"
                    keyboardType="numeric"
                  />
                </Item>

                <Button
                  block
                  info
                  style={globalStyles.mb10}
                  onPress={getMarriageCertificate}>
                  <Text>Attach Marriage Certificate</Text>
                </Button>
                {mc.length === 0 ? null : (
                  <View style={{ height: 300, width: '100%', marginBottom: 20 }}>
                    <Text style={{ alignSelf: 'center', color: 'red' }}>
                      Swipe to review all images
                  </Text>
                    <DeckSwiper
                      dataSource={marriage_certificate}
                      renderItem={image => (
                        <Card style={{ elevation: 3 }}>
                          <CardItem cardBody>
                            <Image
                              source={{
                                uri: image.path,
                              }}
                              style={{ height: 250, width: '100%' }}
                            />
                          </CardItem>
                          <CardItem>

                            <Button transparent small onPress={val => removeMc(val)}>
                              <Icon name="delete" type="AntDesign" style={{ color: 'red' }} />
                            </Button>
                            <Text>
                              {image.path.substring(
                                image.path.lastIndexOf('/') + 1,
                              )}
                            </Text>
                          </CardItem>
                        </Card>
                      )}
                    />
                  </View>
                )}
                <View style={{ marginBottom: 20 }}></View>
              </Fragment>
            ) : (
                <Fragment></Fragment>
              )}

            <Button success
              block
              style={globalStyles.mb10} onPress={submitVehicleInfo}>
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
  startVehicleRegistration,
  handleError,
  getImages,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicle);
