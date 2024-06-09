import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import {Province} from '@Types/index';
import {COLORS} from '@Themes/Colors';

const gradientColors: string[][] = [
  ['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF'],
  ['#ffc901', '#ff9d00', '#ff452e', '#da24b4', '#C62D70'],
];

export default function ProvinceItem({
  data,
  size,
  onPress,
}: {
  data: Province;
  onPress: Function;
  size?: number;
}) {
  const {code, name, explore_tags, followed, name_en, imageURL} = data;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(code);
      }}
      style={{
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      }}>
      <LinearGradient
        colors={followed ? gradientColors[0] : gradientColors[1]}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        style={{padding: 2, borderRadius: 100}}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: COLORS.backgroundMain,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{
              uri: imageURL,
            }}
            style={{height: size ?? 70, width: size ?? 70, borderRadius: 100}}
            resizeMode="cover"
          />
        </View>
      </LinearGradient>
      <View width={size ? size + 20 : 100}>
        <Text marginT-2 light center md numberOfLines={2}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
