import {StyleSheet} from 'react-native';

import {COLORS} from '@Themes/Colors';

export default StyleSheet.create({
  header: {
    top: 0,
    left: 0,
    paddingBottom: 8,
    width: '100%',
    backgroundColor: COLORS.backgroundMain,
  },
  list: {},
  searchInput: {
    zIndex: 100,
  },
  searchInputContainer: {
    marginHorizontal: 12,
  },
});
