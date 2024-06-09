import TripDayApi from '@Api/TripDayApi';
import TripDestinationApi from '@Api/TripDestinationApi';
import useQueryFocus from '@Hooks/queryFocus';
import {translate} from '@Languages/index';
import {setLoading, setLocalLoading} from '@Store/Slices/LoadingSlice';
import {ITripDestination} from '@Types/index';
import ShowMessage from '@Utils/Message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

const DETAIL_KEY = 'DETAIL_TRIP_DAY_IN_DETAIL';
const MATRIX_KEY = 'MATRIX_TRIP_DAY_IN_DETAIL';

export default function useEditDestinationScreen(
  nav: NativeStackScreenProps<any>,
) {
  const {navigation, route} = nav;
  const {tripId, tripDayId}: any = route.params;
  const dispatch = useDispatch();

  const [total, setTotal] = useState({
    distance: 0,
    time: 0,
  });
  const [currentDay, setCurrentDay] = useState<ITripDestination[]>([]);
  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);

  const {
    data: matrix,
    refetch: refetchMatrix,
    isFetching: isFetchingMatrix,
  } = useQuery({
    queryKey: [MATRIX_KEY, tripId, tripDayId],
    queryFn: async () => {
      try {
        const res = await TripDayApi.getTripDayMatrix({
          tripDayId: tripDayId,
          tripId: tripId,
        });

        if (res) {
          console.log('matrix', res.data);
          return res.data;
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  });

  const {data: dayData, refetch: refetchData} = useQuery({
    queryKey: [DETAIL_KEY, tripId, tripDayId],
    queryFn: async () => {
      if (!tripId || !tripDayId) {
        return [];
      }
      const result = await TripDayApi.getDetailTripDay({
        tripDayId: tripDayId,
        tripId: tripId,
      });
      return result.data?.destinations;
    },
  });

  const handleSave = async () => {
    dispatch(setLoading(true));
    try {
      const currentPosition = currentDay.map(item => {
        return item.position;
      });

      const res = await TripDestinationApi.updateTripDestinationPosition({
        tripDayId: tripDayId,
        tripId: tripId,
        positions: currentPosition,
      });

      if (res) {
        ShowMessage(
          translate('detailSchedule.updateDestinationSuccess'),
          'success',
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOptimize = async () => {
    dispatch(setLoading(true));
    try {
      const res = await TripDayApi.getOptimizeTripDay({
        tripDayId: tripDayId,
        tripId: tripId,
      });
      if (res) {
        const newList = res.data?.positions.map(item => {
          return currentDay.find(destination => {
            return destination.position === item;
          });
        });
        //@ts-expect-error
        setCurrentDay(newList);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log('handle change', event.nativeEvent.contentOffset);
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

  useEffect(() => {
    setCurrentDay(dayData ?? []);
  }, [dayData]);

  useEffect(() => {
    let tempTotal = {
      time: 0,
      distance: 0,
    };
    currentDay.forEach((destination, index) => {
      if (index === 0) {
        return;
      }
      const currentMatrixItem = matrix?.find(matrixItem => {
        return (
          matrixItem.origin_place_id === currentDay[index - 1].place_id &&
          matrixItem.destination_place_id === destination.place_id
        );
      }) ?? {
        distance: 0,
        duration: 0,
      };
      tempTotal.distance += currentMatrixItem?.distance ?? 0;
      tempTotal.time += currentMatrixItem?.duration ?? 0;
    });
    console.log('total', tempTotal);
    setTotal(tempTotal);
  }, [currentDay]);

  useQueryFocus(refetchData);
  useQueryFocus(refetchMatrix);

  return {
    currentDay,
    setCurrentDay,
    handleSave,
    handleOptimize,
    handleScroll,
    showButtonTitle,
    setShowButtonTitle,
    refetchData,
    matrix,
    refetchMatrix,
    isFetchingMatrix,
    setTotal,
    total,
  };
}
