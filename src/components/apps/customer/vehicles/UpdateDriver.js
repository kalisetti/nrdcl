import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Content,
  Icon,
  Label,
  Textarea,
  Row, Col
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import { startUpdateDriverDetailSelf } from '../../../../redux/actions/siteActions';
import { handleError, setLoading } from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';


export const UpdateDriver = ({
  userState,
  commonState,
  navigation,
  startUpdateDriverDetailSelf,
  setLoading,
}) => {
  const [vehicle, setvehicle] = useState(undefined);
  const [driver_name, setdriver_name] = useState(undefined);
  const [driver_contact_no, setdriver_contact_no] = useState(undefined);
  const [remarks, setremarks] = useState('');

  /**
   * run once when the component is updated
   */
  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setLoading(true);
      setdriver_contact_no(navigation.state.params.driver_mobile_no);
      setvehicle(navigation.state.params.id);
      setdriver_name(navigation.state.params.driver_name);

      setLoading(false);
    }
  }, []);

  /**
   * aggregate the driver data and send update request
   */
  const updateDriverDetail = () => {
    const driver_info = {
      approval_status: 'Pending',
      user: userState.login_id,
      vehicle: vehicle.toUpperCase(),
      driver_name,
      driver_mobile_no: driver_contact_no,
      remarks,
    };
    startUpdateDriverDetailSelf(driver_info);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Content style={globalStyles.content}>
              <Form>
                <Item regular style={globalStyles.mb10}>
                  <Label>Vehicle No:</Label>
                  <Input disabled value={vehicle} />
                </Item>
                <Item regular style={globalStyles.mb10}>
                  <Label>Driver Name:</Label>
                  <Input
                    value={driver_name}
                    onChangeText={val => setdriver_name(val)}
                  />
                </Item>

                <Item regular style={globalStyles.mb10}>
                  <Label>Driver Mobile No:</Label>
                  <Input
                    keyboardType='numeric'
                    value={String(driver_contact_no)}
                    onChangeText={val => setdriver_contact_no(val)}
                  />
                </Item>

                <Textarea
                  rowSpan={2}
                  width="100%"
                  bordered
                  placeholder="Remarks"
                  value={remarks}
                  onChangeText={val => setremarks(val)}
                  style={globalStyles.mb10}
                />

                <Button
                  success
                  style={[globalStyles.mb10, globalStyles.button]}
                  onPress={updateDriverDetail}>
                  <Text>Update Driver Info</Text>
                </Button>
                <Button
                  warning
                  style={[globalStyles.mb10, globalStyles.button]}
                  onPress={() => navigation.goBack()}>
                  <Icon name="ios-arrow-back" />
                  <Text>Go Back</Text>
                </Button>
              </Form>
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

const mapDispatchToProps = {
  startUpdateDriverDetailSelf,
  handleError,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDriver);
