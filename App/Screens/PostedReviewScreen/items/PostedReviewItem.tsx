import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {StarIcon} from 'react-native-star-rating-widget';
import {StackActions, useNavigation} from '@react-navigation/native';

import {Review} from '@Types/index';
import {COLORS} from '@Themes/Colors';
import ScreenNames from '@Constants/ScreenNames';

export default function PostedReviewItem({data}: {data: Review}) {
  const navigation = useNavigation();
  const {id, title, rating, imageURLs, destination} = data;

  const handlePressItem = () => {
    navigation.dispatch(StackActions.push(ScreenNames.DetailReview, {id}));
  };

  return (
    <TouchableOpacity row marginV-8 onPress={handlePressItem}>
      <FastImage
        resizeMode="cover"
        source={{uri: imageURLs[0]}}
        style={{
          width: '30%',
          aspectRatio: 4 / 3,
          borderRadius: 12,
          alignSelf: 'center',
        }}
      />
      <View centerV padding-8 width={'70%'}>
        <Text medium md numberOfLines={2}>
          {destination.name}
        </Text>
        <Text regular md numberOfLines={2}>
          {title}
        </Text>
        <View centerV row paddingR-4>
          <StarIcon size={20} color={COLORS.primary} type="full" />
          <Text regular md>
            {' ' + rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
