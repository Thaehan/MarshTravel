import {View, Text, TouchableOpacity} from 'react-native-ui-lib';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useCommentScreen from './services';
import {Review} from '@Types/index';
import MainLoading from '@Components/MainLoading';
import EmptyPage from '@Components/EmptyPage';
import CommentItem from '@Components/CommentItem';
import {translate} from '@Languages/index';
import {COLORS} from '@Themes/Colors';
import TextField from '@Components/TextField';
import {FlatList} from 'react-native-gesture-handler';

export default function CommentScreen({review}: {review: Review}) {
  const {
    data,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
    expandComment,
    hasNextPage,
    fetchNextPage,
    commentText,
    setCommentText,
    handleComment,
    commentListRef,
    
  } = useCommentScreen(review);

  const handleFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderHeader = () => {
    return (
      <View
        center
        style={{
          borderBottomWidth: 0.2,
          borderColor: COLORS.border,
          paddingBottom: 4,
        }}>
        <Text semiBold lg center marginB-10>
          {translate('review.commentHeader')}
        </Text>
      </View>
    );
  };

  const renderTextField = () => {
    return (
      <View row marginH-12>
        <TextField
          placeholder={translate('review.commentPH')}
          autoFocus
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

  if (isLoading) {
    return <MainLoading />;
  }

  return (
    <View flex>
      {renderHeader()}
      <FlatList
        //@ts-ignore
        ref={commentListRef}
        onEndReached={handleFetchNextPage}
        scrollEnabled
        nestedScrollEnabled
        // refreshControl={
        //   <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        // }
        data={data ?? []}
        renderItem={({item}) => {
          return <CommentItem data={item} />;
        }}
        ListEmptyComponent={EmptyPage}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <MainLoading />;
          }
        }}
      />
      {renderTextField()}
    </View>
  );
}
