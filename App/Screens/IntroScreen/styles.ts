import {StyleSheet} from 'react-native';

import {getStatusBarHeight} from '@Utils/index';
import {fontFamilies, fontSizes} from '@Themes/Fonts';
import {COLORS} from '@Themes/Colors';

export default StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 130,
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 40,
    width: '100%',
    paddingHorizontal: 12,
  },
  logo: {
    position: 'absolute',
    top: getStatusBarHeight() + 50,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  description: {
    position: 'absolute',
    top: getStatusBarHeight() + 100,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.primarySemiBold,
    color: 'white',
  },
  buttonStyle: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
});
