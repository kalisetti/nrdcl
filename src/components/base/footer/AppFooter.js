import React from 'react';
import { Container, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import Config from 'react-native-config';

import NavigationService from '../navigation/NavigationService';
import globalStyle from '../../../styles/globalStyle';

export default () => {
  return (
    <Container style={globalStyle.bottom}>
      <Footer>
        <FooterTab style={{ backgroundColor: Config.APP_HEADER_COLOR }}>
          <Button vertical onPress={() => NavigationService.navigate('Login')}>
            <Icon name="home" style={globalStyle.icon} />
            <Text style={globalStyle.iconTextFooter}>Home</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('About')}>
            <Icon name="list" style={globalStyle.icon} />
            <Text style={globalStyle.iconTextFooter}>About</Text>
          </Button>
          {/* <Button vertical onPress={() => NavigationService.navigate('Help')}>
            <Icon name="information-circle-outline" style={globalStyle.icon} />
            <Text style={globalStyle.iconTextFooter}>Help</Text>
          </Button> */}
          <Button vertical onPress={() => NavigationService.navigate('ContactUs')}>
            <Icon name="call" style={globalStyle.icon} />
            <Text style={globalStyle.iconTextFooter}>Contact Us</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate('Faq')}>
          <Icon name="help-circle-outline" style={globalStyle.icon} /> 
            <Text style={globalStyle.iconTextFooter}>FAQ</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
