import Axios from 'axios';

import Configs from '@Configs/index';
import {IResponse} from '@Types/index';

const TRIP_DESTINATION_URL = `${Configs.API_URL}/trip/destination`;

export const createTripDestination = async (data: {
  tripId: string;
  tripDayId: string;
  position: number;
  place_id: string;
  type: 'destination' | 'rest';
}) => {
  const res = await Axios.post<IResponse<any>>(
    `${TRIP_DESTINATION_URL}/create`,
    data,
  );

  return res;
};

export const updateTripDestinationPosition = async (data: {
  tripId: string;
  tripDayId: string;
  positions: number[];
}) => {
  const res = await Axios.put<IResponse<any>>(
    `${TRIP_DESTINATION_URL}/position`,
    data,
  );

  return res.data;
};

export const deleteTripDestination = async (data: {
  tripId: string;
  tripDayId: string;
  tripDestinationId: string;
}) => {
  const res = await Axios.delete<IResponse<any>>(
    `${TRIP_DESTINATION_URL}/delete`,
    {
      data: data,
    },
  );

  return res.data;
};

export default {
  createTripDestination,
  updateTripDestinationPosition,
  deleteTripDestination,
};
