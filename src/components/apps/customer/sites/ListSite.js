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

export const ListSite = ({
  userState,
  commonState,
  navigation,
  setLoading,
  handleError,
}) => {
  const [sites, setsites] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getActiveSites();
    }
  }, [reload]);

  const renderItem = ({item}) => {
    return (
      <Card>
        <CardItem
          header
          bordered
          button
          onPress={() => navigation.navigate('SiteDetail', {id: item.name})}
          style={globalStyles.tableHeader}>
          <Body>
            {item.enabled ? (
              <Text style={{color: 'blue'}}>{item.name}</Text>
            ) : (
              <Text style={{color: 'red'}}>{item.name}</Text>
            )}
          </Body>

          <Right>
            <Icon name="ios-arrow-dropright" style={globalStyles.icon} />
          </Right>
        </CardItem>
        <CardItem>
          <Text>Type of Construction: {item.construction_type}</Text>
        </CardItem>
        <CardItem>
          <Text>Specific Location:{item.location}</Text>
        </CardItem>
      </Card>
    );
  };

  const getActiveSites = async () => {
    const params = {
      fields: JSON.stringify([
        'name',
        'location',
        'construction_type',
        'enabled',
      ]),
      filters: JSON.stringify([['user', '=', userState.login_id]]),
    };

    try {
      const response = await callAxios(
        'resource/Site?order_by=enabled%20desc,creation%20desc',
        'GET',
        params,
      );
      setsites(response.data.data);
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
      {sites.length > 0 ? (
        <FlatList
          data={sites}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={globalStyles.emptyString}>No approved sites yet</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSite);
