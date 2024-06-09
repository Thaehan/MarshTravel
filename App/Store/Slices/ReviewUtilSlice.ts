import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ReviewUtilState {
  expandComment: () => void;
}

const initialState: ReviewUtilState = {
  expandComment: () => {},
};

export const reviewUtilSlice = createSlice({
  name: 'reviewUtil',
  initialState: initialState,
  reducers: {
    setExpandComment: (state, action: PayloadAction<() => void>) => {
      state.expandComment = action.payload;
    },
    expandComment: (state, action: PayloadAction<undefined>) => {
      state.expandComment();
    },
  },
});

export const {setExpandComment, expandComment} = reviewUtilSlice.actions;

export default reviewUtilSlice.reducer;
