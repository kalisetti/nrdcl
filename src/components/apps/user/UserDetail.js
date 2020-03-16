import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, Image, SafeAreaView, ScrollView } from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  Form,
  Item,
  Spinner,
  Icon,
  Card,
  CardItem,
  DeckSwiper,
} from 'native-base';
import {
  getImages,
} from '../../../redux/actions/commonActions';
import globalStyles from '../../../styles/globalStyle';
import { showToast } from '../../../redux/actions/commonActions';
import { startProfileSubmission } from '../../../redux/actions/userActions';

const UserDetail = ({
  userState,
  commonState,
  startProfileSubmission,
  navigation,
  getImages,
  showToast
}) => {
  useEffect(() => {
    if (userState.profile_verified) {
      navigation.navigate('ModeSelector');
    }
  }, []);

  const [imagesFront, setImagesFront] = useState([]);
  const [cidFrontImage, setCidFrontImage] = useState([]);

  const [imagesBack, setImagesBack] = useState([]);
  const [cidBackImage, setCidBackImage] = useState([]);

  const [cid, setCid] = useState(userState.login_id);
  const [fullname, setFullname] = useState(userState.first_name);
  const [issued, setIssued] = useState(moment());
  const [expiry, setExpiry] = useState(
    moment()
      .add(10, 'y')
      .subtract(1, 'd'),
  );

  useEffect(() => {
    setImagesFront([]);
    setTimeout(() => {
      setImagesFront(cidFrontImage);
    }, 600);
  }, [cidFrontImage]);

  useEffect(() => {
    setImagesBack([]);
    setTimeout(() => {
      setImagesBack(cidBackImage);
    }, 600);
  }, [cidBackImage]);

  /**
   * image picker cid front page
   */
  const getCidFrontPage = async () => {
    const frontPageImage = await getImages('Front');
    setCidFrontImage(frontPageImage);
  };

  const removeCidFront = () => {
    setCidFrontImage(imagesFront.filter((_, ind) => ind > 0));
  };

  /**
   * image picker cid back page
   */
  const getCidBackPage = async () => {
    const backPageImage = await getImages('Back');
    setCidBackImage(backPageImage);
  };

  const removeCidBack = () => {
    setCidBackImage(imagesBack.filter((_, ind) => ind > 0));
  };


  const submitInformation = async () => {
    if (imagesFront.length < 1) {
      showToast('CID Copy is mandatory');
    }
    else {
      const userRequest = {
        approval_status: 'Pending',
        user: cid,
        request_type: 'Registration',
        request_category: 'CID Details',
        new_cid: cid,
        new_date_of_issue: issued,
        new_date_of_expiry: expiry,
      };
      startProfileSubmission(userRequest, cidFrontImage, cidBackImage);
    }
  };

  return commonState.isLoading ? (
    <Spinner />
  ) : userState.profile_submitted ? (
    userState.profile_verified ? (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Content style={globalStyles.content}>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                CID: <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold' }}>
                  {userState.login_id}
                </Text></Text>

              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                Full Name: <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold' }}>
                  {userState.first_name}
                </Text></Text>
              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
                Mobile Number: <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold' }}>
                  {userState.mobile_no}
                </Text></Text>
            </Content>
          </ScrollView>
        </SafeAreaView>
      </Container>
    ) : (
        <Container>
          <Content style={globalStyles.content}>
            <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>
              Thank you for using NRDCL online services. Your application is currently being processed.
              You will receive SMS notification shortly.
        </Text>
          </Content>
        </Container>
      )
  ) : (
        <Container>
          <SafeAreaView>
            <ScrollView>
              <Content style={globalStyles.content}>
                <Form>
                  <Text>Full Name :<Text style={globalStyles.label}> {fullname}</Text></Text>
                  <Text></Text>
                  <Text >CID Number : <Text style={globalStyles.label}>{cid}</Text></Text>
                  <Text></Text>

                  <Button block info style={globalStyles.mb10} onPress={getCidFrontPage}>
                    <Text>Upload CID COPY</Text>
                  </Button>

                  {imagesFront.length === 0 ? <Fragment></Fragment> : (
                    <View style={{ height: 300, width: '100%', marginBottom: 20 }}>
                      <Text style={{ alignSelf: 'center', color: 'red' }}>
                        Swipe to review all images
              </Text>
                      <DeckSwiper
                        dataSource={cidFrontImage}
                        renderItem={image => (
                          <Card style={{ elevation: 3 }}>
                            <CardItem cardBody>
                              <Image
                                source={{
                                  uri: image.path,
                                }}
                                style={{ height: 250, width: '100%' }}
                              />
                            </CardItem>
                            <CardItem>
                              <Button transparent small onPress={val => removeCidFront(val)}>
                                <Icon name="delete" type="AntDesign" style={{ color: 'red' }} />
                              </Button>
                              <Text>
                                {image.path.substring(image.path.lastIndexOf('/') + 1)}
                              </Text>
                            </CardItem>
                          </Card>
                        )}
                      />
                    </View>
                  )}
                  <View style={{ marginBottom: 20 }}></View>
                  {/* <Button block info style={globalStyles.mb10} onPress={getCidBackPage}>
                <Text>Upload CID (Back Side) *</Text>
              </Button> */}

                  {imagesBack.length === 0 ? <Fragment></Fragment> : (
                    <View style={{ height: 300, width: '100%', marginBottom: 20 }}>
                      <Text style={{ alignSelf: 'center', color: 'red' }}>
                        Swipe to review all images
              </Text>
                      <DeckSwiper
                        dataSource={cidBackImage}
                        renderItem={image => (
                          <Card style={{ elevation: 3 }}>
                            <CardItem cardBody>
                              <Image
                                source={{
                                  uri: image.path,
                                }}
                                style={{ height: 250, width: '100%' }}
                              />
                            </CardItem>
                            <CardItem>
                              <Button transparent small onPress={val => removeCidBack(val)}>
                                <Icon name="delete" type="AntDesign" style={{ color: 'red' }} />
                              </Button>
                              <Text>
                                {image.path.substring(image.path.lastIndexOf('/') + 1)}
                              </Text>
                            </CardItem>
                          </Card>
                        )}
                      />
                    </View>
                  )}
                  <Button block success onPress={submitInformation} style={globalStyles.mb10}>
                    <Text>Submit For Approval</Text>
                  </Button>
                </Form>
              </Content>
            </ScrollView>
          </SafeAreaView>
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
  getImages
};

export default connect(mstp, mdtp)(UserDetail);
