import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import axios from "axios";

const initialState = {
  user: {name: "test one two"},
  isLoggedIn: false,
};

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
    loadUser: (state) => {
      const token = localStorage.getItem("user");
      const bearer = JSON.parse(token || "{}");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${bearer?.accessToken}`;
      if (token) {
        try {
          let obj = jwt(token);
          if (obj.exp){
            if (new Date() < new Date(obj.exp * 1000)) {
              state.user = obj;
              state.isLoggedIn = true;
            }
          } else {
            localStorage.removeItem('user')
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});

export const { login, logout, loadUser } = AuthSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAdmin = (state) => state.auth.user?.isAdmin;

export default AuthSlice.reducer;
