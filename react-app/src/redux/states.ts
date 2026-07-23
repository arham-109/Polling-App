import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLogin: null,
  isLoading: true,
};

export const stateSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    login: (state: any, action: any) => {
      state.user = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    logout: (state: any) => {
      state.user = null;
      state.isLogin = false;
      state.isLoading = false;
    },
    setLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = stateSlice.actions;

export default stateSlice.reducer;
