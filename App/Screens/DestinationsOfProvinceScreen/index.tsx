import {
  Carousel,
  Colors,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-snap-carousel';
//@ts-expect-error
import PaginationDot from 'react-native-insta-pagination-dots';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MainLoading from '@Components/MainLoading';
import EmptyPage from '@Components/EmptyPage';
import {useLanguages} from '@Hooks/languages';
import {translate} from '@Languages/index';
import CategoryItem from '@Components/CategoryItem';
import useDestinationsOfProvinceScreen from './services';
import {COLORS} from '@Themes/Colors';
import PopularDestinationItem from '@Components/PopularDestinationItem';
import Dimensions from '@Utils/Dimensions';
import {IDestination} from '@Types/index';

import {ShadowBox, getGoogleMapImageUrl} from '@Utils/index';

export default function DestinationsOfProvinceScreen({
  isHome,
}: {
  isHome?: boolean;
}) {
  const {
    pickedProvinceId,
    pickedAddInformation,
    isLoading,
    data,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    handleFollowProvince,
    following,
    carouselRef,
    currentPageIndex,
    setCurrentPageIndex,
    currentList,
    setCurrentList,
    isRefetching,
    recommendIndex,
    setRecommendIndex,
    sliderRef,
  } = useDestinationsOfProvinceScreen({isHome});

  //Render Category
  const renderPopular = () => {
    return (
      <>
        <Text medium lg marginH-12 marginV-8>
          {translate('province.popularDestination')}
        </Text>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingHorizontal: 12,
          }}>
          <View center width={'100%'}>
            <View row centerV>
              <View
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: -40,
                  zIndex: 2,
                }}>
                <TouchableOpacity
                  style={[ShadowBox.boxShadow, {position: 'relative', flex: 1}]}
                  padding-2
                  center
                  onPress={() => {
                    sliderRef.current?.snapToPrev();
                  }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: COLORS.primary,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <MaterialIcons
                      style={{
                        textAlign: 'center',
                        color: COLORS.white1,
                      }}
                      name={'arrow-back-ios'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: '35%',
                  right: -40,
                  zIndex: 1,
                }}>
                <TouchableOpacity
                  style={[ShadowBox.boxShadow, {position: 'relative', flex: 1}]}
                  padding-2
                  center
                  onPress={() => {
                    sliderRef.current?.snapToNext();
                  }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: COLORS.primary,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <MaterialIcons
                      style={{
                        paddingLeft: 5,
                        textAlign: 'center',
                        color: COLORS.white1,
                      }}
                      name={'arrow-forward-ios'}
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{zIndex: 0}}>
                <Slider
                  loop
                  ref={sliderRef}
                  layout="tinder"
                  layoutCardOffset={data?.listRating.length ?? 1}
                  data={data?.listRating ?? []}
                  renderItem={({item}: {item: IDestination}) => {
                    return (
                      <PopularDestinationItem
                        data={item}
                        key={item.place_id}
                        type="slider"
                      />
                    );
                  }}
                  sliderWidth={Dimensions.width}
                  itemWidth={Dimensions.width}
                  pagingEnabled
                  contentContainerCustomStyle={{
                    height: Dimensions.height / 2.5,
                  }}
                  onSnapToItem={(index: number) => setRecommendIndex(index)}
                  useScrollView={true}
                />
              </View>
            </View>
            <PaginationDot
              activeDotColor={COLORS.primary}
              curPage={recommendIndex}
              maxPage={data?.listRating.length ?? 0}
            />
          </View>
        </View>
      </>
    );
  };

  const renderCategories = () => {
    return (
      <>
        <Text medium lg marginH-12 marginV-8>
          {translate('province.byCategory')}
        </Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {data?.categories.map((item, index) => {
            return (
              <CategoryItem
                key={`category${index}`}
                data={item}
                onPress={() => {
                  setCurrentList(item);
                  setCurrentPageIndex(1);
                }}
              />
            );
          })}
        </View>
      </>
    );
  };

  //Render Tab
  const renderMainTab = () => {
    let imageSource = require('@Assets/Images/no-background.jpeg');
    if (data) {
      const photos =
        data?.categories[0]?.list[0]?.mapsSearchDetails?.photos ??
        data?.categories[0]?.list[0]?.mapsFullDetails?.photos;
      imageSource =
        photos && photos[0]
          ? {
              uri: getGoogleMapImageUrl(
                photos[0].photo_reference,
                photos[0].width,
              ),
            }
          : require('@Assets/Images/no-background.jpeg');
    }

    return (
      <View>
        <ScrollView>
          <View style={{borderRadius: 20, width: '100%', marginBottom: 20}}>
            <ImageBackground
              source={imageSource}
              style={{
                width: '100%',
                aspectRatio: 1.5 / 1,
                flexShrink: 0,
                justifyContent: 'flex-end',
              }}
              imageStyle={{borderRadius: 20}}
              resizeMode="cover">
              <LinearGradient
                colors={['transparent', COLORS.primaryGradient]} // Gradient from semi-transparent black to transparent
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: '100%',
                  borderRadius: 20,
                }}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                <Text style={{color: 'white', fontSize: 24, marginBottom: 10}}>
                  {data?.name}
                </Text>
                <TouchableOpacity
                  onPress={handleFollowProvince}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 25,
                    backgroundColor: following ? 'white' : COLORS.primary, // Change colors as needed
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: following ? COLORS.primary : 'white',
                      fontWeight: 'bold',
                    }}>
                    {following
                      ? translate('province.following')
                      : translate('province.follow')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          {renderPopular()}
          {renderCategories()}
        </ScrollView>
      </View>
    );
  };

  const renderDestinationTab = () => {
    return (
      <View width="100%" centerH>
        <View height="8%" width="100%" row centerH>
          <TouchableOpacity
            left
            centerV
            padding-6
            width={'15%'}
            onPress={() => {
              setCurrentPageIndex(0);
            }}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color={Colors.grey10}
            />
          </TouchableOpacity>
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
          <View width={'15%'} />
        </View>

        <ScrollView style={{height: '92%', paddingBottom: 20}}>
          {currentList?.list.map(item => {
            return (
              <View>
                <PopularDestinationItem data={item} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (isLoading || isRefetching) {
    return <MainLoading />;
  }

  if (!data) {
    return <EmptyPage />;
  }

  return (
    <View>
      <Carousel
        initialPage={currentPageIndex}
        onChangePage={(pageIndex: number) => {
          setCurrentPageIndex(pageIndex);
        }}
        ref={carouselRef}
        style={{width: '100%'}}>
        {renderMainTab()}
        {renderDestinationTab()}
      </Carousel>
    </View>
  );
}
