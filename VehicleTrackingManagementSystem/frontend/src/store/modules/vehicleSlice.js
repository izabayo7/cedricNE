import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: {docs:[]},
  isVehiclesLoaded: false,
};

export const AuthSlice = createSlice({
  name: "Vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
      state.isVehiclesLoaded = true;
    },
    addVehicle: (state, action) => {
      state.vehicles.docs = [...state.vehicles.docs, action.payload];
    },
    updateVehicle: (state, action) => {
      for (const i in state.vehicles.docs) {
        if (state.vehicles.docs[i]._id === action.payload._id) {
          state.vehicles.docs[i] = action.payload;
        }
      }
    },
    removeVehicle: (state, action) => {
      state.vehicles.docs = state.vehicles.docs.filter((vehicle) => vehicle._id !== action.payload);
    },
  },
});

export const { setVehicles, addVehicle, removeVehicle,updateVehicle } = AuthSlice.actions;

export const selectVehicles = (state) => state.vehicle.vehicles.docs;
export const isVehiclesLoaded = (state) => states.vehicle.isVehiclesLoaded;

export default AuthSlice.reducer;
