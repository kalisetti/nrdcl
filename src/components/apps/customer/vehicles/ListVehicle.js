import React, {useEffect, useState, Fragment} from 'react';
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

export const ListVehicle = ({
  userState,
  commonState,
  navigation,
  setLoading,
  handleError,
}) => {
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getActiveVehciles();
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <Card>
        <CardItem
          header
          bordered
          button
          onPress={() => navigation.navigate('VehicleDetail', {id: item.name})}
          style={globalStyles.tableHeader}>
          <Body>
            {item.vehilce_status === 'Blacklisted' ? (
              <Text style={{color: 'red'}}>{item.name}</Text>
            ) : (
              <Text style={{color: 'blue'}}>{item.name}</Text>
            )}
          </Body>

          <Right>
            <Icon name="ios-arrow-dropright" style={globalStyles.icon} />
          </Right>
        </CardItem>
        <CardItem>
          <H3>Driver: {item.drivers_name} </H3>
          <Text>({item.contact_no})</Text>
        </CardItem>
      </Card>
    );
  };

  const getActiveVehciles = async () => {
    const params = {
      fields: JSON.stringify([
        'name',
        'vehicle_status',
        'drivers_name',
        'contact_no',
      ]),
      filters: JSON.stringify([
        ['user', '=', userState.login_id],
        ['self_arranged', '=', 1],
        ['vehicle_status', '!=', 'Deregistered'],
      ]),
    };

    try {
      const response = await callAxios(
        'resource/Vehicle?order_by=creation%20desc,vehicle_status%20asc',
        'GET',
        params,
      );
      setVehicle(response.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container style={globalStyles.content}>
      {vehicle.length > 0 ? (
        <FlatList
          data={vehicle}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={globalStyles.emptyString}>No approved vehilces yet</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListVehicle);
