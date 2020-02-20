import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Button,
  Input,
  Text,
  Content,
  Form,
  Thumbnail,
  View,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import globalStyle from '../../../styles/globalStyle';

import {showToast} from '../../../redux/actions/commonActions';
import {getGPSLocation} from '../../helper/Geolocation';

const Test = ({showToast}) => {
  const [userImage, setUserImage] = useState(null);

  const [showmap, setShowmap] = useState(false);

  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const setLatLong = cood => {
    setCoordinate(cood);
    setRegion({
      latitude: cood.latitude,
      longitude: cood.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setShowmap(true);
  };
  /*{
    "data": "dskhdRANDOMDSKNFLJSFshd", 
    "fileName": "IMG_20191122_211716.jpg", 
    "fileSize": 71328, 
    "height": 1280, 
    "isVertical": true, 
    "originalRotation": 0, 
    "path": "/storage/emulated/0/DCIM/Camera/IMG_20191122_211716.jpg", 
    "timestamp": "2019-11-22T15:17:16Z", 
    "type": "image/jpeg", 
    "uri": "content://com.google.android.apps.photos.contentprovider/-1/1/content%3A%2F%2Fmedia%2Fexternal%2Fimages%2Fmedia%2F86/ORIGINAL/NONE/287383348", 
    "width": 720} 
  */
  const uploadImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
      } else if (res.error) {
      } else {
        setUserImage(res);
      }
    });
  };

  const getGPS = async () => {
    const gps = await getGPSLocation();
    if (gps) {
      setLatLong({latitude: gps.latitude, longitude: gps.longitude});
    }
  };

  const submitInformation = () => {
    showToast('Your Details has been submitted for approval');
    //props.navigation.navigate('ModeSelector');
  };

  return (
    <Container>
      <Content>
        <Form>
          <Input>
            <Text>somehing</Text>
          </Input>

          <Input>
            <Text>somehing</Text>
          </Input>

          <Button onPress={uploadImage}>
            <Text>Choose File</Text>
          </Button>

          {userImage && (
            <Thumbnail square large source={{uri: userImage.uri}} />
          )}

          <Button onPress={getGPS}>
            <Text>Get GPS</Text>
          </Button>
        </Form>
        {showmap && (
          <View style={globalStyle.mapcontainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={globalStyle.map}
              initialRegion={region}
              showUserLocation={true}
              onPress={e =>
                setLatLong({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }>
              <Marker
                draggable
                coordinate={coordinate}
                onDragEnd={e => setLatLong(e.nativeEvent.coordinate)}
              />
            </MapView>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default connect(null, {showToast})(Test);

/*
[
  {
    "data": "X/kXz+X5nU0UUV/p0fGBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//Z", 
    "height": 1280, 
    "mime": "image/jpeg", 
    "modificationDate": "1575457282000", 
    "path": "file:///data/user/0/com.nrdcl/cache/react-native-image-crop-picker/IMG_20191122_211716.jpg", 
    "size": 71328, 
    "width": 720
  }
*/
