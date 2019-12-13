import React from 'react';
import {Button, Icon} from 'native-base';
import NavigationService from '../navigation/NavigationService';

class CustombackButton extends React.Component {
  render() {
    return (
      <Button transparent onPress={() => NavigationService.navigate('Login')}>
        <Icon name="arrow-round-back" />
      </Button>
    );
  }
}

export default CustombackButton;
