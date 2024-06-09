import {COLORS} from '@Themes/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  updateButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
  },
  optionButton: {
    marginVertical: 6,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white1,
  },
  iconButton: {
    marginRight: 20,
    color: COLORS.black1,
  },
});
