import Geolocation from 'react-native-location';

//For gps location
export const getGPSLocation = async () => {
  Geolocation.configure({
    distanceFilter: 5.0,
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
  });

  try {
    const checkPerm = await Geolocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'fine', // or 'fine'
      },
    });

    if (!checkPerm) {
      const permGranted = await Geolocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine', // or 'fine'
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      if (!permGranted) {
        throw Error('No Permission');
      }
    }

    const position = await Geolocation.getLatestLocation({timeout: 60000});

    return position;
  } catch (error) {
    return false;
  }
};
