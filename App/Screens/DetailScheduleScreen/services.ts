import {useEffect, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ScreenNames from '@Constants/ScreenNames';
import TripApi from '@Api/TripApi';
import useAddDestinationModal from '../../Hooks/Modals/useAddDestinationModal';

const QUERY_KEY = 'listTripDayInDetail';

export default function useDetailSchedule(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const {startAt, id}: any = route.params;

  const carouselRef = useRef<any>();
  const {ref: addDestinationRef, close, present} = useAddDestinationModal();

  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);
  const [currentTripDayIndex, setCurrentTripDayIndex] = useState<number>(0);
  const [destinationSearchText, setDestinationSearchText] =
    useState<string>('');

  const {data, isFetching, refetch} = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const result = await TripApi.getDetailTrip(id);
      console.log('result', result.data.data);
      return result.data.data;
    },
  });

  const handleEditDestination = () => {
    console.log('data.days', data?.days);
    if (data?.days) {
      navigation.push(ScreenNames.EditDestination, {
        tripDayId: data?.days[currentTripDayIndex].id,
        tripId: id,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const layout = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 ? 'down' : 'up';
    const isActionButtonVisible = direction === 'up';
    if (isActionButtonVisible !== showButtonTitle) {
      LayoutAnimation.configureNext(layout);
      setShowButtonTitle(isActionButtonVisible);
    }
  };

  const handleSettingButton = () => {
    navigation.push(ScreenNames.EditSchedule, {...route.params, ...data});
  };

  const nextTripDay = () => {
    if (data?.days && currentTripDayIndex < data?.days.length - 1) {
      setCurrentTripDayIndex(pre => pre + 1);
    }
  };

  const previousTripDay = () => {
    if (currentTripDayIndex > 0) {
      setCurrentTripDayIndex(pre => pre - 1);
    }
  };

  const handleOpenAddDestinationModal = () => {
    present();
  };

  const handleCloseAddDestinationModal = () => {
    close();
  };

  useEffect(() => {
    carouselRef.current?.goToPage(currentTripDayIndex, true);
  }, [currentTripDayIndex]);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      refetch();
    });

    return focus;
  }, [navigation]);

  return {
    isFetching,
    data,
    nextTripDay,
    previousTripDay,
    currentTripDayIndex,
    setCurrentTripDayIndex,
    carouselRef,
    handleSettingButton,
    startAt,
    handleCloseAddDestinationModal,
    handleOpenAddDestinationModal,
    destinationSearchText,
    setDestinationSearchText,
    addDestinationRef,
    handleScroll,
    showButtonTitle,
    handleEditDestination,
  };
}
