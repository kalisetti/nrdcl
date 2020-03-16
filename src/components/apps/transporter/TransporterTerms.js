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

export const TransporterTerms = ({ userState, navigation }) => {
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    }
  }, []);

  const transporterTearmsAgreed = async () => {
    try {
      await AsyncStorage.setItem('transporterTermsAgreed', 'yes');
    } catch (error) {
      // Error saving data
    }
    navigation.navigate('TransporterDashboard');
  };

  return (
    <Content>
      {/* <Card> */}
        <CardItem header>
          <H2>Terms and Conditions for registering as Transporter under NRDCL Common Pool Transportation Service</H2>
        </CardItem>
        <CardItem>
          <Body> 
            <Text>
            I would like to register my truck(s) as Transporter with NRDCL under the Common Pool 
            Transportation Service.  I have read and understood; and agree to be legally bound by 
            the following terms and conditions governing a registered transporter:{'\n\n'}

            1. I understand that I shall have to provide required valid documents and correct 
            information for registration of my vehicle with NRDCL.{'\n\n'}

            2. I agree to transport sand for NRDCL customers at the transportation rate fixed by NRDCL. 
            I understand that these transportation rates may be revised by NRDCL from time to time.{'\n\n'}

            3. I agree to be paid the transportation charge through NRDCL, after deducting 
            administrative overhead of 1% from my transportation amount. The transportation
             cost will be paid to me based on proof of delivery/acknowledgement of receipt 
             by customer.{'\n\n'}

            4. I agree to transport sand to any location that I am being deputed to.{'\n\n'}

            5. I understand that NRDCL will depute transporters to deliver sand to customers 
            in a sequential order, and when my turn comes, I will be informed. {'\n\n'}

            6. I understand that if I do not depute my vehicle for three consecutive turns 
            without prior information to the concerned NRDCL office, my vehicle will be 
            de-registered and dis-allowed from further transportation.{'\n\n'}

            7. In the event of break-down of my vehicle(s) or inability to make my 
            vehicle(s) available for sand transportation, I agree to inform the concerned 
            NRDCL office in advance.{'\n\n'}

            8. I agree to provide (and understand that it is my responsibility to provide) 
            my valid account number held in any bank within Bhutan to NRDCL to process my 
            transportation charge. I shall not hold NRDCL responsible for any delay or 
            non-processing of payment due to incorrect account number provided. {'\n\n'}

            9. I agree to receiving online payment of the transportation cost to my valid 
            account held in any bank within Bhutan or any other mode of payment whatsoever 
            is decided by NRDCL. {'\n\n'}

            10. I understand that there could be delays in processing online payment on 
            account of issues with the designated bank(s) over which NRDCL has no control.{'\n\n'}

            11. I shall not deflect sand while in transit to customers’ sites or sell to any 
            other party. I understand that if found doing so, the matter will be dealt with 
            as per the provision of the Forest and Nature Conservation Rules and Regulations 
            of Bhutan, 2017 and I shall be imposed with penalty.{'\n\n'}

            12. I agree to deliver sand to customer site on time and ensure that the unloading 
            at site shall be done before 9:00 PM.{'\n\n'}

            13. I understand that NRDCL shall not be held responsible for carrying overload or
             any mishap that may occur during journey, and that I shall be responsible for 
             bearing any loss(es) that may arise from such an incident.{'\n\n'}

            14. I understand that it is my responsibility to insure my registered vehicle(s).{'\n\n'}

            15. I understand that the registration may be terminated depending on need by NRDCL
             for which a general notice shall be provided.{'\n\n'}

            16. I understand that I may also withdraw from the registration after providing 15 
            days prior notice.{'\n\n'}

            </Text>
          </Body>
        </CardItem>
      {/* </Card> */}
 
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

export default connect(mapStateToProps)(TransporterTerms);
