import Axios from 'axios';
import Configs from '@Configs/index';
import {IResponse, LoginResponseData} from '@Types/index';

const AUTH_API = `${Configs.API_URL}/auth`;

export const googleLogin = async (token: string) => {
  const res = await Axios.post<IResponse<LoginResponseData>>(
    `${AUTH_API}/login`,
    {
      token,
    },
  );

  return res.data;
};

export const getOTP = async (phoneNumber: string) => {
  const res = await Axios.post<IResponse<any>>(
    `${AUTH_API}/registration_queue`,
    {
      phoneNumber,
    },
  );

  return res.data;
};

export const verifyOTP = async (phoneNumber: string, code: string) => {
  const res = await Axios.post<IResponse<LoginResponseData>>(
    `${AUTH_API}/login_phone`,
    {
      phoneNumber,
      code,
    },
  );

  return res.data;
};

export default {
  googleLogin,
  getOTP,
  verifyOTP,
};
