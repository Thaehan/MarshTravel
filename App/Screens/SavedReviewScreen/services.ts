import ReviewApi from '@Api/ReviewApi';
import useQueryFocus from '@Hooks/queryFocus';
import {SavedReview} from '@Types/index';
import {convertQueryDataToList} from '@Utils/index';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInfiniteQuery} from 'react-query';

export default function useSavedReviewScreen(nav: NativeStackScreenProps<any>) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: `listSavedReviews`,
    queryFn: async ({pageParam = 1}) => {
      const result = await ReviewApi.getSavedReview(pageParam);

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
    cacheTime: 0,
  });

  const loadmore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  //@ts-expect-error
  const dataList = convertQueryDataToList<SavedReview>(data);

  useQueryFocus(refetch);

  return {
    data: dataList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
    loadmore,
  };
}
