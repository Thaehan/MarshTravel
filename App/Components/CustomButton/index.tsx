import React, {ReactElement} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {TouchableOpacity, Text, Colors} from 'react-native-ui-lib';

import {fontSizes, fontFamilies} from '@Themes/Fonts';
import styles from './styles';
import {COLORS} from '@Themes/Colors';

export default function CustomButton({
  label,
  containerStyle,
  textStyle,
  onPress,
  textColor,
  textSize = 'md',
  textFamily = 'regular',
  icon,
  disable,
  disableChangeBackground,
}: {
  label?: string;
  onPress?: () => void;
  textColor?: string;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactElement;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  textFamily?: 'light' | 'regular' | 'semiBold' | 'bold';
  disable?: boolean;
  disableChangeBackground?: boolean;
}) {
  const getFontsize = () => {
    switch (textSize) {
      case 'sm':
        return fontSizes.sm;
      case 'md':
        return fontSizes.md;
      case 'lg':
        return fontSizes.lg;
      case 'xl':
        return fontSizes.xl;
    }
  };

  const getFontFamily = () => {
    switch (textFamily) {
      case 'light':
        return fontFamilies.primaryLight;
      case 'regular':
        return fontFamilies.primaryRegular;
      case 'semiBold':
        return fontFamilies.primarySemiBold;
      case 'bold':
        return fontFamilies.primaryBold;
    }
  };

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        containerStyle ? containerStyle : styles.container,
        disable && !disableChangeBackground && {backgroundColor: COLORS.gray2},
      ]}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      row>
      {icon && icon}
      {label && (
        <Text
          regular
          style={[
            {color: textColor ? textColor : Colors.grey30},
            textStyle
              ? textStyle
              : {fontSize: getFontsize(), fontFamily: getFontFamily()},
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
