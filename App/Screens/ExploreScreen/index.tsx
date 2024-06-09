import {Text} from 'react-native-ui-lib';
import React, {Component} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';

import MainContainer from '@Containers/MainContainer';
import AnimationScreenContainer from '@Containers/AnimationScreenContainer';
import {translate} from '@Languages/index';
import useExplore from './services';
import ProvinceItem from './items/ProvinceItem';
import SearchItem from './items/SearchItem';
import MainLoading from '@Components/MainLoading';
import ReviewItem from '@Components/ReviewItem';
import EmptyPage from '@Components/EmptyPage';
import CommentScreen from '@Screens/CommentScreen';
import {Review} from '@Types/index';

export default function ExploreScreen(nav: NativeStackScreenProps<any>) {
  const {
    handleProvincePress,
    provinceBottomSheet,
    fetchingProvince,
    fetchingReview,
    listReview,
    listProvince,
    isRefetchingProvince,
    isRefetchingReview,
    isLoadingReview,
    isLoadingProvince,
    refetchProvince,
    refetchReview,
    commentBottomSheet,
    handleOpenComments,
    handleSearchPress,
    hasNextPageReviews,
    fetchNextPageReviews,
    loadmoreReviews,
  } = useExplore(nav);

  const renderHeader = () => {
    return (
      <Text marginL-12 giga medium>
        {translate('nav.explore')}
      </Text>
    );
  };

  const renderBackDrop = (
    props: BottomSheetBackdropProps,
    dissmissOnBackground?: boolean,
  ) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
        pressBehavior={dissmissOnBackground ? 'close' : 'none'}
      />
    );
  };

  const renderProvinces = () => {
    if (isLoadingProvince) {
      return <MainLoading />;
    }

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        style={{paddingVertical: 4, marginRight: 12}}>
        <SearchItem onPress={handleSearchPress} />
        {listProvince &&
          listProvince.map(item => {
            return (
              <ProvinceItem
                data={item}
                onPress={handleProvincePress}
                key={item.code}
              />
            );
          })}
      </ScrollView>
    );
  };

  const renderReviews = () => {
    if (isLoadingReview) {
      return <MainLoading />;
    }

    return (
      <FlatList
        // onEndReached={loadmoreReviews}
        nestedScrollEnabled
        data={listReview ?? []}
        renderItem={({item}) => {
          return (
            <ReviewItem data={item} handleOpenComments={handleOpenComments} />
          );
        }}
        ListEmptyComponent={EmptyPage}
        ListFooterComponent={() => {
          if (fetchingReview) {
            return <MainLoading />;
          }
        }}
        keyExtractor={(item, index) => `ReviewItem-index=${index}`}
      />
    );
  };

  const renderContent = () => {
    if (fetchingProvince && fetchingReview) {
      return <MainLoading />;
    }
    return (
      <ScrollView
        style={{flexGrow: 1}}
        onScroll={({nativeEvent}) => {
          const currentOffset =
            nativeEvent.contentOffset.y +
            nativeEvent.layoutMeasurement.height +
            2;
          if (
            currentOffset > nativeEvent.contentSize.height &&
            hasNextPageReviews
          ) {
            fetchNextPageReviews();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingReview && isRefetchingProvince}
            onRefresh={() => {
              refetchReview();
              refetchProvince();
            }}
          />
        }>
        {renderProvinces()}
        {renderReviews()}
      </ScrollView>
    );
  };

  const renderSearchAndProvince = (Data: any) => {
    return <Data.data />;
  };

  const renderComments = ({data}: {data: Review}) => {
    if (!data) {
      return <></>;
    }
    return <CommentScreen review={data} />;
  };

  return (
    <MainContainer title={renderHeader()} showHeader>
      <AnimationScreenContainer disableScroll>
        {renderContent()}
      </AnimationScreenContainer>
      <BottomSheetModal
        children={renderSearchAndProvince}
        snapPoints={['90%']}
        ref={provinceBottomSheet}
        backdropComponent={props => renderBackDrop(props, false)}
      />
      <BottomSheetModal
        //@ts-ignore
        children={renderComments}
        snapPoints={['90%']}
        ref={commentBottomSheet}
        backdropComponent={props => renderBackDrop(props, true)}
      />
    </MainContainer>
  );
}
