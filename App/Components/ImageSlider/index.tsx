import {FlatList, ImageStyle, ViewStyle} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
//@ts-expect-error
import PaginationDot from 'react-native-insta-pagination-dots';
import LinearGradient from 'react-native-linear-gradient';

import Dimensions from '@Utils/Dimensions';
import {getGoogleMapImageUrl} from '@Utils/index';
import {COLORS} from '@Themes/Colors';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

const DEFAULT_IMAGE_DATA = [require('@Assets/Images/no-background.jpeg')];

export default function ImageSlider({
  imageUrls,
  style,
  isGoogleImage,
  imageStyle,
  name,
  address,
  rating,
}: {
  name: string;
  address: string;
  rating: number;
  imageUrls: any[];
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  isGoogleImage?: boolean;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const {width, height} = Dimensions;

  const renderImage = ({item}: {item: any}) => {
    const uri = !isGoogleImage
      ? item
      : getGoogleMapImageUrl(item.photo_reference);

    if (!imageUrls.length) {
      return (
        <FastImage
          source={item}
          style={[
            {
              width: width,
              aspectRatio: 1,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          ]}
          resizeMode="cover">
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0.2}}
            colors={[
              COLORS.secondary,
              `${COLORS.secondary}90`,
              `${COLORS.secondary}50`,
              `${COLORS.secondary}10`,
              '#00000000',
            ]}
            style={{
              height: width,
              aspectRatio: 1,
              position: 'absolute',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          />
        </FastImage>
      );
    }

    return (
      <FastImage
        source={{
          uri,
        }}
        style={[
          {
            width: width,
            aspectRatio: 1,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          },
        ]}
        resizeMode="cover">
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={[COLORS.black1, 'transparent','transparent']}
          style={{
            height: width,
            aspectRatio: 1,
            position: 'absolute',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        />
      </FastImage>
    );
  };

  const renderInformation = () => {
    return (
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          padding: 12,
        }}>
        <Text medium xl white>
          {name}
        </Text>
        <Text regular md white>
          {address}
        </Text>
        <StarRatingDisplay
          rating={rating}
          color={COLORS.backgroundMain}
          starSize={24}
          style={{marginTop: 4}}
        />
      </View>
    );
  };

  return (
    <View>
      {renderInformation()}
      <FlatList
        onMomentumScrollEnd={({nativeEvent}) => {
          let contentOffset = nativeEvent.contentOffset;
          let viewSize = nativeEvent.layoutMeasurement;
          let pageNum = Math.floor(contentOffset.x / viewSize.width);
          setCurrentImageIndex(pageNum);
        }}
        scrollToOverflowEnabled={false}
        pagingEnabled
        horizontal
        data={imageUrls.length ? imageUrls : DEFAULT_IMAGE_DATA}
        renderItem={renderImage}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={[style, {width}]}
        contentContainerStyle={{alignSelf: 'flex-start', zIndex: 0}}
      />
    </View>
  );
}
