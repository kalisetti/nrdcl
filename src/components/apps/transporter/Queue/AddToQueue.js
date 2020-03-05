import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  callAxios,
} from '../../../../redux/actions/commonActions';
import { submitApplyForQueue } from '../../../../redux/actions/siteActions';


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
  Alert
} from 'native-base';
import {
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
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
    const res = await submitApplyForQueue(queueDetail)
    // Alert.alert(
    //   'Alert Title',
    //   'My Alert Msg',
    //   [
    //     { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false },
    // );
  };
  var BUTTONS = [
    { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
    { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
  ];


  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <Content>
          {transporterVehicleList.map((vehicleDetail, idx) => (
            <List>
              <ListItem avatar>
                <Body>
                  <Text>{vehicleDetail.name}</Text>
                  <Text note>Capacity:{vehicleDetail.vehicle_capacity}</Text>
                </Body>
                <Right>
                {vehicleDetail.vehicle_status === "Available"&&(
                  <Button iconLeft success small style={{width: 130}}
                    onPress={() => applyForQueue(vehicleDetail.name)}>
                    <Icon name='navigate' />
                    <Text>{vehicleDetail.vehicle_status}</Text>
                  </Button>)}

                  {vehicleDetail.vehicle_status === "Queued"&&(
                  <Button iconLeft warning small style={{width: 130}}
                    onPress={() => NavigationService.navigate('QueueStatus')}>
                    <Icon name='eye'/>
                    <Text>{vehicleDetail.vehicle_status}</Text>
                  </Button>)}
                  {vehicleDetail.vehicle_status === "Intransit"&&(
                  <Button iconLeft success small style={{width: 130}}
                    onPress={() => applyForQueue(vehicleDetail.name)}>
                    <Icon name='navigate'/>
                    <Text>{vehicleDetail.vehicle_status}</Text>
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
