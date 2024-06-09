import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import EntypoIcons from 'react-native-vector-icons/Entypo';
//@ts-expect-error
import PaginationDot from 'react-native-insta-pagination-dots';
import {StackActions, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

import {Review} from '@Types/index';
import {Dimensions, formatDate} from '@Utils/index';
import ReviewApi from '@Api/ReviewApi';
import styles from './styles';
import {COLORS} from '@Themes/Colors';
import CommentItem from '@Components/CommentItem';
import {translate} from '@Languages/index';
import ScreenNames from '@Constants/ScreenNames';

const EXPAND_LENGTH = 100;

function ActionBar({
  data,
  handleOpenComments,
  showComment,
}: {
  data: Review;
  handleOpenComments: Function;
  showComment?: boolean;
}) {
  const likeAnimation = useRef<LottieView>(null);
  const saveAnimation = useRef<LottieView>(null);
  const likeFirstRun = useRef(true);
  const saveFirstRun = useRef(true);

  const [isLiked, setIsLiked] = useState<boolean>(data.liked);
  const [isSaved, setIsSaved] = useState<boolean>(data.saved);

  useEffect(() => {
    setIsLiked(data.liked);
    setIsSaved(data.saved);
  }, [data.liked, data.saved]);

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

  useEffect(() => {
    if (saveFirstRun.current) {
      if (isSaved) {
        saveAnimation.current?.play(0, 50);
      } else {
        saveAnimation.current?.play(0, 0);
      }
      saveFirstRun.current = false;
    } else if (isSaved) {
      saveAnimation.current?.play(0, 50);
    } else {
      saveAnimation.current?.play(30, 0);
    }
  }, [isSaved]);

  const handleLike = () => {
    ReviewApi.likeReview(data.id, !isLiked);
    setIsLiked(pre => !pre);
  };

  const handleComment = () => {
    handleOpenComments(data);
  };

  const handleSave = () => {
    ReviewApi.saveReview(data.id, !isSaved);
    setIsSaved(pre => !pre);
  };

  return (
    <View row centerV spread>
      <View row centerV>
        <TouchableOpacity onPress={handleLike}>
          <LottieView
            ref={likeAnimation}
            style={styles.heartLottie}
            source={require('@Assets/Animations/like.json')}
            autoPlay={false}
            loop={false}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Ionicons
            name="chatbubble-outline"
            size={28}
            color={COLORS.defaultActionButton}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSave} centerV>
        <LottieView
          ref={saveAnimation}
          style={styles.saveLottie}
          source={require('@Assets/Animations/bookmark.json')}
          autoPlay={false}
          loop={false}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}

function CommentBar({
  data,
  handleOpenComments,
}: {
  data: Review;
  handleOpenComments: Function;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handleOpenComments(data);
      }}>
      {data?.highlighted_comments?.map(item => {
        return <CommentItem data={item} key={item.id} isHighlight />;
      })}
    </TouchableOpacity>
  );
}

