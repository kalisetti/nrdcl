import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  callAxios,
} from '../../../../redux/actions/commonActions';
import { submitApplyForQueue } from '../../../../redux/actions/siteActions';
import globalStyle from '../../../../styles/globalStyle';


import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  Body,
  Right,
  Left,
  Thumbnail,
  Badge,
  Row
} from 'native-base';


import { Alert, Image } from 'react-native'
import {
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import SpinnerScreen from '../../../base/SpinnerScreen';
import NavigationService from '../../../base/navigation/NavigationService';

export const AddToQueue = ({
  userState,
  commonState,
  navigation,
  setLoading,
  submitApplyForQueue
}) => {
  //state info for forms
  const [vehicleDetail, setVehicleDetail] = useState(undefined);
  const [transporterVehicleList, setTransporterVehicleList] = useState([]);


  //For proper navigation/auth settings
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      getTransporterVehicleList();
    }
  }, []);

  const getTransporterVehicleList = async () => {
    let params = {
      "user": userState.login_id
    };
    try {
      const res = await callAxios('method/erpnext.crm_utils.get_vehicle_list',
        'get',
        params
      );
      console.log(res.data.message)
      setTransporterVehicleList(res.data.message);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const applyForQueue = async (vechicle_no) => {
    const queueDetail = {
      user: userState.login_id,
      vehicle: vechicle_no
    }
    const res = await submitApplyForQueue(queueDetail);
    if (res.status == 200) {
      Alert.alert(
        //title
        'My Resources',
        //body
        'Your vehicle has been successfully apply to queue.',
        [
          { text: 'OK', onPress: () => getTransporterVehicleList() },
        ],
        { cancelable: false }
      );
    }
  }



  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <Content>

          {transporterVehicleList.map((vehicleDetail, idx) => (
            <List>
              <ListItem avatar>
                <Left>
                  <Image
                    source={require('../../../../assets/images/construction-truck.jpg')}
                    style={{
                      alignSelf: 'center',
                      width: 50,
                      height: 30,
                      marginBottom: 20,
                    }}
                  />
                </Left>
                <Body>
                  <Row>
                    <Text>{vehicleDetail.name}({vehicleDetail.vehicle_capacity} M3)</Text>
                  </Row>
                  <Row>
                    <Text note>Status:</Text>
                    {vehicleDetail.vehicle_status === "Queued" && (
                      <Badge info warning>
                        <Text>{vehicleDetail.vehicle_status}</Text>
                      </Badge>)}
                    {vehicleDetail.vehicle_status === "In Transit" && (
                      <Badge info warning>
                        <Text>{vehicleDetail.vehicle_status}</Text>
                      </Badge>)}
                    {vehicleDetail.vehicle_status === "Available" && (
                      <Badge info success>
                        <Text>{vehicleDetail.vehicle_status}</Text>
                      </Badge>)}
                    {vehicleDetail.vehicle_status === "Queued" && (
                      <Row>
                        <Text></Text>
                        <Text note>Your position</Text>
                        <Badge info>
                          <Text>2</Text>
                        </Badge>
                      </Row>
                    )}
                  </Row>

                </Body>
                <Right>
                  {vehicleDetail.vehicle_status === "Available" && (
                    <Button iconLeft success small
                      onPress={() => applyForQueue(vehicleDetail.name)}>
                      <Icon name='navigate' />
                      <Text>Apply</Text>
                    </Button>)}
                </Right>
              </ListItem>
            </List>
          ))}
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
  getImages,
  setLoading,
  submitApplyForQueue
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
