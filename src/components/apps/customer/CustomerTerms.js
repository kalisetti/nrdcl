import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Text,
  Button,
  Content,
  Icon,
  H2,
  Card,
  Body,
  CardItem,
} from 'native-base';
import { StyleSheet, AsyncStorage } from 'react-native';

export const CustomerTerms = ({ userState, navigation }) => {
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    }
  }, []);

  const customerTearmsAgreed = async () => {
    try {
      await AsyncStorage.setItem('customerTermsAgreed', 'yes');
    } catch (error) {
      // Error saving data
    }
    navigation.navigate('CustomerDashboard')
  };

  return (
    <Content>
      <Card>
        <CardItem header>
          <H2>Customer Terms & Conditions</H2>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              You represent and warrant that your use of our Services:{' '}
            </Text>
            <Text>
              Will be in strict accordance with these Terms; Will comply with
              all applicable laws and regulations (including, without
              limitation, all applicable laws regarding online conduct and
              acceptable content, privacy, data protection, and the transmission
              of technical data exported from the United States or the country
              in which you reside); Will not use the Services for any unlawful
              purposes, to publish
            </Text>
          </Body>
        </CardItem>
      </Card>

      <Container style={style.innerContainer}>
        <Button
          success
          //onPress={() => navigation.navigate('CustomerDashboard')}
          onPress={customerTearmsAgreed}
          >
          <Icon name="thumbs-up" />
          <Text>Agree</Text>
        </Button>
        <Button danger onPress={() => navigation.goBack()}>
          <Icon name="thumbs-down" />
          <Text>Decline</Text>
        </Button>
      </Container>
    </Content>
  );
};

/*Terms.navigationOptions = {
  title: 'Terms & Con',
}; */

const style = StyleSheet.create({
  container: {
    //flex: 1,
    marginVertical: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
});

const mapStateToProps = state => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(CustomerTerms);
