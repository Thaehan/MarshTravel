import {StyleProp, ViewStyle} from 'react-native';
import {ThemeManager} from 'react-native-ui-lib';
import {commonViewProps} from './Commons';

ThemeManager.setComponentTheme(
  'TouchableOpacity',
  ({
    height,
    width,
    customStyle,
    ...props
  }: {
    customStyle: StyleProp<ViewStyle>;
    height?: number;
    width?: number;
  }) => {
    return {
      style: [
        {
          ...commonViewProps(props)?.style,
          height,
          width,
        },
        customStyle,
      ],
    };
  },
);
