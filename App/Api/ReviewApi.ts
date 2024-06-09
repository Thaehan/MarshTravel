import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configs from '@Configs/index';
import {
  Comment,
  IPaginationData,
  IResponse,
  Review,
  SavedReview,
} from '@Types/index';

const REVIEW_API = `${Configs.API_URL}/review`;

type SortType = 'DATE_NEWEST' | 'DATE_OLDEST' | 'RATE_HIGHEST' | 'RATE_LOWEST';

type ReviewUpdateData = {
  reviewId?: string;
  title?: string;
  description?: string;
  rating?: number;
};

export const createReview = async (data: FormData) => {
  const result = await Axios.post<IResponse<{message?: string}>>(
    `${REVIEW_API}/create`,
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return result.data;
};

export const getReviewDetail = async (id: string) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const result = await Axios.get<IResponse<Review>>(
    `${REVIEW_API}?reviewId=${id}&language=${systemObject.language}`,
  );
  return result.data;
};

export const getReviewsByPlaceId = async ({
  id,
  page,
  sortBy,
  limit,
}: {
  id: string;
  page: number;
  sortBy?: SortType;
  limit?: number;
}) => {
  const result = await Axios.get<IResponse<IPaginationData<Review>>>(
    `${REVIEW_API}/multiple/p?place_id=${id}&page=${page}&limit=${
      limit ?? 10
    }&sortBy=${sortBy ?? 'DATE_NEWEST'}`,
  );

  return result.data;
};

export const getReviewsByUserId = async ({
  id,
  page,
  sortBy,
  limit,
}: {
  id: string;
  page: number;
  sortBy?: SortType;
  limit?: number;
}) => {
  const result = await Axios.get<IResponse<IPaginationData<Review>>>(
    `${REVIEW_API}/multiple/u?userId=${id}&page=${page}&limit=${
      limit ?? 10
    }&sortBy=${sortBy ?? 'DATE_NEWEST'}`,
  );

  return result.data;
};

export const getSavedReview = async ({
  page,
  limit,
}: {
  page: number;
  limit?: number;
}) => {
  const result = await Axios.get<IResponse<IPaginationData<SavedReview>>>(
    `${REVIEW_API}/saved?page=${page}&limit=${limit ?? 10}`,
  );

  return result.data;
};

export const updateReview = async (data: ReviewUpdateData) => {
  const result = await Axios.put<IResponse<any>>(`${REVIEW_API}/update`, data);

  return result.data;
};

export const likeReview = async (id: string, like: boolean) => {
  const result = await Axios.put<IResponse<any>>(`${REVIEW_API}/react`, {
    reviewId: id,
    like,
  });

  return result.data;
};

export const deleteReview = async (id: string) => {
  const result = await Axios.delete<IResponse<any>>(
    `${REVIEW_API}/delete?reviewId=${id}`,
  );

  return result.data;
};

export const createComment = async (data: {
  reviewId: string;
  content: string;
}) => {
  const result = await Axios.post<IResponse<any>>(
    `${REVIEW_API}/comment/create`,
    data,
  );

  return result.data;
};

export const getCommentsByReview = async ({
  reviewId,
  page,
  sortBy,
  limit,
}: {
  reviewId: string;
  page: number;
  sortBy?: SortType;
  limit?: number;
}) => {
  const result = await Axios.get<IResponse<IPaginationData<Comment>>>(
    `${REVIEW_API}/comment/multiple/r?reviewId=${reviewId}&page=${page}&limit=${
      limit ?? 10
    }&sortBy=${sortBy ?? 'DATE_NEWEST'}`,
  );

  return result.data;
};

export const updateComment = async (data: {id: string; content: string}) => {
  const result = await Axios.put<IResponse<any>>(
    `${REVIEW_API}/comment/update`,
    data,
  );

  return result.data;
};

export const reactComment = async (id: string, like: boolean) => {
  const result = await Axios.put<IResponse<any>>(
    `${REVIEW_API}/comment/react`,
    {
      commentId: id,
      like,
    },
  );

  return result.data;
};

export const deleteComment = async (id: string) => {
  const result = await Axios.delete<IResponse<any>>(
    `${REVIEW_API}/comment/delete?commentId=${id}`,
  );

  return result.data;
};

export const saveReview = async (id: string, save: boolean) => {
  const result = await Axios.post<IResponse<any>>(`${REVIEW_API}/save`, {
    reviewId: id,
    save,
  });

  return result.data;
};

export const getReviewsOnFeed = async ({
  page,
  sortBy,
  limit,
}: {
  page: number;
  sortBy?: SortType;
  limit?: number;
}) => {
  const result = await Axios.get<IResponse<IPaginationData<Review>>>(
    `${REVIEW_API}/multiple/f?page=${page}&limit=${limit ?? 10}&sortBy=${
      sortBy ?? 'DATE_NEWEST'
    }`,
  );

  return result.data;
};

export default {
  createReview,
  getReviewDetail,
  getReviewsByUserId,
  getReviewsByPlaceId,
  updateReview,
  likeReview,
  deleteReview,
  createComment,
  getCommentsByReview,
  updateComment,
  deleteComment,
  reactComment,
  saveReview,
  getSavedReview,
  getReviewsOnFeed,
};
