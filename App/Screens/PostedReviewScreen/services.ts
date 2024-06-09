import {useInfiniteQuery} from 'react-query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ReviewApi from '@Api/ReviewApi';
import {Review} from '@Types/index';
import {convertQueryDataToList} from '@Utils/index';
import {useSelector} from 'react-redux';
import {IRootState} from '@Store/Store';
import useQueryFocus from '@Hooks/queryFocus';

export default function usePostedReviewScreen(
  nav: NativeStackScreenProps<any>,
) {
  const currentUserId = useSelector((state: IRootState) => state.user.id);
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: `listPostedReviewScreen`,
    queryFn: async ({pageParam = 1}) => {
      const result = await ReviewApi.getReviewsByUserId({
        id: currentUserId,
        page: pageParam,
      });

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
  const dataList = convertQueryDataToList<Review>(data);

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
