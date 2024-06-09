import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configs from '@Configs/index';
import {IResponse, ITripDay} from '@Types/index';

const TRIP_DAY_URL = `${Configs.API_URL}/trip/day`;

export const getDetailTripDay = async ({
  tripId,
  tripDayId,
}: {
  tripId: string;
  tripDayId: string;
}) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const res = await Axios.get<IResponse<ITripDay>>(
    `${TRIP_DAY_URL}?tripId=${tripId}&tripDayId=${tripDayId}&language=${systemObject.language}`,
  );

  return res.data;
};

export const createTripDay = async (data: {
  tripId: string;
  position: number;
  startOffsetFromMidnight: number;
}) => {
  const res = await Axios.post<IResponse<any>>(`${TRIP_DAY_URL}/create`, data);

  return res;
};

export const updateTripDayDetail = async (data: {
  tripId: string;
  tripDayId: string;
  startOffsetFromMidnight: string;
}) => {
  const res = await Axios.put<IResponse<any>>(`${TRIP_DAY_URL}/update`, data);

  return res.data;
};

export const updateTripDayPosition = async (data: {
  tripId: string;
  position: number[];
}) => {
  const res = await Axios.put<IResponse<any>>(`${TRIP_DAY_URL}/position`, data);

  return res.data;
};

export const deleteTripDay = async (data: {
  tripId: string;
  tripDayId: string;
}) => {
  const res = await Axios.delete<IResponse<any>>(`${TRIP_DAY_URL}/delete`, {
    data: data,
  });

  return res.data;
};
export const getTripDayMatrix = async (data: {
  tripId: string;
  tripDayId: string;
}) => {
  const {tripId, tripDayId} = data;
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const res = await Axios.get<
    IResponse<
      {
        origin_place_id: string;
        destination_place_id: string;
        distance?: number; // meters
        duration?: number; // seconds
        status: string;
      }[]
    >
  >(
    `${TRIP_DAY_URL}/matrix?tripId=${tripId}&tripDayId=${tripDayId}&language=${systemObject.language}`,
  );

  return res.data;
};

export const getOptimizeTripDay = async (data: {
  tripId: string;
  tripDayId: string;
}) => {
  const {tripId, tripDayId} = data;
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const res = await Axios.get<IResponse<{positions: Array<Number>}>>(
    `${TRIP_DAY_URL}/optimize?tripId=${tripId}&tripDayId=${tripDayId}&language=${systemObject.language}`,
  );

  return res.data;
};

export default {
  getDetailTripDay,
  createTripDay,
  updateTripDayDetail,
  updateTripDayPosition,
  deleteTripDay,
  getOptimizeTripDay,
  getTripDayMatrix,
};
