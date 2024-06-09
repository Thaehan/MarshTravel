import {COLORS} from '@Themes/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textField: {
    paddingRight: 12,
    paddingVertical: 8,
    flex: 1,
    textAlignVertical: 'top'
  },
  textFieldContainer: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  registerButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: COLORS.primary,
    marginHorizontal: 12,
  },
});
