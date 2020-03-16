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


import { Alert, Image, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import {
  handleError,
  getImages,
  setLoading,
} from '../../../../redux/actions/commonActions';
import SpinnerScreen from '../../../base/SpinnerScreen';
import NavigationService from '../../../base/navigation/NavigationService';
import AwesomeAlert from 'react-native-awesome-alerts';

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
  const [refreshing, setRefreshing] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const _refresh = React.useCallback(() => {
    wait(20).then(() => setRefreshing(false));
    getTransporterVehicleList();
  }, [refreshing]);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

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
    const res = await submitApplyForQueue(queueDetail);

    if (res.status == 200) {
      Alert.alert(
        //title
        'My Resources',
        //body
        'Your vehicle has been successfully applied to the queue.',
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
        <SafeAreaView>
          <ScrollView contentContainerStyle={globalStyle.container}
            refreshControl={
              <RefreshControl colors={["#689F38", "#9Bd35A"]} refreshing={refreshing} onRefresh={_refresh} />
            }
          >
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
                        <Text>{vehicleDetail.name} ({vehicleDetail.vehicle_capacity} M3)</Text>
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

                    {showAlert && (
                      <View style={{ width: '100%', height: '100%' }}>
                        <AwesomeAlert
                          show={showAlert}
                          showProgress={false}
                          title="Confirmation"
                          message="Are you sure you want to apply?"
                          closeOnTouchOutside={true}
                          closeOnHardwareBackPress={false}
                          showCancelButton={true}
                          showConfirmButton={true}
                          cancelText="No, cancel"
                          confirmText="Yes, remove it"
                          confirmButtonColor="#DD6B55"
                          onCancelPressed={() => {
                            toggleAlert();
                          }}
                          onConfirmPressed={() => {
                            toggleAlert();
                            applyForQueue(vehicleDetail.name);
                          }}
                        />
                      </View>
                    )}
                  </ListItem>
                </List>
              ))}

            </Content>
          </ScrollView>
        </SafeAreaView>
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
