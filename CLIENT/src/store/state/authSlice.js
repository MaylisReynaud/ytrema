import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    pseudo:null,
    memberToken: null,
    isLogged: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action) => {
      state.id = action.payload.id,
      state.pseudo = action.payload.pseudo,
      state.memberToken = action.payload.memberToken,
      state.isLogged = true
    },
  },
});

export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentMember = (state) => state.auth;