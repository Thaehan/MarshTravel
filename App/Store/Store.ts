import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, PersistConfig, persistStore} from 'redux-persist';

import UserSlice from './Slices/UserSlice';
import LoadingSlice from './Slices/LoadingSlice';
import SystemSlice from './Slices/SystemSlice';
import FeatureSlice from './Slices/FeatureSlice';
import ReviewUtilSlice from './Slices/ReviewUtilSlice';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['loading', 'feature', 'reviewUtil'],
  whitelist: ['user', 'system'],
};

const combinedReducer = combineReducers({
  user: UserSlice,
  loading: LoadingSlice,
  system: SystemSlice,
  feature: FeatureSlice,
  reviewUtil: ReviewUtilSlice,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);

const typeStore = configureStore({reducer: combinedReducer});

export {store, persistor};
export type IRootState = ReturnType<typeof typeStore.getState>;
