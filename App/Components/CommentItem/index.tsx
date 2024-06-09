import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React, {useEffect, useRef, useState} from 'react';

import {Comment} from '@Types/index';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import ReviewApi from '@Api/ReviewApi';

export default function CommentItem({
  data,
  isHighlight,
}: {
  data: Comment;
  isHighlight?: boolean;
}) {
  const {id, content, user, liked} = data;

  const likeFirstRun = useRef(true);
  const likeAnimation = useRef<LottieView>(null);
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const handleLikeComment = async () => {
    try {
      setIsLiked(pre => !pre);
      await ReviewApi.reactComment(id, !isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (likeFirstRun.current) {
      if (isLiked) {
        likeAnimation.current?.play(66, 66);
      } else {
        likeAnimation.current?.play(19, 19);
      }
      likeFirstRun.current = false;
    } else if (isLiked) {
      likeAnimation.current?.play(19, 50);
    } else {
      likeAnimation.current?.play(0, 19);
    }
  }, [isLiked]);

  if (isHighlight) {
    return (
      <View row marginH-12 marginV-8 spread>
        <View row>
          <FastImage
            style={{height: 40, width: 40, borderRadius: 100}}
            source={{uri: user.avatar}}
          />
          <View>
            <Text regular md>
              {user.username}
            </Text>
            <Text light sm>
              {content}
            </Text>
          </View>
        </View>
        <TouchableOpacity centerV marginR-12 onPress={handleLikeComment}>
          <LottieView
            ref={likeAnimation}
            style={{height: 50, width: 50}}
            source={require('@Assets/Animations/like.json')}
            autoPlay={false}
            loop={false}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View row marginV-8 flex paddingH-12>
      <TouchableOpacity width={'10%'} paddingR-8 paddingT-8>
        <FastImage
          style={{borderRadius: 100, aspectRatio: 1}}
          source={{uri: user.avatar}}
        />
      </TouchableOpacity>
      <View style={{alignSelf: 'flex-start'}} width={'80%'}>
        <Text regular md textAlign="justify" textAlignVertical="top">
          {user.username}
        </Text>
        <Text light sm textAlign="justify" textAlignVertical="top">
          {content}
        </Text>
      </View>
      <TouchableOpacity onPress={handleLikeComment} flex centerH>
        <LottieView
          ref={likeAnimation}
          style={{width: 50, height: 50}}
          source={require('@Assets/Animations/like.json')}
          autoPlay={false}
          loop={false}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}
