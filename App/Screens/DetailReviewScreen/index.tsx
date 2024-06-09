import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import useSavedReviewScreen from './services';
import ReviewItem from '@Components/ReviewItem';
import MainLoading from '@Components/MainLoading';
import EmptyPage from '@Components/EmptyPage';
import CommentItem from '@Components/CommentItem';
import TextField from '@Components/TextField';
import {COLORS} from '@Themes/Colors';
import EmptyComment from '@Components/EmptyComment';

export default function DetailReviewScreen(nav: NativeStackScreenProps<any>) {
  const {
    reviewData,
    isLoadingReview,
    commentsData,
    isFetchingNextPageComment,
    isLoadingComment,
    commentText,
    setCommentText,
    handleComment,
    loadmoreComment,
  } = useSavedReviewScreen(nav);

  const renderReviews = () => {
    if (reviewData) {
      return (
        <ReviewItem
          data={reviewData}
          handleOpenComments={() => {}}
          disableOnPress
        />
      );
    }

    return <EmptyPage />;
  };

  const renderComments = () => {
    return (
      <FlatList
        onEndReached={loadmoreComment}
        data={commentsData}
        renderItem={({item}) => {
          return <CommentItem data={item} />;
        }}
        ListEmptyComponent={EmptyComment}
        ListFooterComponent={() => {
          if (isFetchingNextPageComment) {
            return <MainLoading />;
          }
        }}
      />
    );
  };

  const renderTextField = () => {
    return (
      <View row marginH-12>
        <TextField
          placeholder={translate('review.commentPH')}
          containerStyle={{
            width: '90%',
            bottom: 0,
            alignSelf: 'flex-end',
          }}
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: COLORS.border,
            paddingHorizontal: 12,
          }}
          value={commentText}
          onChangeValue={setCommentText}
        />
        <TouchableOpacity width="10%" centerV right onPress={handleComment}>
          <Ionicons name="send" color={COLORS.primary} size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoadingComment || isLoadingReview) {
    return (
      <MainContainer
        showBackButton
        showHeader
        title={translate('nav.detailReview')}>
        <MainLoading />
      </MainContainer>
    );
  }

  return (
    <MainContainer
      showBackButton
      showHeader
      title={translate('nav.detailReview')}>
      <ScrollView>
        {renderReviews()}
        {renderComments()}
      </ScrollView>
      {renderTextField()}
    </MainContainer>
  );
}
