import React, { useState } from 'react';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Container,
  CardItem,
  Form,
  Item,
  Button,
  Text,
  Content,
  Textarea,
} from 'native-base';
import SpinnerScreen from '../../base/SpinnerScreen';
import {
  handleError,
  submitFeedback,
} from '../../../redux/actions/userActions';
import globalStyles from '../../../styles/globalStyle';

export const Feedback = ({
  userState,
  commonState,
  submitFeedback,
}) => {
  const [feedback, setFeedback] = useState(undefined);

  const btnSubmit = () => {
    const feedbackInfo = {
      user: userState.login_id,
      feedback
    }
    submitFeedback(feedbackInfo);
  }

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Content>
              <CardItem>
                <Form style={{ width: '100%' }}>
                  <Item regular style={{ marginBottom: 15 }} >
                    <Textarea
                      autoFocus={true}
                      value={feedback}
                      onChangeText={val => setFeedback(val)}
                      placeholder="Write Your Feeback Here"
                      placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                      style={{ height: 150, justifyContent: "flex-start" }}
                    />
                  </Item>
                  <Button
                    success
                    block
                    style={globalStyles.mb10}
                    onPress={btnSubmit}>
                    <Text>Submit</Text>
                  </Button>
                </Form>
              </CardItem>
            </Content>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = { handleError, submitFeedback, };

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);


