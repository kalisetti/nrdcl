import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  callAxios,
} from '../../../../redux/actions/commonActions';
import { submitApplyForQueue } from '../../../../redux/actions/siteActions';
import { submitCancelFromQueue } from '../../../../redux/actions/siteActions';
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

export const AddToQueue = ({
  userState,
  commonState,
  navigation,
  setLoading,
  submitApplyForQueue,
  submitCancelFromQueue
}) => {
  //state info for forms
  const [transporterVehicleList, setTransporterVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
      setLoading(true);
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

  const cancelFromQueue = async (vechicle_no) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to cancel vehicle ' + vechicle_no + ' from the queue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () => {
            submitCancelFromQueue(userState.login_id, vechicle_no);
            getTransporterVehicleList();
          }
        },
      ],
      { cancelable: false },
    );
  }

  const applyForQueue = async (vechicle_no) => {
    const queueDetail = {
      user: userState.login_id,
      vehicle: vechicle_no
    }
    Alert.alert(
      'Confirmation',
      'Are you sure you want to apply vehicle ' + vechicle_no + ' to the queue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () => {
            submitApplyForQueue(queueDetail);
            getTransporterVehicleList();
          }
        },
      ],
      { cancelable: false },
    );
  }

  const showCustomerDetail = async (location, customer_name, contact_mobile, delivery_note) => {
    Alert.alert(
      'Customer Detail',
      'Customer Name: ' + customer_name + '\nMobile No: ' + contact_mobile +
      '\nLocation: ' + location + '\nDN No: ' + delivery_note,
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false },
    );
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
                  <ListItem avatar style={{ flex: 1 }}>
                    <Left>
                      <Image
                        source={require('../../../../assets/images/construction-truck.jpg')}
                        style={{
                          alignSelf: 'center',
                          width: 40,
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
                        {vehicleDetail.vehicle_status === "Queued" && (
                          <Badge info warning>
                            <Text>{vehicleDetail.vehicle_status}</Text>
                          </Badge>)}
                        {vehicleDetail.vehicle_status === "In Transit" && (
                          <Badge info primary>
                            <Text>{vehicleDetail.vehicle_status}</Text>
                          </Badge>)}
                        {vehicleDetail.vehicle_status === "Available" && (
                          <Badge info success>
                            <Text>{vehicleDetail.vehicle_status}</Text>
                          </Badge>)}

                        {vehicleDetail.vehicle_status === "Queued" && (
                          <Row>
                            <Text style={{ color: 'green' }} >{'   '}Token</Text>
                            <Badge info>
                              <Text>{vehicleDetail.queue_count}</Text>
                            </Badge>
                          </Row>
                        )}
                      </Row>
                    </Body>
                    <Right>
                      {vehicleDetail.vehicle_status === "Available" && (
                        <Button iconLeft success small
                          onPress={() => applyForQueue(vehicleDetail.name)}>
                          <Text>Apply</Text>
                        </Button>)}
                      {vehicleDetail.vehicle_status === "Queued" && (
                        <Button iconLeft danger small
                          onPress={() => cancelFromQueue(vehicleDetail.name)}
                        >
                          <Text>Cancel</Text>
                        </Button>)}
                      {vehicleDetail.vehicle_status === "In Transit" && (
                        <Button iconLeft info small
                        >
                          <Text
                            onPress={() => showCustomerDetail( 
                              vehicleDetail.location,
                              vehicleDetail.customer_name,
                              vehicleDetail.contact_mobile,
                              vehicleDetail.delivery_note
                            )}>View</Text>
                        </Button>)}
                    </Right>
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
  submitApplyForQueue,
  submitCancelFromQueue
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
