import {StyleSheet} from 'react-native';

import {COLORS} from '@Themes/Colors';

export default StyleSheet.create({
  nextStepButton: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: 12,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  step1Container: {
    top: '30%',
    paddingHorizontal: 12,
  },
  step2Container: {
    top: '30%',
    paddingHorizontal: 12,
  },
  step3Button: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});
