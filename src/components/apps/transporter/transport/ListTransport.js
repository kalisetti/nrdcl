import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Text,
  Body,
  Card,
  CardItem,
  Right,
  Icon,
  H3,
} from 'native-base';

import SpinnerScreen from '../../../base/SpinnerScreen';
import {
  callAxios,
  setLoading,
  handleError,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import {FlatList} from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';

export const ListTransport = ({
  userState,
  commonState,
  navigation,
  setLoading,
  handleError,
}) => {
  const [vehicle, setVehicle] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getActiveVehciles();
    }
  }, [reload]);

  const renderItem = ({item}) => {
    return (
      <Card>
        <CardItem
          header
          bordered
          button
          onPress={() => {
            navigation.navigate('TransportDetail', {id: item.name});
          }}
          style={globalStyles.tableHeader}>
          <Body>
            {item.approval_status === 'Pending' ? (
              <Text style={{color: 'red'}}>{item.vehicle_no}</Text>
            ) : (
              <Text style={{color: 'white'}}>{item.vehicle_no}</Text>
            )}
          </Body>

          <Right>
            <Icon name="ios-arrow-dropright" style={globalStyles.icon} />
          </Right>
        </CardItem>
        <CardItem>
          <Text>Vehicle Capacity: {item.vehicle_capacity} m3</Text>
        </CardItem>
        <CardItem>
          <Text> Status: {item.approval_status}</Text>
        </CardItem>
      </Card>
    );
  };

  const getActiveVehciles = async () => {
    const params = {
      fields: JSON.stringify([
        'name',
        'vehicle_capacity',
        'vehicle_no',
        'drivers_name',
        'contact_no',
        'approval_status',
      ]),
      filters: JSON.stringify([
        ['user', '=', userState.login_id],
        ['common_pool', '=', 1],
        ['approval_status', '!=', 'Deregistered'],
      ]),
    };

    try {
      const response = await callAxios(
        `resource/Transport Request?order_by=creation desc,approval_status asc&fields=["name", "vehicle_capacity","vehicle_no","drivers_name","contact_no","approval_status"]&filters=[["user","=",${userState.login_id}], ["common_pool", "=", 1],["approval_status", "!=", "Deregistered"]]`,
      );
      setVehicle(response.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container style={globalStyles.listContent}>
      <NavigationEvents
        onWillFocus={_ => {
          setReload(1);
        }}
        onWillBlur={_ => {
          setReload(0);
        }}
      />
      {vehicle.length > 0 ? (
        <FlatList
          data={vehicle}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={globalStyles.emptyString}>
          No common pool transports yet under your name.
        </Text>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  setLoading,
  handleError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTransport);
