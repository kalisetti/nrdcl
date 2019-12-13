import React from 'react';
import {Container, Text, Footer, FooterTab, Button, Icon} from 'native-base';
import Config from 'react-native-config';

import NavigationService from '../navigation/NavigationService';
import globalStyle from '../../../styles/globalStyle';

export default () => {
  return (
    <Container style={globalStyle.bottom}>
      <Footer>
        <FooterTab style={{backgroundColor: Config.APP_HEADER_COLOR}}>
          <Button vertical onPress={() => NavigationService.navigate('Login')}>
            <Icon name="home" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Home</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('About')}>
            <Icon name="apps" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>About</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('Help')}>
            <Icon name="information-circle-outline" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Help</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('Waha')}>
            <Icon name="pin" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Waha</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('Some')}>
            <Icon name="paw" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Some</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
