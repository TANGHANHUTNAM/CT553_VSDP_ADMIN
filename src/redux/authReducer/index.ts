import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuth = true;
    },
    loginFailed: (state) => {
      state.isAuth = initialState.isAuth;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.isAuth = initialState.isAuth;
    },
  },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
