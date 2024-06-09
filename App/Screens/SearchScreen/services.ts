import {useInfiniteQuery} from 'react-query';

import DestinationApi from '@Api/DestinationApi';
import {useEffect, useRef, useState} from 'react';
import {convertQueryDataToList} from '@Utils/index';
import useQueryFocus from '@Hooks/queryFocus';

export default function useSearchScreen() {
  const typingRef = useRef<boolean>(false);
  const searchTimeoutRef = useRef<any>();
  const [searchText, setSearchText] = useState<string>('');

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchData'],
    queryFn: async ({pageParam}) => {
      if (!searchText.length) {
        return {};
      }
      try {
        const result = await DestinationApi.searchDestination(
          searchText,
          pageParam?.nextPageToken,
        );

        return {
          list: result.data?.destinations,
          nextPageToken: result.data?.nextPageToken,
        };
      } catch (error) {
        console.error(error);
        return {};
      }
    },
    getNextPageParam: lastPage => {
      console.log('lastPage', lastPage.nextPageToken);
      return lastPage?.nextPageToken;
    },
    cacheTime: 0,
  });

  useEffect(() => {
    typingRef.current = true;
    searchTimeoutRef.current = setTimeout(() => {
      refetch();
      typingRef.current = false;
    }, 800);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText]);

  useQueryFocus(refetch);

  // @ts-expect-error
  const dataList = convertQueryDataToList<Destination>(data);

  return {
    searchText,
    setSearchText,
    data: dataList,
    isLoading,
    isRefetching,
    refetch,
    isFetching,
    isFetchingNextPage,
    searchTimeoutRef,
    hasNextPage,
    fetchNextPage,
  };
}
