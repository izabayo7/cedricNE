import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carOwners: {docs:[]},
  isCarOwnersLoaded: false,
};

export const AuthSlice = createSlice({
  name: "CarOwners",
  initialState,
  reducers: {
    setCarOwners: (state, action) => {
      state.carOwners = action.payload;
      state.isCarOwnersLoaded = true;
    },
    addCarOwner: (state, action) => {
      state.carOwners.docs = [...state.carOwners.docs, action.payload];
    },
    updateCarOwner: (state, action) => {
      for (const i in state.carOwners.docs) {
        if (state.carOwners.docs[i]._id === action.payload._id) {
          state.carOwners.docs[i] = action.payload;
        }
      }
    },
    removeCarOwner: (state, action) => {
      state.carOwners.docs = state.carOwners.docs.filter((carOwner) => carOwner._id !== action.payload);
    },
  },
});

export const { setCarOwners, addCarOwner, removeCarOwner,updateCarOwner } = AuthSlice.actions;

export const selectCarOwners = (state) => state.carOwner.carOwners.docs;
export const isCarOwnersLoaded = (state) => states.carOwner.isCarOwnersLoaded;

export default AuthSlice.reducer;
