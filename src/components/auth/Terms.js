import React, {useEffect} from 'react';
import {connect} from 'react-redux';
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
import {StyleSheet} from 'react-native';

export const Terms = ({userState, navigation}) => {
  useEffect(() => {
    if (userState.logged_in) {
      navigation.navigate('App');
    }
  }, []);

  return (
    <Content> 
        <CardItem>
          <Body> 
            <Text>
            By downloading, accessing or using this app, My Resources, 
            you agree to be bound by these Terms and Conditions of Use. 
            Your request for registration shall be accepted by NRDCL only 
            upon your confirmation and acceptance of the following Terms 
            and Conditions governing the usage and operations of My Resources: {'\n\n'}

            1. You can use My Resources to order sand from NRDCL for construction purpose.{'\n\n'}
            2. You agree to abide by the requirements of the company to submit the valid  
             required documents and information to avail such services. NRDCL shall not be 
             responsible for non-processing of registration or orders due to submission of 
             incomplete/incorrect documents or information.{'\n\n'}
            3. You are responsible for all orders or transactions carried out with 
            your log in credentials. You, therefore, agree not to reveal your user 
            credentials to any other person or entity through any medium. {'\n\n'} 
            4. You agree and confirm that you will not use My Resources for any 
            illegal/ unauthorized purpose or in any manner inconsistent with the 
            terms and conditions.{'\n\n'}
            5. You understand, agree and confirm that NRDCL does not guarantee the 
            successful completion of all your financial transactions through My 
            Resources. NRDCL is not responsible for the delay or failure of
            financial transactions by the Banks or non-availability of OTPs 
            from the Banks, because of which your orders may not be completed successfully.{'\n\n'}
            6. NRDCL reserves the right to add, change and/or alter these Terms and Conditions
             governing the use and operation of My Resources whenever deemed necessary.{'\n\n'}
            7. You can start using the My Resources only after you have clicked on the 
            ‘I Agree’ button. Please be aware that by clicking on the ‘I Agree’ button, 
            you are confirming to having read, understood and accepted all Terms 
            and Conditions given and you are also agreeing to be legally bound by
            them while remaining subscribed to My Resources.
            </Text>
          </Body>
        </CardItem> 

      <Container style={style.innerContainer}>
        <Button success onPress={() => navigation.navigate('Signup')}>
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
  commonState: state.commonState,
});

export default connect(mapStateToProps)(Terms);
