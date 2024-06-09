import {View, TouchableOpacity, Text} from 'react-native-ui-lib';
import React, {Component, ReactNode} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {TextStyle, ViewStyle} from 'react-native';

import styles from './styles';
import {fontFamilies, fontSizes} from '@Themes/Fonts';
import {COLORS} from '@Themes/Colors';

export default function FloatingButton({
  title,
  showTitle = false,
  onPress,
  containerStyle,
  style,
  icon,
  textStyle,
}: {
  title: string;
  showTitle?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  icon?: ReactNode;
  textStyle?: TextStyle;
}) {
  const renderIcon = () => {
    if (icon) {
      return <>{icon}</>;
    }

    return (
      <MaterialIcon
        name="add"
        size={24}
        color={COLORS.backgroundMain}
        style={{fontFamily: fontFamilies.primaryRegular}}
      />
    );
  };

  const renderTitle = () => {
    return (
      <Text
        center
        marginL-5
        color={COLORS.backgroundMain}
        medium
        md
        style={textStyle}>
        {title}
      </Text>
    );
  };

  return (
    //@ts-expect-errors
    <View shadow center style={containerStyle}>
      <TouchableOpacity
        spread
        center
        bg-primary
        style={[styles.signButton, {borderRadius: showTitle ? 8 : 100}, style]}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        {renderIcon()}
        {showTitle && renderTitle()}
      </TouchableOpacity>
    </View>
  );
}
