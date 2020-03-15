import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import { startUpdateDriverDetail } from '../../../../redux/actions/siteActions';
import { setLoading } from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';

export const TransportDriverUpdate = ({
  userState,
  commonState,
  navigation,
  startUpdateDriverDetail,
  setLoading,
}) => {
  const [vehicle, setvehicle] = useState(undefined);
  const [driver_name, setdriver_name] = useState(undefined);
  const [driver_mobile_no, setdriver_mobile_no] = useState(undefined);
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
      setvehicle(navigation.state.params.id);
      setdriver_name(navigation.state.params.driver_name);
      setdriver_mobile_no(navigation.state.params.driver_mobile_no);
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
      driver_mobile_no,
      remarks,
    };

    startUpdateDriverDetail(driver_info);
  };


  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <Content style={globalStyles.content}>
          <Form>
            <Item regular inlineLabel style={globalStyles.mb10}>
              <Label>Vehicle No</Label>
              <Input disabled value={vehicle} />
            </Item>

            <Item regular inlineLabel style={globalStyles.mb10}>
              <Label>Driver Name</Label>
              <Input
                value={driver_name}
                onChangeText={val => setdriver_name(val)}
              />
            </Item>

            <Item regular inlineLabel style={globalStyles.mb10}>
              <Label>Driver Mobile No</Label>
              <Input
                keyboardType='numeric'
                value={String(driver_mobile_no)}
                onChangeText={val => setdriver_mobile_no(val)}
              />
            </Item>

            <Textarea
              rowSpan={3}
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
              style={[globalStyles.mb50, globalStyles.button]}
              onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" />
              <Text>Go Back</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
};

const mapStateToProps = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mapDispatchToProps = {
  startUpdateDriverDetail,
  setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportDriverUpdate);
