import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import Permission from 'react-native-permissions';
import {Platform} from 'react-native';

import {setLocation} from '@Store/Slices/SystemSlice';

export default function useLocation() {
  const dispatch = useDispatch();

  async function isPermissionGranted() {
    const isGeolocationGranted = Platform.select({
      android:
        (await Permission.check('android.permission.ACCESS_FINE_LOCATION')) &&
        (await Permission.check('android.permission.ACCESS_COARSE_LOCATION')),
      ios:
        (await Permission.check('ios.permission.LOCATION_ALWAYS')) &&
        (await Permission.check('ios.permission.LOCATION_WHEN_IN_USE')),
    });

    return isGeolocationGranted;
  }

  async function requestPermissions() {
    try {
      Platform.select({
        android: await Permission.request(
          'android.permission.ACCESS_FINE_LOCATION',
        ),
        ios: await Permission.request('ios.permission.LOCATION_WHEN_IN_USE'),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getCurrentLocation() {
    // dispatch(resetLocation());
    try {
      Geolocation.getCurrentPosition(
        position => {
          dispatch(setLocation({...position}));
          console.log('geolocation', position.coords);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {
    requestPermissions,
    getCurrentLocation,
    isPermissionGranted,
  };
}
