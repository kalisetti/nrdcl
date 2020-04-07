import React from 'react';
import {
  Container, Text, Footer, FooterTab, Button, Icon,
  Form,
  Item,
  Input,
  Content,
  Spinner,
  View,
  Row,
  Col
} from 'native-base';
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
          <Row>
          <Col style={{ justifyContent: 'space-evenly' }}>
              <Button
                vertical
                onPress={() => NavigationService.navigate('ModeSelector')}>
                <Icon name="home" style={globalStyle.icon} />
                <Text style={globalStyle.iconText}>Home</Text>
              </Button>
            </Col>
            {/* <Col style={{ justifyContent: 'space-evenly' }}>
              <Button
                vertical
                onPress={() => NavigationService.navigate('CustomerDashboard')}>
                <Icon name="ios-people" style={globalStyle.icon} />
                <Text style={globalStyle.iconText}>Home</Text>
              </Button>
            </Col>
            <Col style={{ justifyContent: 'space-evenly' }}>
              <Button
                vertical
                onPress={checkLocalStorageTransporter}>
                <Icon
                  name="dump-truck"
                  type="MaterialCommunityIcons"
                  style={globalStyle.icon}
                />
                <Text style={globalStyle.iconTextFooter}>Transporter</Text>
              </Button>
            </Col> */}
            <Col style={{ justifyContent: 'space-evenly' }}>
              <Button vertical onPress={() => NavigationService.navigate('Faq')}>
                <Icon name="help-circle-outline" style={globalStyle.icon} />
                <Text style={globalStyle.iconTextFooter}>FAQ</Text>
              </Button>
            </Col>
            <Col style={{ justifyContent: 'space-evenly' }}>
              <Button
                vertical
                onPress={() => NavigationService.navigate('Feedback')}>
                <Icon name="feedback" type="MaterialIcons" style={globalStyle.icon} />
                <Text style={globalStyle.iconTextFooter}>Feedback</Text>
              </Button>
            </Col>
            <Col style={{ justifyContent: 'space-evenly' }}>
              <Button
                vertical
                onPress={() => NavigationService.navigate('Settings')}>
                <Icon name="settings" type="Octicons" style={globalStyle.icon} />
                <Text style={globalStyle.iconTextFooter}>Settings</Text>
              </Button>
            </Col>
          </Row>
        </FooterTab>
      </Footer>
    </Container>
  );
};
