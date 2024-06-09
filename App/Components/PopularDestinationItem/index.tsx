import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';
import React from 'react';
import {StarIcon} from 'react-native-star-rating-widget';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {StackActions, useNavigation} from '@react-navigation/native';

import {IDestination} from '@Types/index';
import ShadowBox from '@Utils/ShadowBox';
import ScreenNames from '@Constants/ScreenNames';
import {getGoogleMapImageUrl} from '@Utils/index';
import useAddDestinationModal from '@Hooks/Modals/useAddDestinationModal';
import useExploreModal from '@Hooks/Modals/useExploreModal';
import useHomeModal from '@Hooks/Modals/useHomeModal';

export default function PopularDestinationItem({
  data,
  type = 'scroll',
}: {
  data: IDestination;
  isSliderItem?: boolean;
  type?: 'scroll' | 'slider' | 'explore' | 'search';
}) {
  const {close: closeExploreModal} = useExploreModal();
  const {close: closeAddDestinationModal} = useAddDestinationModal();
  const {close: closeHomeModal} = useHomeModal();
  const navigation = useNavigation();
  const {name, place_id, location, mapsSearchDetails, reviews} = data;
  const {photos, rating, formatted_address}: any = mapsSearchDetails;

  const handleClick = () => {
    closeExploreModal();
    closeAddDestinationModal();
    closeHomeModal();

    navigation.dispatch(
      StackActions.push(ScreenNames.Destination, {
        id: place_id,
      }),
    );
  };

  const imageSource =
    photos && photos[0]
      ? {
          uri: getGoogleMapImageUrl(photos[0].photo_reference, photos[0].width),
        }
      : require('@Assets/Images/no-background.jpeg');

  if (type === 'search') {
    return (
      <TouchableOpacity
        onPress={handleClick}
        row
        style={{paddingVertical: 12}}
        centerV>
        <FastImage
          source={imageSource}
          style={{
            width: '16%',
            aspectRatio: 1,
            alignSelf: 'center',
            borderRadius: 100,
          }}
        />
        <View row spread width={'84%'}>
          <View flex paddingL-12>
            <Text medium lg numberOfLines={2}>
              {name}
            </Text>
            <Text regular md maxLength={10} numberOfLines={2}>
              {formatted_address}
            </Text>
          </View>
          <View centerV row paddingR-4 width={'15%'}>
            <StarIcon size={20} color={Colors.primary} type="full" />
            <Text regular md>
              {` ${rating ?? 0}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'explore') {
    return (
      <TouchableOpacity
        style={[ShadowBox.boxShadow, {position: 'relative', flex: 1}]}
        paddingH-8
        paddingV-8
        bg-white
        marginV-8
        onPress={handleClick}>
        <Image
          source={imageSource}
          height={200}
          width={'100%'}
          resizeMode="cover"
          style={{
            borderRadius: 20,
          }}
        />
        <View row spread>
          <View flex>
            <Text semiBold lg numberOfLines={2}>
              {name}
            </Text>
            <View row centerV flex>
              <Ionicons
                name="location-sharp"
                color={Colors.primary}
                size={20}
              />
              <Text regular md maxLength={10} numberOfLines={1}>
                {formatted_address}
              </Text>
            </View>
          </View>
          <View centerV row paddingR-4>
            <StarIcon size={20} color={Colors.primary} type="full" />
            <Text regular md>
              {' ' + rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'slider') {
    return (
      <View style={{minWidth: '100%'}}>
        <TouchableOpacity
          onPress={handleClick}
          key={place_id}
          style={{borderRadius: 20, position: 'relative'}}
          margin-8
          paddingH-8>
          <ImageBackground
            source={imageSource}
            style={{
              width: '100%',
              height: '99%',
              justifyContent: 'flex-end',
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
                height: '99%',
                borderRadius: 20,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                left: 16,
              }}>
              <Text semiBold lg white>
                {name}
              </Text>
              <Text regular md white>
                {formatted_address}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{minWidth: '100%', paddingHorizontal: 20, paddingVertical: 10}}>
      <TouchableOpacity
        onPress={handleClick}
        key={place_id}
        // style={[
        //   ShadowBox.boxShadow,
        //   {borderRadius: 20, position: 'relative', width: '100%'},
        // ]}
        bg-white>
        <Image
          source={imageSource}
          height={180}
          width={'100%'}
          resizeMode="cover"
          style={{
            borderRadius: 20,
          }}
        />
        <View row spread>
          <View flex>
            <Text semiBold lg numberOfLines={2}>
              {name}
            </Text>
            <View row centerV flex>
              <Ionicons
                name="location-sharp"
                color={Colors.primary}
                size={20}
              />
              <Text regular md maxLength={10} numberOfLines={1}>
                {formatted_address}
              </Text>
            </View>
          </View>
          <View centerV row paddingR-4>
            <StarIcon size={20} color={Colors.primary} type="full" />
            <Text regular md>
              {' ' + rating}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
