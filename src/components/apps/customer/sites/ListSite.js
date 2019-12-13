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
import {callAxios, setLoading} from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
import {FlatList} from 'react-native-gesture-handler';

export const ListSite = ({userState, commonState, navigation, setLoading}) => {
  const [sites, setsites] = useState([]);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      getActiveSites();
      setLoading(true);
    }
  }, []);

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
          <H3>{item.purpose}</H3>
        </CardItem>
        <CardItem>
          <Text>{item.location}</Text>
        </CardItem>
      </Card>
    );
  };

  const getActiveSites = async () => {
    const params = {
      fields: JSON.stringify(['name', 'location', 'purpose', 'enabled']),
      filters: JSON.stringify([['user', '=', userState.login_id]]),
    };

    try {
      const response = await callAxios(
        'resource/Site?order_by=creation%20desc,enabled%20asc',
        'GET',
        params,
      );
      setsites(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('Active Sites', error);
      setLoading(false);
    }
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container style={globalStyles.content}>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSite);
