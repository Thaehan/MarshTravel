import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

import {fontFamilies} from '@Themes/Fonts';

export default StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 1,
  },
  signButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 42,
    right: 16,
    padding: 10,
    shadowColor: Colors.gray3,
  },
  text: {
    fontFamily: fontFamilies.primaryRegular,
  },
});
