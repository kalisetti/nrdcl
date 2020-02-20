import ImagePicker from 'react-native-image-picker';

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
    "width": 720} */
//Choose Image
export const chooseImageFile = () => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, res => {
    if (res.didCancel) {
      return false;
    } else if (res.error) {
      return false;
    } else {
      return res;
    }
  });
};
