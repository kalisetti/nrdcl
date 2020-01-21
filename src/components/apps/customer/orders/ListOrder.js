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

export const ListOrder = ({
  userState,
  commonState,
  navigation,
  setLoading,
  handleError,
}) => {
  const [order, setOrders] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getAllOrders();
    }
  }, [reload]);

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
            {item.docstatus === 0 ? (
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
          <H3>Site: {item.site} </H3>
          <H3>Item: {item.item_name} </H3>
          {item.total_balance_amount > 0 ? (
            <H3>Payable: {item.total_balance_amount} </H3>
          ) : (
            <Text style={{color: 'blue'}}></Text>
          )}
        </CardItem>
      </Card>
    );
  };

  const getAllOrders = async () => {
    const params = {
      fields: JSON.stringify([
        'name',
        'docstatus',
        'site',
        'item_name',
        'total_balance_amount',
      ]),
      filters: JSON.stringify([
        ['user', '=', userState.login_id],
        ['docstatus', '!=', 2],
      ]),
    };

    try {
      const response = await callAxios(
        'resource/Customer Order?order_by=creation%20desc',
        'GET',
        params,
      );
      setOrders(response.data.data);
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
      {order.length > 0 ? (
        <FlatList
          data={order}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={globalStyles.emptyString}>Place your first order</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
