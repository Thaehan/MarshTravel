import {StyleSheet} from 'react-native';

import {Dimensions, getStatusBarHeight} from '@Utils/index';
import {COLORS} from '@Themes/Colors';

export default StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 12,
    position: 'relative',
    height: Dimensions.height,
  },
  language: {
    borderRadius: 50,
  },
  loginButton: {
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 8,
  },
  googleButton: {
    paddingVertical: 20,
    backgroundColor: COLORS.white1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 8,
  },
  registerButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalVerifyButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  modalBackButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.primary,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
});
