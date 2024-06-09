import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View, TouchableOpacity} from 'react-native-ui-lib';
import ImageViewing from 'react-native-image-viewing';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import MainContainer from '@Containers/MainContainer';
import useDestinationDetail from './services';
import ImageSlider from '@Components/ImageSlider';
import MainLoading from '@Components/MainLoading';
import EmptyPage from '@Components/EmptyPage';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import {Review} from '@Types/index';
import DestinationReviewItem from './items/DestinationReviewItem';
import CustomButton from '@Components/CustomButton';
import {COLORS} from '@Themes/Colors';
import {translate} from '@Languages/index';
import AddDestinationScreen from './items/AddDestinationScreen';

export default function DestinationScreen(nav: NativeStackScreenProps<any>) {
  const {
    data,
    isLoading,
    isRefetching,
    isFetchingNextPageReview,
    isLoadingReviews,
    reviews,
    isRefetchingReviews,
    refetchReviews,
    isFetchingReviews,
    loadMoreReviews,
    imageViewing,
    closeImageViewing,
    changeImageViewingIndex,
    currentImageViewingOffset,
    onPressDirect,
    onPressCreateReview,
    onPressWebsite,
    addBottomSheetRef,
    onPressAddDestinationToSchedule,
  } = useDestinationDetail(nav);

  const renderLoading = () => {
    if (isFetchingNextPageReview) {
      return <MainLoading />;
    }
  };

  const renderEmpty = () => {
    if (!isFetchingReviews) {
      return <EmptyPage />;
    }
  };

  const renderReviews = () => {
    if (isLoadingReviews) {
      return <MainLoading />;
    }
    return (
      <FlatList
        onEndReachedThreshold={0.01}
        data={reviews}
        renderItem={({item}: {item: Review}) => {
          return <DestinationReviewItem data={item} />;
        }}
        onEndReached={loadMoreReviews}
        keyExtractor={(item, index) => `TripItem-${item.id}`}
        ListFooterComponent={renderLoading}
        ListEmptyComponent={renderEmpty}
      />
    );
  };

  const getTypeOrAddressFullDetails = (): string => {
    if (data?.mapsFullDetails?.types) {
      return translate(`placeType.${data.mapsFullDetails?.types[0]}`);
    } else {
      return data?.mapsFullDetails?.formatted_address ?? '';
    }
  };

  const renderAddButton = () => {
    return (
      <View
        style={{
          height: 45,
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <CustomButton
          label={translate('destination.direct')}
          containerStyle={{
            width: '40%',
            paddingVertical: 6,
            borderRadius: 25,
            backgroundColor: COLORS.gray1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={onPressDirect}
          textColor={COLORS.black1}
          textSize="md"
        />
        <CustomButton
          label={translate('destination.addToSchedule')}
          containerStyle={{
            width: '58%',
            paddingVertical: 6,
            borderRadius: 25,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPressAddDestinationToSchedule}
          textColor={COLORS.white1}
          textSize="md"
          icon={
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={COLORS.white1}
            />
          }
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View>
        <Text regular marginH-8 marginV-10>
          {data?.description != ''
            ? data?.description
            : translate('destination.defaultDescription')}
        </Text>
        {data?.mapsFullDetails?.formatted_address && (
          <View marginV-10>
            <Text medium lg marginH-8 color={COLORS.black1}>
              {data.mapsFullDetails?.formatted_address}
            </Text>
            {data.mapsFullDetails?.opening_hours?.open_now ? (
              <Text medium lg marginH-8 marginT-8 color={COLORS.primary}>
                {data.mapsFullDetails?.opening_hours?.open_now === true
                  ? translate('destination.open')
                  : translate('destination.close')}
              </Text>
            ) : (
              data.mapsFullDetails?.current_opening_hours?.open_now && (
                <Text medium lg marginH-8 marginT-8 color={COLORS.primary}>
                  {data.mapsFullDetails?.current_opening_hours?.open_now ===
                  true
                    ? translate('destination.open')
                    : translate('destination.close')}
                </Text>
              )
            )}
          </View>
        )}
        {data?.mapsFullDetails?.current_opening_hours?.weekday_text && (
          <Text medium xl marginH-8>
            {translate('destination.openHour')}
          </Text>
        )}
        {data?.mapsFullDetails?.current_opening_hours?.weekday_text.map(
          item => {
            return (
              <Text regular marginH-8 marginV-4 key={item}>
                {item}
              </Text>
            );
          },
        )}
        {data?.mapsFullDetails?.website && (
          <View marginV-10>
            <Text medium xl marginH-8>
              {translate('destination.web')}
            </Text>
            <TouchableOpacity onPress={onPressWebsite}>
              <Text medium l marginH-8 color={COLORS.primary}>
                {data.mapsFullDetails?.website}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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

  const renderInformationBottomSheet = () => {
    return (
      <BottomSheetModal
        ref={addBottomSheetRef}
        snapPoints={['90%']}
        enablePanDownToClose
        backdropComponent={renderBackDrop}>
        {data && (
          <AddDestinationScreen
            destination={data}
            selectTripRef={addBottomSheetRef}
          />
        )}
      </BottomSheetModal>
    );
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <MainContainer showBackButton isFullScreen>
      <ScrollView
        style={{height: '100%'}}
        // contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingReviews}
            onRefresh={refetchReviews}
          />
        }>
        <ImageSlider
          name={data.name}
          address={getTypeOrAddressFullDetails()}
          rating={isLoadingReviews ? 0 : 5}
          imageUrls={data?.mapsFullDetails?.photos ?? []}
          isGoogleImage
        />
        <View style={{paddingHorizontal: 5}}>
          {renderAddButton()}
          {renderContent()}
          <View>
            {/* Your existing content */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text medium xxl marginH-8 marginV-10 style={{flex: 1}}>
                {translate('destination.reviews')}
              </Text>
              <TouchableOpacity
                paddingV-8
                paddingH-12
                onPress={onPressCreateReview}
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  marginRight: 15,
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                }}>
                <Text regular style={{color: COLORS.white1}}>
                  {translate('destination.createReview')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            {/* <Text medium xxl marginH-8 marginV-10>
                {translate('destination.reviews')}
            </Text> */}
            {renderReviews()}
          </View>
        </View>
      </ScrollView>
      <View>
        <ImageViewing
          onImageIndexChange={changeImageViewingIndex}
          imageIndex={imageViewing?.currentIndex ?? 0}
          images={imageViewing?.images ?? []}
          visible={imageViewing?.visible ?? false}
          onRequestClose={closeImageViewing}
          doubleTapToZoomEnabled
          animationType="fade"
          keyExtractor={(source, index) => `${source}${index}`}
          presentationStyle="overFullScreen"
          FooterComponent={() => {
            return (
              <View center width={'100%'}>
                <Text regular lg white center>{`${
                  imageViewing?.currentIndex
                    ? imageViewing?.currentIndex + currentImageViewingOffset + 1
                    : currentImageViewingOffset + 1
                }/${imageViewing?.images.length}`}</Text>
              </View>
            );
          }}
        />
      </View>
      {renderInformationBottomSheet()}
    </MainContainer>
  );
}
