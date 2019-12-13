import React from 'react';
import {Linking} from 'react-native';
import Config from 'react-native-config';
import {Button, Icon} from 'native-base';
import globalStyle from '../../../styles/globalStyle';

const Call = () => {
  return (
    <Button transparent onPress={() => Linking.openURL(`tel:${Config.PHONE}`)}>
      <Icon name="call" style={globalStyle.icon} />
    </Button>
  );
};

export default Call;
