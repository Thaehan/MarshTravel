import Axios from 'axios';
import Configs from '@Configs/index';
import {IResponse, IUserInformation} from '@Types/index';

const USER_URL = `${Configs.API_URL}/user`;

export const getUserInformation = async () => {
  const res = await Axios.get<IResponse<IUserInformation>>(
    `${USER_URL}/profile`,
    {},
  );

  return res.data;
};

export const updateAvatar = async (formData: FormData) => {
  const res = await Axios.put<IResponse<string>>(
    `${USER_URL}/avatar`,
    formData,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};

export const updateUserInformation = async (information: IUserInformation) => {
  const res = await Axios.put<IResponse<IUserInformation>>(
    `${USER_URL}/profile`,
    information,
  );

  return res.data;
};

export default {
  getUserInformation,
  updateUserInformation,
  updateAvatar,
};
