import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    pseudo:"",
    memberToken: "",
    isLogged: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { id, pseudo, memberToken } }
    ) => {
      state.id = id,
      state.pseudo = pseudo,
      state.memberToken = memberToken,
      state.isLogged = true
    },
  },
});

export const { setCredentials } = loginSlice.actions;

export default loginSlice.reducer;

export const selectCurrentMember = (state) => state.login.id;