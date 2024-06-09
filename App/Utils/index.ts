import axios from 'axios';
import moment from 'moment';
import {InfiniteData} from 'react-query';

import ShowMessage from './Message';
import ShadowBox from './ShadowBox';
import getStatusBarHeight from './StatusBar';
import Dimensions from './Dimensions';
import {fontSizes} from '@Themes/Fonts';
import Configs from '@Configs/index';
import {IPaginationData} from '@Types/index';

const setAxiosDefaultToken = (token: string) => {
  if (!token.length) {
    axios.defaults.headers.common['Authorization'] = undefined;
    return;
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getFontsize = (fontSize: string) => {
  switch (fontSize) {
    case 'sm':
      return fontSizes.sm;
    case 'md':
      return fontSizes.md;
    case 'lg':
      return fontSizes.lg;
    case 'xl':
      return fontSizes.xl;
    case 'xxl':
      return fontSizes.xxl;
    default:
      return fontSizes.xs;
  }
};

const formatFontWebview = (html?: string) => {
  return `<html><meta name="viewport" content="width=device-width, height=device-height, maximum-scale=1.0 , initial-scale=1.0, user-scalable=no, user-scalable=0"><head><style>
  body {
    font-family: Arial, sans-serif;
    font-size: 16;
    overflow-wrap: break-word;
    background-color: "#F1F1F1";
  }
  </style></head><body>${html}</body>
  <script>
  document.addEventListener("DOMContentLoaded", function(event) { 
    const height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    window.ReactNativeWebView.postMessage(height);
  });
  </script></html>`;
};

const textToHtml = (text: string) => {
  return `<p style='text-align: justify;'>${text}</p>`;
};

export const getCloser = (value: number, checkOne: number, checkTwo: number) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export const getGoogleMapImageUrl = (ref: string, maxWidth?: number) => {
  const result = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${
    maxWidth ?? 1024
  }&photoreference=${ref}&key=${Configs.GOOGLE_API_KEY}`;

  return result;
};

export const formatDate = (date: any) => {
  return moment(date).format('DD/MM/YYYY');
};

export const formatDateWithTime = (date: any) => {
  return moment(date).format('DD/MM/YYYY - HH:mm');
};

export const convertQueryDataToList = <T>(
  data: InfiniteData<IPaginationData<T>>,
) => {
  const tempArray: Array<Array<T>> = [];
  if (!data || !data.pages) {
    return [];
  }

  data.pages.forEach(item => {
    if (!item) {
      return;
    }
    if (item.list) tempArray.push(item.list);
  });

  const result: Array<T> = tempArray.flat();

  return result;
};

export const formatTimeInSecondsToMinutes = (timeInSeconds?: number) => {
  if (!timeInSeconds) {
    return 0;
  }
  const minutes: number = Math.ceil(timeInSeconds / 60);
  return `${minutes} phút`;
};

export const formatDistanceInMeters = (distanceInMeter?: number) => {
  if (!distanceInMeter) {
    return 0;
  }
  if (distanceInMeter < 1000) {
    return `${distanceInMeter} m`;
  } else {
    const kilometers: number = distanceInMeter / 1000;
    return `${kilometers.toFixed(1)} km`;
  }
};

export {
  ShowMessage,
  ShadowBox,
  getStatusBarHeight,
  Dimensions,
  getFontsize,
  setAxiosDefaultToken,
  formatFontWebview,
  textToHtml,
};
