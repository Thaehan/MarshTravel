import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
  value: boolean;
  localLoading: boolean;
}

const initialState: LoadingState = {
  value: false,
  localLoading: false,
};

export const setLoadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    setLocalLoading: (state, action: PayloadAction<boolean>) => {
      state.localLoading = action.payload;
    },
  },
});

export const {setLoading, setLocalLoading} = setLoadingSlice.actions;

export default setLoadingSlice.reducer;
