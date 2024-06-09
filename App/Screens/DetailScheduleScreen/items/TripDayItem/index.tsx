import {Text, TouchableOpacity, View} from 'react-native-ui-lib';
import React, {useState, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import Timeline from 'react-native-timeline-flatlist';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import {useQuery} from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions, useNavigation} from '@react-navigation/native';

import {ITripDay, ITripDestination} from '@Types/index';
import TripDayApi from '@Api/TripDayApi';
import MainLoading from '@Components/MainLoading';
import TripDestinationApi from '@Api/TripDestinationApi';
import {COLORS} from '@Themes/Colors';
import {
  setPickedInformation,
  setPickedProvinceId,
} from '@Store/Slices/FeatureSlice';
import EmptyPage from '@Components/EmptyPage';
import {translate} from '@Languages/index';
import TripDayMenuOptionsItem, {
  ITripDayMenuOptionItem,
} from './TripDayMenuOptionsItem';
import {setLoading} from '@Store/Slices/LoadingSlice';
import CustomButton from '@Components/CustomButton';
import ScreenNames from '@Constants/ScreenNames';
import {
  formatDistanceInMeters,
  formatTimeInSecondsToMinutes,
  getGoogleMapImageUrl,
} from '@Utils/index';
import useAddDestinationModal from '@Hooks/Modals/useAddDestinationModal';

