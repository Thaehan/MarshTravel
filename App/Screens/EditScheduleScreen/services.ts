import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {translate} from '@Languages/index';
import {ITripDay, InfinityList} from '@Types/index';
import ShowMessage from '@Utils/Message';
import TripDayApi from '@Api/TripDayApi';
import TripApi from '@Api/TripApi';
import {setLoading} from '@Store/Slices/LoadingSlice';

export default function useEditScheudleScreen(
  nav: NativeStackScreenProps<any>,
) {
  const {navigation, route} = nav;
  const {name, days: listTripDay, id, description, startAt}: any = route.params;
  const dispatch = useDispatch();

  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);
  const [currentName, setCurrentName] = useState<string>(name ?? '');
  const [currentDescription, setCurrentDescription] = useState<string>(
    description ?? '',
  );
  const [currentListTripday, setCurrentListTripday] =
    useState<Array<ITripDay>>(listTripDay);

  const refetchCurrentList = async () => {
    const result = await TripApi.getDetailTrip(id);
    setCurrentListTripday(result.data?.data?.days ?? currentListTripday);
  };

  const onChangeCurrentName = (text: string) => {
    setCurrentName(text);
  };

  const onPressUpdate = async () => {
    console.log(id);
    dispatch(setLoading(true));
    try {
      // CallApi add and reload
      const result = await TripApi.updateTripDetail({
        tripId: id,
        name: currentName,
        description: currentDescription,
      });

      if (!result) {
        ShowMessage(translate('nav.errorNetwork'), 'danger');
        return;
      }

      let isUpdatePosition: boolean = false;
      let prevPosition: number;

      const positionArray: Array<number> = currentListTripday.map(
        (item: ITripDay) => {
          const position = item.position;
          if (prevPosition && prevPosition !== position - 1) {
            isUpdatePosition = true;
          }
          prevPosition = position;
          return position;
        },
      );

      if (!isUpdatePosition) {
        navigation.pop();
        ShowMessage(translate('nav.updateSuccess'), 'success');
        return;
      }

      const updatePositionResult = await TripApi.updateTripDayPosition({
        tripId: id,
        positions: positionArray,
      });
      console.log(updatePositionResult);

      if (updatePositionResult) {
        ShowMessage(translate('nav.updateSuccess'), 'success');
        navigation.pop();
      } else {
        ShowMessage(translate('nav.errorNetwork'), 'danger');
      }
    } catch (error) {
      console.error(error);
      ShowMessage(translate('nav.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPressDeleteTripDay = (item: ITripDay) => async () => {
    dispatch(setLoading(true));
    try {
      // CallApi add and reload
      const result = await TripDayApi.deleteTripDay({
        tripId: id,
        tripDayId: item.id,
      });
      if (result) {
        await refetchCurrentList();
        ShowMessage(translate('detailSchedule.addDaySuccess'), 'success');
      } else {
        ShowMessage(translate('nav.errorNetwork'), 'danger');
      }
    } catch (error) {
      ShowMessage(translate('nav.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPressAddTripDay = async () => {
    dispatch(setLoading(true));
    try {
      // CallApi add and reload
      const result = await TripDayApi.createTripDay({
        tripId: id,
        position: listTripDay.length,
        startOffsetFromMidnight: 92000,
      });
      if (result) {
        await refetchCurrentList();
        ShowMessage(translate('detailSchedule.addDaySuccess'), 'success');
      } else {
        ShowMessage(translate('nav.errorNetwork'), 'danger');
      }
    } catch (error) {
      ShowMessage(translate('nav.errorNetwork'), 'danger');
    } finally {
      dispatch(setLoading(false));
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

  return {
    currentName,
    setCurrentName,
    onChangeCurrentName,
    onPressUpdate,
    currentListTripday,
    setCurrentListTripday,
    onPressDeleteTripDay,
    onPressAddTripDay,
    handleScroll,
    showButtonTitle,
    currentDescription,
    setCurrentDescription,
    startAt,
  };
}
