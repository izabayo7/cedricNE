import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleCarOwnerCarOwners: {docs:[]},
  isVehicleCarOwnersLoaded: false,
};

export const AuthSlice = createSlice({
  name: "VehicleCarOwners",
  initialState,
  reducers: {
    setVehicleCarOwners: (state, action) => {
      state.vehicleCarOwnerCarOwners = action.payload;
      state.isVehicleCarOwnersLoaded = true;
    },
    addVehicleCarOwner: (state, action) => {
      state.vehicleCarOwnerCarOwners.docs = [...state.vehicleCarOwnerCarOwners.docs, action.payload];
    },
    updateVehicleCarOwner: (state, action) => {
      for (const i in state.vehicleCarOwnerCarOwners.docs) {
        if (state.vehicleCarOwnerCarOwners.docs[i]._id === action.payload._id) {
          state.vehicleCarOwnerCarOwners.docs[i] = action.payload;
        }
      }
    },
    removeVehicleCarOwner: (state, action) => {
      state.vehicleCarOwnerCarOwners.docs = state.vehicleCarOwnerCarOwners.docs.filter((vehicleCarOwner) => vehicleCarOwner._id !== action.payload);
    },
  },
});

export const { setVehicleCarOwners, addVehicleCarOwner, removeVehicleCarOwner,updateVehicleCarOwner } = AuthSlice.actions;

export const selectVehicleCarOwners = (state) => state.vehicleCarOwner.vehicleCarOwnerCarOwners.docs;
export const isVehicleCarOwnersLoaded = (state) => states.vehicleCarOwner.isVehicleCarOwnersLoaded;

export default AuthSlice.reducer;
