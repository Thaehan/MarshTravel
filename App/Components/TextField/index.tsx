import {
  StyleSheet,
  KeyboardType,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactElement, Ref, useState} from 'react';
import {Colors, TouchableOpacity, View} from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {fontFamilies, fontSizes} from '@Themes/Fonts';
import {COLORS} from '@Themes/Colors';
import {getFontsize} from '@Utils/index';

export default function TextField({
  value,
  onChangeValue,
  type = 'default',
  placeholder,
  leftIcon,
  fontSize = 'md',
  keyboardType,
  hide,
  centerText,
  maxLength = 3600,
  defaultValue,
  style,
  containerStyle,
  width,
  numberOfLines,
  multiLines,
  onFocus,
  autoFocus,
  rightIcon,
  ...props
}: {
  value: string;
  onChangeValue: Function;
  placeholder?: string;
  type?: 'default' | 'primary' | 'secondary';
  leftIcon?: ReactElement;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  hide?: boolean;
  keyboardType?: KeyboardType;
  centerText?: boolean;
  maxLength?: number;
  defaultValue?: string;
  style?: ViewStyle;
  containerStyle?: StyleProp<ViewStyle>;
  width?: number | string;
  numberOfLines?: number;
  multiLines?: boolean;
  onFocus?: any;
  autoFocus?: boolean;
  rightIcon?: ReactElement;
}) {
  const [hidePassword, setHidePassword] = useState<boolean>(hide ?? false);

  const getStyleContainer = () => {
    switch (type) {
      case 'default':
        return styles.defaultContainer;
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      default:
        return {};
    }
  };

  const getInputWidth = () => {
    if (leftIcon && hide) {
      return '70%';
    } else if (leftIcon || hide) {
      return '85%';
    }
    return '100%';
  };

  if (width) {
    return (
      <View
        style={[getStyleContainer(), containerStyle && containerStyle]}
        row
        center
        paddingV-6
        width={width}>
        {leftIcon && (
          <View width="15%" centerH>
            {leftIcon}
          </View>
        )}
        <TextInput
          autoFocus={autoFocus}
          multiline={multiLines}
          numberOfLines={numberOfLines}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          value={value}
          onChangeText={text => onChangeValue(text)}
          placeholder={placeholder || ''}
          style={[
            styles.default,
            {width: getInputWidth(), fontSize: getFontsize(fontSize)},
            type == 'secondary' && {
              borderBottomWidth: 1,
              borderColor: COLORS.gray2,
            },
            centerText && {
              textAlign: 'center',
              paddingVertical: 0,
            },
            leftIcon && {
              width: '85%',
            },
            rightIcon && {
              width: '85%',
            },
            style && style,
          ]}
          placeholderTextColor={Colors.grey40}
          maxLength={maxLength}
          onFocus={onFocus}
          {...props}
        />
        {rightIcon && (
          <View width="15%" centerH>
            {rightIcon}
          </View>
        )}
        {hide && (
          <TouchableOpacity
            width="15%"
            center
            paddingV-8
            onPress={() => setHidePassword(pre => !pre)}>
            {hidePassword ? (
              <Ionicons name="eye-outline" size={22} color={Colors.grey30} />
            ) : (
              <Ionicons
                name="eye-off-outline"
                size={22}
                color={Colors.grey30}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View
      style={[getStyleContainer(), containerStyle && containerStyle]}
      row
      center
      paddingV-6>
      {leftIcon && (
        <View width="15%" centerH>
          {leftIcon}
        </View>
      )}
      <TextInput
        autoFocus={autoFocus}
        multiline={multiLines}
        numberOfLines={numberOfLines}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        value={value}
        onChangeText={text => onChangeValue(text)}
        placeholder={placeholder || ''}
        style={[
          styles.default,
          {width: getInputWidth(), fontSize: getFontsize(fontSize)},
          type == 'secondary' && {
            borderBottomWidth: 1,
            borderColor: COLORS.gray2,
          },
          centerText && {
            textAlign: 'center',
            paddingVertical: 0,
          },
          leftIcon && {
            width: '85%',
          },
          rightIcon && {
            width: '85%',
          },
          style && style,
        ]}
        placeholderTextColor={Colors.grey40}
        maxLength={maxLength}
        onFocus={onFocus}
      />
      {rightIcon && (
        <View width="15%" centerH>
          {rightIcon}
        </View>
      )}
      {hide && (
        <TouchableOpacity
          width="15%"
          center
          paddingV-8
          onPress={() => setHidePassword(pre => !pre)}>
          {hidePassword ? (
            <Ionicons name="eye-outline" size={22} color={Colors.grey30} />
          ) : (
            <Ionicons name="eye-off-outline" size={22} color={Colors.grey30} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    backgroundColor: COLORS.backgroundMain,
    marginVertical: 8,
    borderRadius: 8,
    // marginHorizontal: 12
  },
  primaryContainer: {},
  secondaryContainer: {
    borderRadius: 8,
  },
  default: {
    fontFamily: fontFamilies.primaryRegular,
    paddingVertical: 8,
    color: Colors.grey20,
  },
  searching: {},
});
