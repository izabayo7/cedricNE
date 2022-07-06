import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import axios from "axios";
import AppServices from "../../services";
import { useDispatch } from "react-redux";

const initialState = {
  user: { name: "test one two" },
  isLoggedIn: false,
};

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async () => {
    const token = localStorage.getItem("user");
    if(token){
      const bearer = JSON.parse(token || "{}");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${bearer?.token}`;

      let { data } = await AppServices.getCurrentUser();
      
      if(!data.data){
        localStorage.removeItem('user');
      }

      return data.data;
    }
  }
);

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = undefined;
      state.isLoggedIn = false;
    },
    setUser: (state,action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.user = {};
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        if(action.payload) state.isLoggedIn=true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = {};
      });
  },
});

export const { login, logout,setUser } = AuthSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default AuthSlice.reducer;
