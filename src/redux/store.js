import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import sensorReducer from './sensorSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    sensors: sensorReducer,
  },
});