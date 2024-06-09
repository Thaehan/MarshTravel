import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useInfiniteQuery, useQuery} from 'react-query';

import {Review} from '@Types/index';
import {IRootState} from '@Store/Store';
import {convertQueryDataToList} from '@Utils/index';
import {
  resetPickedAddInformation,
  setPickedProvinceId,
  setRefetchProvinceList,
} from '@Store/Slices/FeatureSlice';
import ReviewApi from '@Api/ReviewApi';
import useQueryFocus from '@Hooks/queryFocus';
import {setExpandComment} from '@Store/Slices/ReviewUtilSlice';
import ProvinceApi from '@Api/ProvinceApi';
import DestinationsOfProvinceScreen from '@Screens/DestinationsOfProvinceScreen';
import SearchScreen from '@Screens/SearchScreen';
import useExploreModal from '@Hooks/Modals/useExploreModal';

export default function useExplore(nav: NativeStackScreenProps<any>) {
  const dispatch = useDispatch();
  const {id: userId} = useSelector((state: IRootState) => state.user);

  const {
    data: listProvince,
    isFetching: fetchingProvince,
    refetch: refetchProvince,
    isRefetching: isRefetchingProvince,
    isLoading: isLoadingProvince,
  } = useQuery({
    queryKey: 'listProvince',
    queryFn: async () => {
      const result = await ProvinceApi.getSuggestedProvinceList();

      return result.data;
    },
  });

  const {
    data: listReview,
    isFetchingNextPage: fetchingReview,
    refetch: refetchReview,
    isRefetching: isRefetchingReview,
    isLoading: isLoadingReview,
    fetchNextPage: fetchNextPageReviews,
    hasNextPage: hasNextPageReviews,
  } = useInfiniteQuery({
    queryKey: 'listReviewInExplore',
    queryFn: async ({pageParam = 1}) => {
      const result = await ReviewApi.getReviewsOnFeed({page: pageParam});
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

  const commentBottomSheet = useRef<BottomSheetModal>(null);
  const {close, present, ref: provinceBottomSheet} = useExploreModal();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const [showSearchBar, setShowSearchBar] = useState(true);

  const searchOffset = useRef(new Animated.Value(0));

  const loadmoreReviews = () => {
    console.log('loadmore');
    if (hasNextPageReviews) {
      fetchNextPageReviews();
    }
  };

  const handleSearchPress = () => {
    dispatch(resetPickedAddInformation());
    present(SearchScreen);
  };

  const handleProvincePress = (province: string) => {
    dispatch(setPickedProvinceId(province));
    present(DestinationsOfProvinceScreen);
  };

  const handleCloseProvinceModal = () => {
    close();
  };

  const handleOpenComments = (review: Review) => {
    commentBottomSheet.current?.present(review);
  };

  useEffect(() => {
    const timeOut = setTimeout(async () => {}, 600);

    return () => clearTimeout(timeOut);
  }, [searchText]);

  useEffect(() => {
    dispatch(
      setExpandComment(() => {
        commentBottomSheet.current?.expand();
      }),
    );
  }, [commentBottomSheet]);

  useEffect(() => {
    dispatch(setRefetchProvinceList(refetchProvince));
  }, [refetchProvince]);

  useQueryFocus(refetchProvince);
  useQueryFocus(refetchReview);

  //@ts-expect-error
  const listReviewData = convertQueryDataToList<Review>(listReview);

  return {
    isSearching,
    setIsSearching,
    searchText,
    setSearchText,
    showSearchBar,
    searchOffset,
    commentBottomSheet,
    provinceBottomSheet,
    handleProvincePress,
    handleCloseProvinceModal,
    fetchingProvince,
    fetchingReview,
    //@ts-ignore
    listReview: listReviewData,
    listProvince,
    isRefetchingProvince,
    isRefetchingReview,
    isLoadingProvince,
    isLoadingReview,
    refetchProvince,
    refetchReview,
    handleOpenComments,
    loadmoreReviews,
    hasNextPageReviews,
    handleSearchPress,
    fetchNextPageReviews,
  };
}
