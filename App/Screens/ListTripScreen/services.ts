import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useRef, useState} from 'react';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';

import {ITrip} from '@Types/index';
import ScreenNames from '@Constants/ScreenNames';
import TripApi from '@Api/TripApi';
import {ShowMessage, convertQueryDataToList} from '@Utils/index';
import useQueryFocus from '@Hooks/queryFocus';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {translate} from '@Languages/index';

export default function useListTrip(nav: NativeStackScreenProps<any>) {
  const {navigation} = nav;
  const dispatch = useDispatch();

  const settingModalRef = useRef<Modal>(null);
  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string>('');

  const {data, refetch, isRefetching, isFetchingNextPage, isLoading} =
    useInfiniteQuery({
      queryKey: ['listTrip'],
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

  const handleNavigateToAddScreen = () => {
    navigation.push(ScreenNames.CreateSchedule);
  };

  const handleArchiveTrip = async () => {
    setModalVisible(false);
    dispatch(setLoading(true));
    try {
      const result = await TripApi.archiveTrip(selectedTripId);

      if (result) {
        ShowMessage(translate('scheduleList.archiveSuccess'), 'success');
        refetch();
      }
    } catch (error) {
      ShowMessage(translate('util.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteTrip = async (id: string) => {
    setModalVisible(false);
    dispatch(setLoading(true));
    try {
      const result = await TripApi.deleteTrip(selectedTripId);

      if (result) {
        ShowMessage(translate('scheduleList.deleteSuccess'), 'success');
        refetch();
      }
    } catch (error) {
      ShowMessage(translate('util.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useQueryFocus(refetch, 500);

  //@ts-expect-error
  const dataList = convertQueryDataToList<ITrip>(data);

  return {
    handleScroll,
    showButtonTitle,
    handleNavigateToAddScreen,
    //@ts-ignore
    data: dataList,
    refetch,
    isRefetching,
    isFetchingNextPage,
    isLoading,
    settingModalRef,
    modalVisible,
    setModalVisible,
    handleDeleteTrip,
    handleArchiveTrip,
    selectedTripId,
    setSelectedTripId,
  };
}
