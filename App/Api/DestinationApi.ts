import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configs from '@Configs/index';
import {IDestination, IResponse} from '@Types/index';

const DESTINATION_URL = `${Configs.API_URL}/destination`;

export const searchDestination = async (
  text: string,
  nextpageToken?: string,
) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const result = await Axios.get<
    IResponse<{destinations: IDestination[]; nextPageToken: string}>
  >(
    `${DESTINATION_URL}/search/text?language=${
      systemObject.language
    }&query=${text}${nextpageToken ? `&nextPageToken=${nextpageToken}` : ''}`,
  );
  return result.data;
};

export const getDetailPlace = async (placeId: string) => {
  const root = await AsyncStorage.getItem('persist:root');
  const rootObject = JSON.parse(root ?? '');
  const systemObject = JSON.parse(rootObject.system);

  const result = await Axios.get<IResponse<IDestination>>(
    `${DESTINATION_URL}/get?language=${systemObject.language}&place_id=${placeId}`,
  );
  return result.data;
};

export default {
  searchDestination,
  getDetailPlace,
};
