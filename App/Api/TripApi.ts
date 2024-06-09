import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configs from '@Configs/index';
import {
  ICreateTripObject,
  IPaginationData,
  IResponse,
  ITrip,
  IUserInformation,
} from '@Types/index';

const TRIP_URL = `${Configs.API_URL}/trip`;

export const getListTrip = async (page: number, limit?: number) => {
  const res = await Axios.get<IResponse<IPaginationData<ITrip>>>(
    `${TRIP_URL}/all?page=${page}&limit=${limit ?? 10}`,
  );

  return res.data;
};

export const getDetailTrip = async (id: string) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);
  const res = await Axios.get<IResponse<ITrip>>(
    `${TRIP_URL}?tripId=${id}&dayPositionWithDetails=0&language=${systemObject.language}&getFirstDestinationName=true`,
  );

  return res;
};

export const createTrip = async (data: ICreateTripObject) => {
  const res = await Axios.post<IResponse<IUserInformation>>(
    `${TRIP_URL}/create`,
    data,
  );

  return res.data;
};

export const updateTripDetail = async (data: {
  tripId: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
}) => {
  const res = await Axios.put<IResponse<any>>(`${TRIP_URL}/update`, data);

  return res.data;
};

export const updateTripDayPosition = async (data: {
  tripId: string;
  positions: number[];
}) => {
  const res = await Axios.put<IResponse<any>>(`${TRIP_URL}/day/position`, data);

  return res.data;
};

export const updateTripDestinationPosition = async (data: {
  tripId: string;
  tripDayId: string;
  positions: number[];
}) => {
  const res = await Axios.put<IResponse<any>>(
    `${TRIP_URL}/destination/position`,
    data,
  );

  return res.data;
};

export const deleteTrip = async (id: string) => {
  const res = await Axios.delete<IResponse<any>>(
    `${TRIP_URL}/delete?tripId=${id}`,
  );

  return res.data;
};

export const archiveTrip = async (id: string) => {
  const res = await Axios.put<IResponse<any>>(
    `${TRIP_URL}/archive?tripId=${id}`,
  );

  return res.data;
};

export default {
  createTrip,
  getListTrip,
  getDetailTrip,
  updateTripDetail,
  updateTripDayPosition,
  updateTripDestinationPosition,
  archiveTrip,
  deleteTrip,
};
