import {BottomSheetModalRef} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModalProvider/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ref} from 'react';

interface IAddInformation {
  tripId: string;
  tripDayId: string;
  position: number;
  tripName?: string;
  tripDayString?: string;
}

interface ImageViewing {
  images: {uri: string}[];
  currentIndex: number;
  visible: boolean;
}

interface FeatureState {
  pickedProvinceId: string; //To add a destination page
  pickedDestinationId: string; //To create review
  pickedAddInformation?: IAddInformation;
  hideSelectTripRef?: Function;
  refetchProvinceList?: Function;
  imageViewing?: ImageViewing;
}

const initialState: FeatureState = {
  pickedProvinceId: '',
  pickedDestinationId: '',
};

export const featureSlice = createSlice({
  name: 'feature',
  initialState: initialState,
  reducers: {
    setPickedProvinceId: (state, action: PayloadAction<string>) => {
      state.pickedProvinceId = action.payload;
    },
    resetPickedProvinceId: state => {
      state.pickedProvinceId = '';
    },
    setPickedDestinationId: (state, action: PayloadAction<string>) => {
      state.pickedProvinceId = action.payload;
    },
    resetPickedDestinationId: state => {
      state.pickedProvinceId = '';
    },
    setPickedInformation: (state, action: PayloadAction<IAddInformation>) => {
      state.pickedAddInformation = action.payload;
    },
    resetPickedAddInformation: state => {
      state.pickedAddInformation = undefined;
    },
    setRefetchProvinceList: (state, action: PayloadAction<Function>) => {
      state.refetchProvinceList = action.payload;
    },
    resetRefetchProvinceList: state => {
      state.refetchProvinceList = undefined;
    },
    setImageViewing: (state, action: PayloadAction<ImageViewing>) => {
      state.imageViewing = action.payload;
    },
    setImageViewingList: (state, action: PayloadAction<string[]>) => {
      state.imageViewing = {
        currentIndex: 0,
        visible: false,
        ...state,
        images: action.payload.map(item => {
          return {
            uri: item,
          };
        }),
      };
    },
    setImageViewingIndex: (state, action: PayloadAction<number>) => {
      state.imageViewing = {
        images: [],
        visible: false,
        ...state,
        currentIndex: action.payload,
      };
    },
    setImageViewingVisible: (state, action: PayloadAction<boolean>) => {
      state.imageViewing = {
        images: [],
        currentIndex: 0,
        ...state,
        visible: action.payload,
      };
    },
    resetImageViewing: state => {
      state.imageViewing = undefined;
    },
  },
});

export const {
  setPickedProvinceId,
  resetPickedProvinceId,
  setPickedInformation,
  resetPickedAddInformation,
  setPickedDestinationId,
  resetPickedDestinationId,
  setRefetchProvinceList,
  resetRefetchProvinceList,
  setImageViewing,
  setImageViewingList,
  setImageViewingIndex,
  setImageViewingVisible,
  resetImageViewing,
} = featureSlice.actions;

export default featureSlice.reducer;
