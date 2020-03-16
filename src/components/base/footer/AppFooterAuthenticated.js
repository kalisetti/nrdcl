import React from 'react';
import { Container, Text, Footer, FooterTab, Button, Icon } from 'native-base';
import Config from 'react-native-config';
import globalStyle from '../../../styles/globalStyle';
import NavigationService from '../navigation/NavigationService';
import { AsyncStorage } from 'react-native';

export default () => {
  const checkLocalStorageTransporter = async () => {
    try {
      const value = await AsyncStorage.getItem('transporterTermsAgreed');
      if (value == null) {
        NavigationService.navigate('TransporterTerms');
      } else {
        NavigationService.navigate('TransporterDashboard');
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  return (
    <Container style={globalStyle.bottom}>
      <Footer>
        <FooterTab style={{ backgroundColor: Config.APP_HEADER_COLOR }}>
          <Button
            vertical
            onPress={() => NavigationService.navigate('CustomerDashboard')}>
            <Icon name="ios-people" style={globalStyle.icon} />
            <Text style={globalStyle.iconText}>Customer</Text>
          </Button>
          <Button
            vertical
            onPress={checkLocalStorageTransporter}>
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
