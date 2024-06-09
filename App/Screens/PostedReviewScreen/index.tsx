import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import usePostedReviewScreen from './services';
import MainLoading from '@Components/MainLoading';
import {FlatList, RefreshControl} from 'react-native';
import EmptyPage from '@Components/EmptyPage';
import PostedReviewItem from './items/PostedReviewItem';

export default function PostedReviewScreen(nav: NativeStackScreenProps<any>) {
  const {
    data,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
    loadmore,
  } = usePostedReviewScreen(nav);

  const renderReviews = () => {
    if (isLoading) {
      return <MainLoading />;
    }

    return (
      <FlatList
        onEndReached={loadmore}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        nestedScrollEnabled
        data={data ?? []}
        renderItem={({item}) => {
          return <PostedReviewItem data={item} />;
        }}
        ListEmptyComponent={EmptyPage}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return <MainLoading />;
          }
        }}
        keyExtractor={(item, index) => `ReviewItem-index=${index}`}
        style={{marginHorizontal: 12}}
      />
    );
  };

  return (
    <MainContainer
      showBackButton
      showHeader
      title={translate('nav.myReview')}>
      {renderReviews()}
    </MainContainer>
  );
}