export default function ReviewItem({
  data,
  handleOpenComments,
  disableOnPress,
}: {
  data: Review;
  handleOpenComments: Function;
  disableOnPress?: boolean;
}) {
  const navigation = useNavigation();
  const {
    destination,
    user,
    createdAt,
    imageURLs,
    rating,
    title,
    description,
    likes_count,
  } = data;
  const {width} = Dimensions;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const renderImage = ({item}: {item: string}) => {
    return (
      <FastImage
        source={{uri: item}}
        style={{
          width: width - 24,
          height: width,
          aspectRatio: 1.0,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
    );
  };

  const renderReviewHeader = () => {
    return (
      <View row paddingV-8 paddingH-12 spread>
        <TouchableOpacity row centerV width={'60%'}>
          <FastImage
            source={{uri: user?.avatar ?? ''}}
            style={{height: 40, width: 40, borderRadius: 100}}
            resizeMode="cover"
          />
          <View centerV>
            <Text md regular marginL-8>
              {user?.name}
            </Text>
            <Text sm light marginL-8>
              {`@${user?.username} · ${formatDate(createdAt)}`}
            </Text>
          </View>
        </TouchableOpacity>
        <View centerV row>
          <Text regular lg center>
            <EntypoIcons name="star" size={20} color={COLORS.secondary} />
            {`${rating} `}
          </Text>
          {/* <TouchableOpacity centerV paddingH-8 paddingV-4>
            <EntypoIcons name="dots-three-horizontal" size={18} />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <Text lg medium marginV-4>
        {title}
      </Text>
    );
  };

  const renderDescription = () => {
    if (description.length <= EXPAND_LENGTH) {
      return (
        <Text regular sm marginB-8>
          {description}
        </Text>
      );
    }
    if (!isExpand) {
      return (
        <View row marginB-8>
          <Text style={{flex: 1}} numberOfLines={2}>
            {description}
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
        {description}
      </Text>
    );
  };

  const renderImageScroll = () => {
    return (
      <FlatList
        onMomentumScrollEnd={({nativeEvent}) => {
          let contentOffset = nativeEvent.contentOffset;
          let viewSize = nativeEvent.layoutMeasurement;

          let pageNum = Math.floor(contentOffset.x / (viewSize.width - 24));
          setCurrentImageIndex(pageNum);
        }}
        scrollToOverflowEnabled={false}
        pagingEnabled
        horizontal
        data={imageURLs}
        renderItem={renderImage}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    );
  };

  const renderImageDot = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 8,
        }}>
        <PaginationDot
          activeDotColor={COLORS.primary}
          curPage={currentImageIndex}
          maxPage={imageURLs?.length ?? 0}
        />
      </View>
    );
  };

  const renderGoToDetail = () => {
    let quickRatingText = translate('review.1starRating');
    if (rating <= 2 && rating > 1) {
      quickRatingText = translate('review.2starRating');
    } else if (rating <= 3) {
      quickRatingText = translate('review.3starRating');
    } else if (rating <= 4) {
      quickRatingText = translate('review.4starRating');
    } else if (rating <= 5) {
      quickRatingText = translate('review.5starRating');
    }

    return (
      <TouchableOpacity
        marginV-12
        onPress={() => {
          navigation.dispatch(
            StackActions.push(ScreenNames.Destination, {
              id: destination.place_id,
            }),
          );
        }}>
        <FastImage
          style={{
            width: '100%',
            aspectRatio: 3.5,
            borderRadius: 10,
            position: 'relative',
          }}
          source={{uri: imageURLs?.at(0) ?? ''}}>
          <LinearGradient
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.8}}
            colors={[
              COLORS.backgroundTripItem,
              COLORS.backgroundTripItem,
              `${COLORS.backgroundTripItem}90`,
              `${COLORS.backgroundTripItem}50`,
              `${COLORS.backgroundTripItem}10`,
              '#00000000',
            ]}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              paddingHorizontal: 12,
            }}>
            <View style={{flex: 9}}>
              <Text regular lg white>
                {data.destination?.name}
              </Text>
              <StarRatingDisplay
                rating={data.rating}
                color={COLORS.backgroundMain}
              />
              <Text regular md white>{`${user?.username} ${translate(
                'review.rated',
              )}. ${quickRatingText}`}</Text>
            </View>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  };

  return (
    <View
      bg-white
      marginV-4
      marginH-12
      style={{borderBottomWidth: 1, borderBottomColor: COLORS.border}}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={disableOnPress}
        onPress={() => {
          navigation.dispatch(
            StackActions.push(ScreenNames.DetailReview, {id: data.id}),
          );
        }}>
        {renderReviewHeader()}
        {renderTitle()}
        {renderDescription()}
        {renderImageScroll()}
      </TouchableOpacity>
      {renderImageDot()}
      {renderGoToDetail()}
      <ActionBar data={data} handleOpenComments={handleOpenComments} />
      {/* <CommentBar data={data} handleOpenComments={handleOpenComments} /> */}
    </View>
  );
}
