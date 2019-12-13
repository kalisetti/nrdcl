import React from 'react';
import {Container, Text, Footer, FooterTab, Button, Icon} from 'native-base';
import Config from 'react-native-config';
import globalStyle from '../../../styles/globalStyle';
import NavigationService from '../navigation/NavigationService';

export default () => {
  return (
    <Container style={globalStyle.bottom}>
      <Footer>
        <FooterTab style={{backgroundColor: Config.APP_HEADER_COLOR}}>
          <Button
            vertical
            onPress={() => NavigationService.navigate('CustomerDashboard')}>
            <Icon name="ios-people" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Customer</Text>
          </Button>
          <Button
            vertical
            onPress={() => NavigationService.navigate('TransporterDashboard')}>
            <Icon
              name="dump-truck"
              type="MaterialCommunityIcons"
              style={globalStyle.icon}
            />
            <Text style={globalStyle.iconText}>Transporter</Text>
          </Button>
          <Button
            vertical
            onPress={() => NavigationService.navigate('Settings')}>
            <Icon name="settings" type="Octicons" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
