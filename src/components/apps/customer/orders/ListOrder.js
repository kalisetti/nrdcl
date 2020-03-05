import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Text,
  Body,
  Card,
  CardItem,
  Right,
  Icon,
  View,
} from 'native-base';

import SpinnerScreen from '../../../base/SpinnerScreen';
import {
  callAxios,
  setLoading,
  handleError,
} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import { default as commaNumber } from 'comma-number';
import Moment from 'moment';
import UserInactivity from 'react-native-user-inactivity';
import Config from 'react-native-config';
import { startLogout } from '../../../../redux/actions/userActions';
import NavigationService from '../../../base/navigation/NavigationService';

export const ListOrder = ({
  userState,
  commonState,
  navigation,
  setLoading,
  handleError,
  startLogout
}) => {
  const [order, setOrders] = useState([]);
  const [reload, setReload] = useState(0);
  const [active, setActive] = useState(false);
  
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

  const renderItem = ({ item }) => {
    return (
      <Card>
        <CardItem
          header
          bordered
          button
          onPress={() => navigation.navigate('OrderDetail', { id: item.name })}
          style={globalStyles.tableHeader}>
          <Body>
            {item.docstatus === 0 ? (
              <Text style={{ color: 'red' }}>{item.name}</Text>
            ) : (
                <Text style={{ color: 'white' }}>{item.name}</Text>
              )}
          </Body>

          <Right>
            <Icon name="ios-arrow-dropright" style={globalStyles.icon} />
          </Right>
        </CardItem>
        <CardItem>
          <View>
            <Text>Site: {item.site} </Text>
            <Text>Item: {item.item_name} </Text>
            <Text>
              Invoice Amount: Nu.{commaNumber(item.total_payable_amount)}/-
            </Text>
            {item.total_balance_amount > 0 ? (
              <Text>
                Outstanding Amount: Nu.{commaNumber(item.total_balance_amount)}
                /-
              </Text>
            ) : (
                <Text style={{ color: 'blue' }}></Text>
              )}
            <Text>
              Ordered Date: {Moment(item.creation).format('d MMM YYYY, hh:mma')}
            </Text>
          </View>
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
        'creation',
        'total_balance_amount',
        'total_payable_amount',
      ]),
      filters: JSON.stringify([
        ['user', '=', userState.login_id],
        ['docstatus', '!=', 2],
      ]),
    };

    try {
      const response = await callAxios(
        `resource/Customer Order?fields=["name","docstatus", "site", "item_name", "creation", "total_balance_amount", "total_payable_amount"]&filters=[["user", "=", ${userState.login_id}],["docstatus", "!=", 2]]&order_by=creation desc`,
      );
      setOrders(response.data.data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const onAction = () => {
    setActive(true);
    if (!active) {
      startLogout();
      NavigationService.navigate('Login');
    }
  }


  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <UserInactivity
        timeForInactivity={parseFloat(Config.SESSION_TIME_OUT)}
        onAction={onAction}
      >
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
      </UserInactivity>
    );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  setLoading,
  handleError,
  startLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
