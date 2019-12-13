import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  Container,
  Button,
  Input,
  Text,
  Content,
  Form,
  Thumbnail,
  Item,
  Label,
  Spinner,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import globalStyles from '../../../styles/globalStyle';
import {showToast, selectImage} from '../../../redux/actions/commonActions';
import {startProfileSubmission} from '../../../redux/actions/userActions';

const UserDetail = ({
  userState,
  commonState,
  startProfileSubmission,
  navigation,
}) => {
  useEffect(() => {
    if (userState.profile_verified) {
      navigation.navigate('ModeSelector');
    }
  }, []);

  const [cid, setCid] = useState(userState.login_id);
  const [fullname, setFullname] = useState(userState.first_name);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [issued, setIssued] = useState(moment());
  const [expiry, setExpiry] = useState(
    moment()
      .add(10, 'y')
      .subtract(1, 'd'),
  );

  const setExpiryDate = date => {
    setExpiry(
      moment(date, 'DD-MM-YYYY')
        .add(10, 'y')
        .subtract(1, 'd'),
    );
  };

  const setDirectExpiryDate = date => {
    setExpiry(moment(date, 'DD-MM-YYYY'));
  };

  const uploadFront = async () => {
    const image = await selectImage();
    setFrontImage(image);
  };

  const uploadBack = async () => {
    const image = await selectImage();
    setBackImage(image);
  };

  const submitInformation = async () => {
    const userRequest = {
      approval_status: 'Pending',
      user: cid,
      request_type: 'Registration',
      request_category: 'CID Details',
      new_cid: cid,
      new_date_of_issue: issued,
      new_date_of_expiry: expiry,
    };
    startProfileSubmission(userRequest, frontImage, backImage);
  };

  return commonState.isLoading ? (
    <Spinner />
  ) : userState.profile_submitted ? (
    <Container>
      <Content style={globalStyles.content}>
        <Text style={{color: '#ee1111', fontSize: 20, fontWeight: 'bold'}}>
          Your submitted information is being verified. Please come back later.
        </Text>
      </Content>
    </Container>
  ) : (
    <Container>
      <Content style={globalStyles.content}>
        <Form>
          <Item regular style={globalStyles.mb10} stackedLabel>
            <Label>Full Name</Label>
            <Input
              disabled
              value={fullname}
              onChangeText={txt => setFullname(txt)}
            />
          </Item>

          <Item regular style={globalStyles.mb10} stackedLabel>
            <Label>Citizen ID No</Label>
            <Input disabled value={cid} onChangeText={txt => setCid(txt)} />
          </Item>

          <Item regular style={globalStyles.mb10} stackedLabel>
            <Label>CID Issued Date</Label>
            <DatePicker
              style={{width: '100%'}}
              date={issued}
              mode="date"
              customStyles={{dateInput: {borderWidth: 0}}}
              placeholder="Issued Date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                setIssued(date);
                setExpiryDate(date);
              }}
            />
          </Item>

          <Item regular style={globalStyles.mb10} stackedLabel>
            <Label>CID Expiry Date</Label>
            <DatePicker
              style={{width: '100%'}}
              date={expiry}
              mode="date"
              customStyles={{dateInput: {borderWidth: 0}}}
              placeholder="Expiry Date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={date => {
                setDirectExpiryDate(date);
              }}
            />
          </Item>

          {!frontImage && (
            <Button info onPress={uploadFront} style={globalStyles.mb10}>
              <Text>Upload CID (Front Side)</Text>
            </Button>
          )}

          {frontImage && (
            <Container style={globalStyles.cidContainer}>
              <Text>CID Image (Front Side)</Text>
              <Thumbnail
                square
                large
                source={{uri: frontImage.path}}
                style={globalStyles.cidContainer}
              />
            </Container>
          )}
          <Item style={{marginBottom: 25}}></Item>

          {!backImage && (
            <Button info onPress={uploadBack} style={globalStyles.mb10}>
              <Text>Upload CID (Back Side)</Text>
            </Button>
          )}
          {backImage && (
            <Container style={globalStyles.cidContainer}>
              <Text>CID Image (Back Side)</Text>

              <Thumbnail
                square
                large
                source={{uri: backImage.path}}
                style={globalStyles.cidContainer}
              />
            </Container>
          )}

          <Item style={{marginBottom: 25}}></Item>
          <Button success onPress={submitInformation} style={globalStyles.mb50}>
            <Text>Submit For Approval</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mstp = state => ({
  userState: state.userState,
  commonState: state.commonState,
});

const mdtp = {
  showToast,
  startProfileSubmission,
};

export default connect(mstp, mdtp)(UserDetail);

/*
{
  'cmd': u'uploadfile', 
  'file_url': u'', 
  'doctype': u'test1', 
  'filename': u'docker.txt', 
  'file_size': u'89', 
  'docname': u'deff34d88c', 
  'filedata': u'MTg3NmUxZTctOWJkZC00YWViLTgyM2ItZDc2MjlmYWI4MGEzCgpHb29nbGUgQVBJOiBBSXphU3lDb0laYnh4dGxGUGo3endWUnJDbEotcWlEM2RrZUJ4WFU=', 
  'from_form': u'1', 
  'is_private': u'1'
}
*/
