import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {useInfiniteQuery, useQuery} from 'react-query';

import DestinationApi from '@Api/DestinationApi';
import ReviewApi from '@Api/ReviewApi';
import {ShowMessage, convertQueryDataToList} from '@Utils/index';
import {Review} from '@Types/index';
import {useEffect, useRef, useState} from 'react';
import {IRootState} from '@Store/Store';
import {
  resetImageViewing,
  resetPickedAddInformation,
} from '@Store/Slices/FeatureSlice';
import ScreenNames from '@Constants/ScreenNames';
import {Linking} from 'react-native';
import useQueryFocus from '@Hooks/queryFocus';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {setLoading} from '@Store/Slices/LoadingSlice';
import TripDestinationApi from '@Api/TripDestinationApi';
import {translate} from '@Languages/index';

const REVIEW_IN_DESTINATION_KEY = 'REVIEW_IN_DESTINATION_KEY';
const DESTINATION_DETAIL = 'DESTINATION_DETAIL';

export default function useDestinationDetail(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const {id}: any = route.params;

  const addBottomSheetRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();
  const pickedAddInformation = useSelector(
    (state: IRootState) => state.feature.pickedAddInformation,
  );
  const imageViewing = useSelector(
    (state: IRootState) => state.feature.imageViewing,
  );

  const [currentImageViewingOffset, setCurrentImageViewingOffset] =
    useState<number>(0);
  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);

  const {data, isFetching, isLoading, refetch, isRefetching} = useQuery({
    queryKey: [REVIEW_IN_DESTINATION_KEY],
    queryFn: async () => {
      try {
        const result = await DestinationApi.getDetailPlace(id);

        return result.data;
      } catch (error) {
        console.error(error);
      }
    },
    cacheTime: 0,
  });
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isFetchingNextPage: isFetchingNextPageReview,
    isRefetching: isRefetchingReviews,
    refetch: refetchReviews,
    isFetching: isFetchingReviews,
    hasNextPage: hasNextPageReviews,
    fetchNextPage: fetchNextPageReviews,
  } = useInfiniteQuery({
    queryKey: [DESTINATION_DETAIL],
    queryFn: async ({pageParam = 1}) => {
      try {
        const result = await ReviewApi.getReviewsByPlaceId({
          id,
          page: pageParam,
        });

        return result.data;
      } catch (error) {
        console.error(error);
      }
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
    cacheTime: 0,
  });

  const onPressWebsite = () => {
    if (data?.mapsFullDetails?.website) {
      Linking.openURL(data.mapsFullDetails?.website);
    }
  };

  const loadMoreReviews = () => {
    if (hasNextPageReviews) {
      fetchNextPageReviews();
    }
  };

  const closeImageViewing = () => {
    setCurrentImageViewingOffset(0);
    dispatch(resetImageViewing());
  };

  const changeImageViewingIndex = (index: number) => {
    setCurrentImageViewingOffset(index - (imageViewing?.currentIndex ?? 0));
  };

  const onPressDirect = () => {
    navigation.push(ScreenNames.MapView, data);
  };

  const onPressCreateReview = () => {
    navigation.navigate(ScreenNames.CreateReview, {id});
  };

  const onPressAddDestinationToSchedule = async () => {
    if (pickedAddInformation) {
      dispatch(setLoading(true));
      try {
        const creatData: {
          tripId: string;
          tripDayId: string;
          position: number;
          place_id: string;
          type: 'destination' | 'rest';
        } = {
          tripId: pickedAddInformation?.tripId,
          tripDayId: pickedAddInformation?.tripDayId,
          place_id: data?.place_id ?? 'ChIJp0o4Er6rNTERjlTif_IXU1k',
          position: pickedAddInformation?.position,
          type: 'destination',
        };
        const result = await TripDestinationApi.createTripDestination(
          creatData,
        );

        if (result) {
          ShowMessage(translate('destination.createSuccess'), 'success');
          navigation.goBack();
        }
      } catch (error) {
        ShowMessage(translate(`util.errorNetwork`), 'danger');
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
      return;
    }

    addBottomSheetRef.current?.present();
  };

  useEffect(() => {
    const onBlur = navigation.addListener('beforeRemove', () => {
      dispatch(resetPickedAddInformation());
    });

    return onBlur;
  }, [navigation]);

  useQueryFocus(refetch);
  useQueryFocus(refetchReviews);

  //@ts-ignore
  const standardReviews = convertQueryDataToList<Review>(reviews);

  return {
    data,
    isFetching,
    isLoading,
    isRefetching,
    isFetchingNextPageReview,
    isLoadingReviews,
    reviews: standardReviews,
    isRefetchingReviews,
    refetchReviews,
    isFetchingReviews,
    loadMoreReviews,
    imageViewing,
    closeImageViewing,
    changeImageViewingIndex,
    currentImageViewingOffset,
    pickedAddInformation,
    showButtonTitle,
    setShowButtonTitle,
    onPressDirect,
    onPressCreateReview,
    onPressWebsite,
    addBottomSheetRef,
    onPressAddDestinationToSchedule,
  };
}
