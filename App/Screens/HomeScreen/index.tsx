import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors, Text, View} from 'react-native-ui-lib';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
//@ts-expect-error
import PaginationDot from 'react-native-insta-pagination-dots';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import MainContainer from '@Containers/MainContainer';
import {translate} from '@Languages/index';
import useHome from './services';
import AnimationScreenContainer from '@Containers/AnimationScreenContainer';
import PopularDestinationItem from '@Components/PopularDestinationItem';
import Dimensions from '@Utils/Dimensions';
import {COLORS} from '@Themes/Colors';
import CategoryItem from '@Components/CategoryItem';
import {IDestination, IProvinceCategoryList} from '@Types/index';

export default function HomeScreen(nav: NativeStackScreenProps<any>) {
  const {
    handleLogout,
    carouselRef,
    listPopular,
    setListPopular,
    recommendIndex,
    setRecommendIndex,
    currentLocation,
    isLoading,
    data,
    refetch,
    isRefetching,
    currentList,
    setCurrentList,
    setShowBlock,
    showBlock,
    present,
    close,
    ref,
  } = useHome(nav);

  const renderGreetingText = () => {
    return (
      <>
        <View center paddingV-12 row>
          <MaterialIcons name="my-location" color={Colors.primary} size={20} />
          <Text md light>{` ${
            currentLocation?.locationName ?? translate('home.undefined')
          }`}</Text>
        </View>
        <Text light lg>{`${translate('home.hi')} ${`Đạt Đỗ`},`}</Text>
        <View width={'70%'}>
          <Text semiBold giga>{`${translate('home.ask')}`}</Text>
        </View>
      </>
    );
  };

  const renderSlider = () => {
    return (
      <View center width={'100%'}>
        <Carousel
          loop
          ref={carouselRef}
          layout="tinder"
          layoutCardOffset={12}
          data={listPopular}
          renderItem={({item}: {item: IDestination}) => {
            return (
              <PopularDestinationItem
                data={item}
                key={item.place_id}
                type="slider"
              />
            );
          }}
          sliderWidth={(Dimensions.width * 10) / 10}
          itemWidth={(Dimensions.width * 10) / 10}
          pagingEnabled
          contentContainerCustomStyle={{height: Dimensions.height / 3.5}}
          // firstItem={listPopular.length - 1}
          onSnapToItem={index => setRecommendIndex(index)}
          useScrollView={true}
        />
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View center>
        <PaginationDot
          activeDotColor={COLORS.primary}
          curPage={recommendIndex}
          maxPage={listPopular.length}
        />
      </View>
    );
  };

  const renderCategory = () => {
    return (
      <View>
        <Text lg medium marginL-12 marginV-4>
          {translate('home.recommend')}
        </Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {data?.categories.map(
            (item: IProvinceCategoryList, index: number) => {
              return (
                <CategoryItem
                  key={`category${index}`}
                  data={item}
                  onPress={() => {
                    setCurrentList(data.categories[index]);
                    present();
                  }}
                />
              );
            },
          )}
        </View>
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

  const renderBlockModal = () => {
    return (
      <Modal isVisible={showBlock} onBackdropPress={() => {}}>
        <View>
          <Text>Blocked</Text>
        </View>
      </Modal>
    );
  };

  return (
    <MainContainer>
      <AnimationScreenContainer disableScroll>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }>
          {/**Header */}
          <View paddingH-12 paddingV-8>
            {/**Greeting text */}
            {renderGreetingText()}
            {/**Tips */}
            {renderSlider()}
            {renderPagination()}
          </View>
          {/**Category selector */}
          {renderCategory()}
          <BottomSheetModal
            snapPoints={['90%']}
            ref={ref}
            backdropComponent={props => renderBackDrop(props, false)}>
            <View width="100%" centerH>
              <View width="100%" height="8%" row centerH>
                <View
                  width={'70%'}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text medium xl>
                    {currentList?.name}
                  </Text>
                </View>
              </View>

              <ScrollView style={{height: '92%', paddingBottom: 20}}>
                {currentList?.list.map((item: any) => {
                  return <PopularDestinationItem data={item} />;
                })}
              </ScrollView>
            </View>
          </BottomSheetModal>
        </ScrollView>
      </AnimationScreenContainer>
    </MainContainer>
  );
}
