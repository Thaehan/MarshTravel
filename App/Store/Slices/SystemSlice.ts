import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GeoPosition} from 'react-native-geolocation-service';

interface GeopositionExt extends GeoPosition {
  locationName?: string;
}

interface SystemState {
  language: string;
  showIntro: boolean;
  deviceToken: string;
  mode: 'online' | 'offline';
  location: GeopositionExt | null;
}

const initialState: SystemState = {
  language: 'vi',
  showIntro: true,
  deviceToken: '',
  mode: 'online',
  location: null,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    setSystem: (state, action: PayloadAction<SystemState>) => {
      state.language = action.payload.language;
      state.showIntro = action.payload.showIntro;
      state.deviceToken = action.payload.deviceToken;
    },
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload;
    },
    setMode: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.mode = action.payload;
    },
    setLocation: (state, action: PayloadAction<GeopositionExt>) => {
      state.location = action.payload;
    },
    resetLocation: (state, action: any) => {
      state.location = null;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'vi'>) => {
      state.language = action.payload;
    },
    setShowIntro: (state, action: PayloadAction<boolean>) => {
      state.showIntro = action.payload;
    },
  },
});

export const {
  setSystem,
  setDeviceToken,
  setMode,
  setLocation,
  resetLocation,
  setLanguage,
  setShowIntro
} = systemSlice.actions;

export default systemSlice.reducer;