export default function TripDayItem({
  data,
  isPresent,
  onScroll,
}: {
  data: ITripDay;
  isPresent: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {present} = useAddDestinationModal();
  const [visibleMenuOption, setVisibleMenuOption] = useState<boolean>(false);
  const [pickedTripDestination, setPickedTripDestination] =
    useState<ITripDestination>();

  const handleSelectDestination =
    (item: ITripDestination, position: number) => () => {
      setPickedTripDestination(item);
      dispatch(
        setPickedInformation({
          tripId: data.tripId,
          tripDayId: data.id,
          position,
        }),
      );
      setVisibleMenuOption(true);
    };

  const handleAddDestination = (provinceIndex: number) => () => {
    setVisibleMenuOption(false);
    dispatch(setPickedProvinceId(provinceIndex.toString()));
    present();
  };

  const handleAddDestinationToLast = (provinceIndex: number) => () => {
    setVisibleMenuOption(false);
    dispatch(
      setPickedInformation({
        tripId: data.tripId,
        tripDayId: data.id,
        position: data.destinations.length,
      }),
    );
    dispatch(setPickedProvinceId(provinceIndex.toString()));
    present();
  };

  const listOptions: Array<ITripDayMenuOptionItem> = useMemo(() => {
    return [
      {
        //Option
        title: translate('detailSchedule.direction'),
        icon: (
          <MaterialIcons name="directions" size={30} color={COLORS.secondary} />
        ),
        onPress: () => {
          setVisibleMenuOption(false);
          navigation.dispatch(
            StackActions.push(ScreenNames.MapView, pickedTripDestination),
          );
        },
      },
      {
        //Option
        title: translate('detailSchedule.destinationDetail'),
        icon: (
          <MaterialCommunityIcons
            name="information-outline"
            color={COLORS.secondary}
            size={30}
          />
        ),
        onPress: () => {
          setVisibleMenuOption(false);
          navigation.dispatch(
            StackActions.push(ScreenNames.Destination, {
              id: pickedTripDestination?.place_id,
            }),
          );
        },
      },
      {
        //Option
        title: translate('detailSchedule.addDestination'),
        icon: (
          <MaterialIcons
            name="add-circle-outline"
            size={30}
            color={COLORS.secondary}
          />
        ),
        onPress: handleAddDestination(1),
      },
      {
        //Option
        title: translate('detailSchedule.deleteDestination'),
        icon: (
          <MaterialCommunityIcons
            name="delete"
            color={COLORS.secondary}
            size={30}
          />
        ),
        onPress: async () => {
          setVisibleMenuOption(false);
          dispatch(setLoading(true));
          try {
            if (pickedTripDestination?.id) {
              const result = await TripDestinationApi.deleteTripDestination({
                tripId: data.tripId,
                tripDayId: data.id,
                tripDestinationId: pickedTripDestination.id,
              });
              if (result) {
                await refetch();
              }
            }
          } catch (error) {
            console.error(error);
          } finally {
            dispatch(setLoading(false));
            setPickedTripDestination(undefined);
          }
        },
      },
    ];
  }, [pickedTripDestination]);

  const {
    isLoading,
    isRefetching,
    refetch,
    data: currentDestinationList,
  } = useQuery({
    queryKey: [`tripdayItem-index${data.id}`],
    queryFn: async () => {
      if (data.tripId) {
        const result = await TripDayApi.getDetailTripDay({
          tripId: data.tripId,
          tripDayId: data.id,
        });

        return result.data?.destinations;
      }
    },
    initialData: data.destinations,
  });

  const renderDetail = (item: ITripDestination, sectionId: number) => {
    const {details, mapsFullDetails, name} = item;

    const imageSource = mapsFullDetails?.photos?.at(0)?.photo_reference
      ? {
          uri: getGoogleMapImageUrl(
            mapsFullDetails?.photos?.at(0)?.photo_reference ?? '',
          ),
        }
      : {
          uri: 'https://hub.packtpub.com/wp-content/uploads/2018/03/sky-clouds-blue.jpg',
        };

    return (
      <TouchableOpacity onPress={handleSelectDestination(item, sectionId)}>
        <FastImage
          style={{
            width: '100%',
            aspectRatio: 3.5,
            borderRadius: 20,
            position: 'relative',
          }}
          source={imageSource}>
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
                {name}
              </Text>
              {mapsFullDetails?.types && (
                <Text regular md white>
                  {translate(`placeType.${mapsFullDetails?.types[0]}`)}
                </Text>
              )}
              <Text regular md white>
                {item?.timeFromLastDestination &&
                  formatTimeInSecondsToMinutes(
                    item.timeFromLastDestination,
                  )}{' '}
                {item?.distanceFromLastDestination &&
                  ' - ' +
                    formatDistanceInMeters(
                      item?.distanceFromLastDestination,
                    )}{' '}
                {(item?.timeFromLastDestination ||
                  item?.distanceFromLastDestination) &&
                  translate('detailSchedule.fromLastPosition')}
              </Text>
            </View>
            <TouchableOpacity center style={{flex: 1}}></TouchableOpacity>
          </View>
        </FastImage>
      </TouchableOpacity>
    );
  };

  if (!isPresent || isLoading) {
    return <MainLoading />;
  }

  return (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: COLORS.backgroundMain,
        marginHorizontal: 12,
        height: '92%',
      }}>
      <Timeline
        data={currentDestinationList}
        renderDetail={renderDetail}
        renderFullLine
        dotColor={COLORS.white1}
        circleColor={COLORS.primary}
        lineColor={COLORS.primary}
        showTime={false}
        innerCircle="dot"
        //@ts-ignore
        options={{
          refreshControl: (
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          ),
          ListEmptyComponent: EmptyPage,
          showsVerticalScrollIndicator: false,
          ListFooterComponent: (
            <CustomButton
              onPress={handleAddDestinationToLast(1)}
              label={translate('detailSchedule.addDestination')}
              textColor="white"
              containerStyle={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginVertical: 8,
                backgroundColor: COLORS.primary,
                marginHorizontal: 12,
              }}
            />
          ),
          keyExtractor: (item, index) => `Destination ${index}`,
          onScroll: onScroll,
        }}
      />
      <Modal
        animationIn={'flipInX'}
        animationOut={'flipOutX'}
        isVisible={visibleMenuOption}
        onBackdropPress={() => setVisibleMenuOption(false)}
        useNativeDriver
        style={{margin: 0, padding: 0, justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: COLORS.backgroundMain,
            alignSelf: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            borderRadius: 12,
          }}>
          {listOptions.map(item => {
            return <TripDayMenuOptionsItem data={item} key={item.title} />;
          })}
        </View>
      </Modal>
    </View>
  );
}
