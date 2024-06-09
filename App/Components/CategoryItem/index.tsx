import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {CATEGORY_IMAGE_MAPS} from '@Constants/Categories';
import {IProvinceCategoryList} from '@Types/index';
import {getGoogleMapImageUrl} from '@Utils/index';

export default function CategoryItem({
  data,
  type = '1',
  onPress,
}: {
  data: IProvinceCategoryList;
  onPress: Function;
  type?: '1' | '2' | '3';
}) {
  const photos =
    data?.list[0]?.mapsSearchDetails?.photos ??
    data?.list[0]?.mapsFullDetails?.photos;

  const imageSource =
    photos && photos[0]
      ? {
          uri: getGoogleMapImageUrl(photos[0].photo_reference, photos[0].width),
        }
      : require('@Assets/Images/no-background.jpeg');

  if (type === '1') {
    return (
      <TouchableOpacity
        onPress={onPress}
        paddingV-8
        paddingH-12
        style={{width: '50%', borderRadius: 12}}>
        <ImageBackground
          source={imageSource ?? CATEGORY_IMAGE_MAPS[data.id]}
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 12,
          }}
          imageStyle={{borderRadius: 20}}
          resizeMode="cover">
          <LinearGradient
            colors={['transparent', 'transparent', Colors.rgba(0, 0, 0, 0.5)]} // Gradient from semi-transparent black to transparent
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: '100%',
              borderRadius: 20,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text medium lg white>
              {data.name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  if (type === '2') {
    return (
      <TouchableOpacity
        onPress={onPress}
        paddingV-8
        paddingH-12
        style={{width: '50%', borderRadius: 12}}>
        <FastImage
          source={CATEGORY_IMAGE_MAPS[data.id]}
          style={{width: '100%', aspectRatio: 2 / 5}}>
          <Text>No</Text>
        </FastImage>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      paddingV-8
      paddingH-12
      style={{width: '50%', borderRadius: 12}}>
      <FastImage
        source={CATEGORY_IMAGE_MAPS[data.id]}
        style={{width: '100%', aspectRatio: 2 / 5}}>
        <Text>No</Text>
      </FastImage>
    </TouchableOpacity>
  );
}
