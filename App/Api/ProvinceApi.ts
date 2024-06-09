import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configs from '@Configs/index';
import {
  IProvinceSuggestResponse,
  IResponse,
  Province,
} from '@Types/index';

const ADM_PROVINCE_API = `${Configs.API_URL}/adm`;
const EXP_PROVINCE_API = `${Configs.API_URL}/explorer`;

const getProvinceList = async () => {
  const result = await Axios.get<IResponse<Province[]>>(
    `${ADM_PROVINCE_API}/province`,
  );

  return result.data;
};

const getSuggestedProvinceList = async () => {
  const result = await Axios.get<IResponse<Province[]>>(
    `${ADM_PROVINCE_API}/province/suggests`,
  );

  return result.data;
};

const setFollowProvince = async (data: {code: string; follow: boolean}) => {
  const result = await Axios.post<IResponse<any>>(
    `${ADM_PROVINCE_API}/province/follow`,
    data,
  );

  return result.data;
};

const getDestinationsByProvince = async (code: string) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const result = await Axios.get<IResponse<IProvinceSuggestResponse>>(
    `${EXP_PROVINCE_API}/province?language=${systemObject.language}&code=${code}`,
  );

  return result.data;
};

const getDesinationsByCurrentLocation = async (location: {
  lat: number;
  lng: number;
}) => {
  const {lat, lng} = location;
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const result = await Axios.get<IResponse<IProvinceSuggestResponse>>(
    `${EXP_PROVINCE_API}/current?language=${systemObject.language}&lat=${lat}&lon=${lng}`,
  );

  return result.data;
};

export default {
  getProvinceList,
  getSuggestedProvinceList,
  setFollowProvince,
  getDestinationsByProvince,
  getDesinationsByCurrentLocation,
};
