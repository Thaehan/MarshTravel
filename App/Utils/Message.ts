import {fontFamilies, fontSizes} from '@Themes/Fonts';
import {StyleSheet} from 'react-native';
import {
  showMessage as show,
  MessageOptions,
  MessageType,
} from 'react-native-flash-message';
import {getStatusBarHeight} from './index';

export const ShowMessage = (
  message: string,
  type?: MessageType,
  description?: string,
  duration?: number,
) => {
  const messageOptions: MessageOptions = {
    icon: 'auto',
    animated: true,
    animationDuration: 300,
    message: message,
    description: description,
    position: 'top',
    style: {
      marginTop: getStatusBarHeight() ?? 0,
      borderRadius: 4,
      margin: 12,
    },
    titleStyle: {
      color: '#ffffff',
      fontSize: fontSizes.md,
      fontFamily: fontFamilies.primaryRegular,
    },
    textStyle: {
      color: '#ffffff',
      fontSize: fontSizes.sm,
      fontFamily: fontFamilies.primaryRegular,
    },
    autoHide: true,
    duration: duration ?? 2000,
    hideOnPress: true,
    floating: true,
    type: type ?? 'none',
    // backgroundColor: string,
    // color: string,
    // description: string,
    // hideStatusBar: boolean,
    // statusBarHeight: number,
    // icon: React.ReactElement | React.FC | Icon,
    // iconProps: Partial<ImageProps>,
    // onHide?(): void,
    // onPress?(): void,
    // onLongPress?(): void,
  };
  show(messageOptions);
};

const styles = StyleSheet.create({
  default: {},
  success: {},
  error: {},
  warning: {},
});

export default ShowMessage;
