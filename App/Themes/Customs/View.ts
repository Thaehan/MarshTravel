import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {ThemeManager} from 'react-native-ui-lib';
import {commonViewProps} from './Commons';

ThemeManager.setComponentTheme(
  'View',
  ({customStyle, ...props}: {customStyle: StyleProp<ViewStyle>}) => {
    return {
      style: StyleSheet.flatten([
        {
          ...commonViewProps(props)?.style,
        },
        customStyle,
      ]),
    };
  },
);
