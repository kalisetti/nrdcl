import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, ScrollView } from 'react-native';
import Config from 'react-native-config';
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
import { startQtyExtension } from '../../../../redux/actions/siteActions';
import { handleError, getImages } from '../../../../redux/actions/commonActions';
import globalStyles from '../../../../styles/globalStyle';
export const ExtendQty = ({
  userState,
  commonState,
  navigation,
  startQtyExtension,
  handleError,
  getImages,
}) => {
  const [site, setSite] = useState('');
  const [extension_approval_document, setDocuments] = useState([]);
  const [current_item, setcurrent_item] = useState({});
  const [item, setItem] = useState('');
  const [additional_quantity, setAdditionalQuantity] = useState('0');
  const [remarks, setRemarks] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!userState.logged_in) {
      navigation.navigate('Auth');
    } else if (!userState.profile_verified) {
      navigation.navigate('UserDetail');
    } else {
      setSite(navigation.state.params.id);
      setItem(navigation.state.params.current_item.item_sub_group);
      setcurrent_item(navigation.state.params.current_item);
    }
  }, []);

  useEffect(() => {
    if (images) {
      setDocuments([]);
      setTimeout(() => {
        setDocuments(images);
      }, 600);
    }
  }, [images]);

  const setQty = num => {
    if (isNaN(num)) {
      setAdditionalQuantity('0');
      handleError({ message: 'Addditional Qty should be a number' });
    } else {
      setAdditionalQuantity(num);
    }
  };

  //image picker
  const getSupportingDocuments = async () => {
    const images = await getImages();
    setDocuments(images);
  };

  const extendQty = () => {
    const site_item = {
      site_item_name: current_item.name,
      additional_quantity,
      item_sub_group: item,
      remarks,
    };

    const site_status = {
      approval_status: 'Pending',
      user: userState.login_id,
      site,
      items: [site_item],
    };

    startQtyExtension(site_status, images);
  };

  return commonState.isLoading ? (
    <SpinnerScreen />
  ) : (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <Content style={globalStyles.content}>
              <Form>
                <Item regular inlineLabel style={globalStyles.mb10}>
                  <Label>Site ID:</Label>
                  <Input disabled value={site} />
                </Item>

                <Item regular inlineLabel style={globalStyles.mb10}>
                  <Label>Item:</Label>
                  <Input disabled value={item} />
                </Item>

                <Item regular inlineLabel style={globalStyles.mb10}>
                  <Label>Additional Qty (M3):</Label>
                  <Input
                    value={additional_quantity}
                    onChangeText={val => setQty(val)}
                    keyboardType="numeric"
                  />
                </Item>

                <Textarea
                  rowSpan={3}
                  width="100%"
                  bordered
                  placeholder="Remarks"
                  placeholderTextColor={Config.PLACE_HOLDER_COLOR}
                  value={remarks}
                  onChangeText={val => setRemarks(val)}
                  style={globalStyles.mb10}
                />

                <View style={{ marginBottom: 20 }}></View>
                <Button
                  success
                  style={[globalStyles.mb10, globalStyles.button]}
                  onPress={extendQty}>
                  <Text>Request Qty Extension:</Text>
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

const mapDispatchToProps = { startQtyExtension, handleError, getImages };

export default connect(mapStateToProps, mapDispatchToProps)(ExtendQty);
