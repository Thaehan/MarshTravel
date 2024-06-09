import {useInfiniteQuery, useQuery} from 'react-query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {FlatList} from 'react-native';

import ReviewApi from '@Api/ReviewApi';
import {ShowMessage, convertQueryDataToList} from '@Utils/index';
import {Comment} from '@Types/index';
import {translate} from '@Languages/index';
import {setLoading} from '@Store/Slices/LoadingSlice';
import {useRef, useState} from 'react';

const COMMENT_QUERY_KEY = 'commentInDetail';
const REVIEW_QUERY_KEY = 'reviewInDetail';

export default function useDetailReviewScreen(
  nav: NativeStackScreenProps<any>,
) {
  const {navigation, route} = nav;

  const dispatch = useDispatch();
  const commentListRef = useRef<FlatList>(null);
  const [commentText, setCommentText] = useState<string>('');

  const {data: reviewData, isLoading: isLoadingReview} = useQuery({
    queryKey: REVIEW_QUERY_KEY,
    queryFn: async () => {
      const result = await ReviewApi.getReviewDetail(route.params?.id);
      return result.data;
    },
  });

  const {
    data,
    hasNextPage: hasNextPageComment,
    isFetchingNextPage: isFetchingNextPageComment,
    refetch: refetchComment,
    isLoading: isLoadingComment,
    fetchNextPage: fetchNextPageComment,
  } = useInfiniteQuery({
    queryKey: COMMENT_QUERY_KEY,
    queryFn: async ({pageParam = 1}) => {
      const result = await ReviewApi.getCommentsByReview({
        reviewId: route.params?.id,
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

  const loadmoreComment = async () => {
    if (hasNextPageComment) {
      fetchNextPageComment();
    }
  };

  const handleComment = async () => {
    if (!commentText.length) {
      ShowMessage(translate('review.errorCommentNoContent'), 'danger');
      return;
    }
    dispatch(setLoading(true));
    try {
      const result = await ReviewApi.createComment({
        reviewId: route.params?.id,
        content: commentText,
      });
      if (result) {
        setCommentText('');
        await refetchComment();
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
  const commentDataList = convertQueryDataToList<Comment>(data);

  return {
    reviewData,
    isLoadingReview,
    commentsData: commentDataList,
    isFetchingNextPageComment,
    isLoadingComment,
    hasNextPageComment,
    handleComment,
    loadmoreComment,
    commentText,
    setCommentText,
  };
}
