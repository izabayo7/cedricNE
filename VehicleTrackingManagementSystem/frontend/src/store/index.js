import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/authSlice';
import carOwnerReducer from './modules/carOwnerSlice';
import vehicleReducer from './modules/vehicleSlice';
import vehicleCarOwnerReducer from './modules/vehicleCarOwnerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carOwner: carOwnerReducer,
    vehicle: vehicleReducer,
    vehicleCarOwner: vehicleCarOwnerReducer,
  },
})