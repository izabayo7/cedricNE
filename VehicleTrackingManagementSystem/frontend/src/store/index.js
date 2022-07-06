import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/authSlice';
import carOwnerReducer from './modules/carOwnerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carOwner: carOwnerReducer,
  },
})