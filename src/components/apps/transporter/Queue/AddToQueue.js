import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  callAxios,
} from '../../../../redux/actions/commonActions';

import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  Body,
  Right
} from 'native-base';
import {
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import SpinnerScreen from '../../../base/SpinnerScreen';

export const AddToQueue = ({
  userState,
  commonState,
  navigation,
  setLoading,
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
      console.log(res.data.message);
      setTransporterVehicleList(res.data.message);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };


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
                  <Text note>Capacity:{vehicleDetail.vehicle_capacity}- {vehicleDetail.vehicle_status}</Text>
                </Body>
                <Right>
                  <Button iconLeft success small >
                    <Icon name='navigate'/>
                    <Text>Apply Queue</Text>
                  </Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
