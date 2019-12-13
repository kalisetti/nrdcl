import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Textarea,
  Content,
  Icon,
  Label,
} from 'native-base';
import SpinnerScreen from '../../../base/SpinnerScreen';
import {startSiteStatusChange} from '../../../../redux/actions/siteActions';
import globalStyles from '../../../../styles/globalStyle';

export const SiteStatus = ({
  userState,
  commonState,
  navigation,
  startSiteStatusChange,
}) => {
  const [site, setSite] = useState(undefined);
  const [remarks, setRemarks] = useState(undefined);
  const [purpose, setPurpose] = useState(undefined);
  const [site_purpose, setsite_purpose] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setSite(navigation.state.params.id);
      setPurpose(navigation.state.params.purpose);
      setLocation(navigation.state.params.location);
      setsite_purpose(navigation.state.params.site_purpose);
    }
  }, []);

  const changeSiteStatus = () => {
    const site_status = {
      approval_status: 'Pending',
      user: userState.login_id,
      site,
      change_status: purpose,
      remarks,
    };

    startSiteStatusChange(site_status);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Item regular inlineLabel style={globalStyles.mb10}>
            <Label>Site ID</Label>
            <Input disabled value={site} placeholder="Site ID" />
          </Item>
          <Item regular inlineLabel style={globalStyles.mb10}>
            <Label>Purpose</Label>
            <Input disabled value={site_purpose} placeholder="Purpose" />
          </Item>
          <Item regular inlineLabel style={globalStyles.mb10}>
            <Label>Location</Label>
            <Input disabled value={location} placeholder="Location" />
          </Item>
          <Textarea
            rowSpan={3}
            width="100%"
            bordered
            placeholder="Remarks"
            value={remarks}
            onChangeText={val => setRemarks(val)}
            style={globalStyles.mb10}
          />
          <Button
            success
            style={[globalStyles.mb10, globalStyles.button]}
            onPress={changeSiteStatus}>
            <Text>Request {purpose} Site</Text>
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

const mapDispatchToProps = {startSiteStatusChange};

export default connect(mapStateToProps, mapDispatchToProps)(SiteStatus);
