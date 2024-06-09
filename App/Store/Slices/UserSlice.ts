import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUser, IToken, IUserInformation} from '@Types/index';

const initialState: IUser = {
  id: '',
  username: '',
  name: '',
  email: "",
  dateOfBirth: '',
  avatar: '',
  phoneNumber: '',
  accessToken: '',
  refreshToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.avatar = action.payload.avatar;
      state.phoneNumber = action.payload.phoneNumber;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserInformation: (state, action: PayloadAction<IUserInformation>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.avatar = action.payload.avatar;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setToken: (state, action: PayloadAction<IToken>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    resetUser: state => {
      state.id = "";
      state.username = "";
      state.name = "";
      state.email = "";
      state.dateOfBirth = "";
      state.avatar = "";
      state.phoneNumber = "";
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const {setUser, resetUser, setToken, setUserInformation} = userSlice.actions;
export default userSlice.reducer;
