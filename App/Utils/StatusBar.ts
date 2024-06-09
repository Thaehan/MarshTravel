import DeviceInfo from 'react-native-device-info';
import {Platform, StatusBar} from 'react-native';

export const getBottomBarHeight = () => {
  let deviceId = '';

  if (Platform.OS === 'ios') {
    deviceId = DeviceInfo.getDeviceId();
    if (DeviceInfo.hasDynamicIsland()) return 34;

    if (DeviceInfo.hasNotch()) return 34; // iPhone có Notch

    if (deviceId.slice(0, 5) === 'iPad8') return 34; //Ipad

    if (parseInt(deviceId.slice(4, 6)) > 12) return 34;

    return StatusBar.currentHeight ?? 0;
  }

  return StatusBar.currentHeight ?? 0;
};

export default getBottomBarHeight;
