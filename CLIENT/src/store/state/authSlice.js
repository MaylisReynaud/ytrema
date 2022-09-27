import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  pseudo: null,
  memberToken: null,
  isLogged: false,
  email: null,
  chest_measurement: null,
  waist_measurement: null,
  hip_measurement: null,
  role: null,
  avatar: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action) => {
      const userData = {
        ...state,
        ...action.payload,
      };
      userData.isLogged = true;
      console.log(userData,'userdata slice');
      return {
        ...userData
      }
    },
    addUser: (state, action) => {
      const newUserData = {
        ...state,
        ...action.payload,
      };
      return {
        ...newUserData
      }
    },
    defaultState: (state) => {
      state = initialState;
    }
  },
});

export const { setUser, 
               addUser,
               defaultState, 
              } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentMember = (state) => state.auth;
