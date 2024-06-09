import {COLORS} from '@Themes/Colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  showMapButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 8,
    alignSelf: 'center',
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
