import {useInfiniteQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {useRef, useState} from 'react';
import {FlatList} from 'react-native';

import ReviewApi from '@Api/ReviewApi';
import {Comment, Review} from '@Types/index';
import {ShowMessage, convertQueryDataToList} from '@Utils/index';
import {expandComment} from '@Store/Slices/ReviewUtilSlice';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {translate} from '@Languages/index';

export default function useCommentScreen(review: Review) {
  const dispatch = useDispatch();
  const commentListRef = useRef<FlatList>(null);

  const [commentText, setCommentText] = useState<string>('');

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: `listComment`,
    queryFn: async ({pageParam = 1}) => {
      const result = await ReviewApi.getCommentsByReview({
        reviewId: review.id,
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

  const handleComment = async () => {
    if (!commentText.length) {
      ShowMessage(translate('review.errorCommentNoContent'), 'danger');
      return;
    }
    dispatch(setLoading(true));
    try {
      const result = await ReviewApi.createComment({
        reviewId: review.id,
        content: commentText,
      });
      if (result) {
        setCommentText('');
        await refetch();
        ShowMessage(translate('review.successComment'), 'success');
        commentListRef.current?.scrollToEnd();
      }
    } catch (error) {
      console.error(error);
      ShowMessage(translate('review.errorComment'), 'success');
    } finally {
      dispatch(setLoading(false));
    }
  };

  //@ts-ignore-error
  const dataList = convertQueryDataToList<Comment>(data);

  return {
    isFetchingNextPage,
    isRefetching,
    isLoading,
    refetch,
    data: dataList,
    expandComment: () => dispatch(expandComment()),
    hasNextPage,
    fetchNextPage,
    commentText,
    setCommentText,
    handleComment,
    commentListRef,
  };
}
