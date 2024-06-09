import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import {StackActions, useNavigation} from '@react-navigation/native';

import {Review} from '@Types/index';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';
import {setImageViewing} from '@Store/Slices/FeatureSlice';
import ReviewApi from '@Api/ReviewApi';
import ScreenNames from '@Constants/ScreenNames';

const EXPAND_LENGTH = 100;
export default function DestinationReviewItem({data}: {data: Review}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const likeAnimation = useRef<LottieView>(null);
  const likeFirstRun = useRef(true);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(data.liked);
  const [likeCount, setLikeCount] = useState<number>(data.likes_count);

  const handlePressLike = () => {
    ReviewApi.likeReview(data.id, !isLiked);
    setIsLiked(!isLiked);
  };

  const handlePressItem = () => {
    navigation.dispatch(
      StackActions.push(ScreenNames.DetailReview, {
        id: data.id,
      }),
    );
  };

  const handlePressImage = (index: number) => () => {
    dispatch(
      setImageViewing({
        images: data.imageURLs.map(item => {
          return {uri: item};
        }),
        currentIndex: index,
        visible: true,
      }),
    );
  };

  const renderImageView = () => {
    if (data.imageURLs.length > 4) {
      return (
        <View row style={{flexWrap: 'wrap'}}>
          {data.imageURLs.map((item, index) => {
            if (index <= 3) {
              return (
                <TouchableOpacity
                  padding-4
                  width={'50%'}
                  onPress={handlePressImage(index)}>
                  <FastImage
                    source={{uri: item}}
                    style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
                  />
                  {index === 3 && (
                    <>
                      <View
                        center
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          alignSelf: 'center',
                          opacity: 0.4,
                          backgroundColor: COLORS.disableBackground,
                          borderRadius: 10,
                        }}></View>
                      <View
                        center
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          alignSelf: 'center',
                          borderRadius: 10,
                        }}>
                        <Text semibold xxl white center>{`+${
                          data.imageURLs.length - 3
                        }`}</Text>
                      </View>
                    </>
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      );
    }

    return (
      <View row style={{flexWrap: 'wrap'}}>
        {data.imageURLs.map((item, index) => {
          return (
            <TouchableOpacity
              padding-4
              width={'50%'}
              onPress={handlePressImage(index)}>
              <FastImage
                source={{uri: item}}
                style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderDescription = () => {
    if (data.description.length <= EXPAND_LENGTH) {
      return (
        <Text regular sm marginB-8>
          {data.description}
        </Text>
      );
    }
    if (!isExpand) {
      return (
        <View row marginB-8>
          <Text style={{flex: 1}} numberOfLines={2}>
            {data.description}
          </Text>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              setIsExpand(true);
            }}>
            <Text primary underline regular md>
              {translate('review.expand')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Text regular sm marginB-8>
        {data.description}
      </Text>
    );
  };

  console.log('data', data.user.username);

  useEffect(() => {
    if (likeFirstRun.current) {
      if (isLiked) {
        likeAnimation.current?.play(66, 66);
      } else {
        likeAnimation.current?.play(19, 19);
      }
      likeFirstRun.current = false;
    } else if (isLiked) {
      setLikeCount(pre => pre + 1);
      likeAnimation.current?.play(19, 50);
    } else {
      setLikeCount(pre => pre - 1);
      likeAnimation.current?.play(0, 19);
    }
  }, [isLiked]);

  return (
    <View row width={'100%'} marginV-8>
      {/**Avatar */}
      <View width="14%" padding-6>
        <FastImage
          source={
            data.user.avatar
              ? {uri: data.user.avatar}
              : require('@Assets/Images/no-background.jpeg')
          }
          style={{
            width: '100%',
            aspectRatio: 1,
            borderRadius: 100,
          }}
        />
      </View>
      {/**Content */}
      <View width={'75%'}>
        <View marginB-8 centerV>
          {data.user.username.length ? (
            <Text md regular>
              {data.user.name}
              <Text md light>{` @${data.user.username}`}</Text>
            </Text>
          ) : (
            <Text regular light italic>
              {translate('review.deletedAccount')}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.border,
            padding: 8,
          }}
          onPress={handlePressItem}>
          <Text medium lg textAlign="justify" textAlignVertical="top" marginB-8>
            {data.title}
          </Text>
          {renderDescription()}
          {renderImageView()}
        </TouchableOpacity>
        <View marginT-8>
          {!data.user.username.length ? (
            <Text regular light>
              {moment(data.createdAt).fromNow(true)}
            </Text>
          ) : (
            <Text regular light>
              {moment(data.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
      </View>
      {/**Like */}
      <View width={'11%'} center>
        <TouchableOpacity onPress={handlePressLike}>
          <LottieView
            ref={likeAnimation}
            style={{width: 70, height: 70}}
            source={require('@Assets/Animations/like.json')}
            autoPlay={false}
            loop={false}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text regular md>
          {likeCount < 0 ? 0 : likeCount}
        </Text>
      </View>
    </View>
  );
}
