import {useDispatch, useSelector} from 'react-redux';
import {useInfiniteQuery, useQuery} from 'react-query';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Ref, useEffect, useRef, useState} from 'react';

import {IDestination, ITrip, ITripDay} from '@Types/index';
import TripApi from '@Api/TripApi';
import {ShowMessage, convertQueryDataToList} from '@Utils/index';
import useQueryFocus from '@Hooks/queryFocus';
import TripDestinationApi from '@Api/TripDestinationApi';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {IRootState} from '@Store/Store';
import {translate} from '@Languages/index';

export default function useAddDestinationScreen({
  destination,
  selectTripRef,
}: {
  destination: IDestination;
  selectTripRef: Ref<BottomSheetModal>;
}) {
  const dispatch = useDispatch();
  const {pickedAddInformation} = useSelector(
    (state: IRootState) => state.feature,
  );

  const carouselRef = useRef<any>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [selectedTrip, setSelectedTrip] = useState<ITrip>();

  const {
    data: listTrip,
    refetch: refetchTrip,
    isRefetching: isRefetchingTrip,
    isFetchingNextPage: isFetchingNextPageTrip,
    isLoading: isLoadingListTrip,
  } = useInfiniteQuery({
    queryKey: ['listTripInAdd'],
    queryFn: async ({pageParam = 1}) => {
      const result = await TripApi.getListTrip(pageParam);
      return result.data;
    },
    getNextPageParam: lastPage => {
      if (!lastPage?.page || !lastPage?.totalPage) {
        return null;
      }
      if (lastPage?.page < lastPage?.totalPage) {
        return lastPage.page + 1;
      }
      return null;
    },
  });

  const {data: listTripDay, isLoading: isLoadingListTripDay} = useQuery({
    queryKey: ['addDestinationListSchedule', selectedTrip],
    queryFn: async () => {
      if (!selectedTrip) {
        return;
      }
      try {
        const result = await TripApi.getDetailTrip(selectedTrip.id);
        return result.data.data?.days;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onPressPrev = () => {
    setCurrentPageIndex(pre => pre - 1);
  };

  const onPressTripItem = (trip: ITrip) => {
    setSelectedTrip(trip);
    setCurrentPageIndex(1);
  };

  const onPressTripDayItem = async (tripDay: ITripDay) => {
    dispatch(setLoading(true));
    if (!selectedTrip) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const data: {
        tripId: string;
        tripDayId: string;
        position: number;
        place_id: string;
        type: 'destination' | 'rest';
      } = {
        tripId: pickedAddInformation?.tripId ?? selectedTrip.id,
        tripDayId: pickedAddInformation?.tripDayId ?? tripDay.id,
        place_id: destination.place_id,
        position:
          pickedAddInformation?.position ?? tripDay.destinations?.length ?? 0,
        type: 'destination',
      };
      const result = await TripDestinationApi.createTripDestination(data);

      if (result) {
        ShowMessage(translate('destination.createSuccess'), 'success');
        if (selectTripRef) {
          //@ts-expect-error
          selectTripRef.current.close();
        }
      }
    } catch (error) {
      ShowMessage(translate(`util.errorNetwork`), 'danger');
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    carouselRef?.current?.goToPage(currentPageIndex);
  }, [currentPageIndex]);

  useQueryFocus(refetchTrip);

  //@ts-expect-errors
  const listTripData = convertQueryDataToList<ITrip>(listTrip);

  return {
    listTrip: listTripData,
    listTripDay,
    isLoadingListTrip,
    isLoadingListTripDay,
    selectedTrip,
    refetchTrip,
    isRefetchingTrip,
    isFetchingNextPageTrip,
    carouselRef,
    setSelectedTrip,
    onPressTripItem,
    onPressPrev,
    onPressTripDayItem,
  };
}
