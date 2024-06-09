import {COLORS} from '@Themes/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textField: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },
  textFieldContainer: {
    marginHorizontal: 12,
    borderWidth: 0.5,
    borderColor: COLORS.gray3,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.gray1,
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
});
