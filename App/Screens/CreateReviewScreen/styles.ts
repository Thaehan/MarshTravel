import {StyleSheet} from 'react-native';

import {COLORS} from '@Themes/Colors';

export default StyleSheet.create({
  textField: {
    paddingRight: 12,
    paddingVertical: 8,
    flex: 1,
    paddingHorizontal: 12,
  },
  textFieldContainer: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bottomButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: COLORS.primary,
    marginHorizontal: 12,
  },
});
