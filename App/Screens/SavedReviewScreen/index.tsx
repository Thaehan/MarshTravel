import {View, Text} from 'react-native-ui-lib';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {translate} from '@Languages/index';
import MainContainer from '@Containers/MainContainer';
import useSavedReviewScreen from './services';
import MainLoading from '@Components/MainLoading';
import {FlatList, RefreshControl} from 'react-native';
import EmptyPage from '@Components/EmptyPage';
import SavedReviewItem from './items/SavedReviewItem';

export default function SavedReviewScreen(nav: NativeStackScreenProps<any>) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
    loadmore,
  } = useSavedReviewScreen(nav);

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
          return <SavedReviewItem data={item} />;
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
      title={translate('nav.savedReview')}>
      {renderReviews()}
    </MainContainer>
  );
}
