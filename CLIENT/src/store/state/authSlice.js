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
    updateUser: (state, action) => {
      state.value = state.value.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        } else {
          return {
            ...user
          };
        }
      });
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => {
        return user.id !== action.payload;
      });
    },
    defaultState: (state) => {
      state = initialState;
    }
  },
});

export const { setUser, 
               addUser,
               updateUser,
               deleteUser, 
               defaultState, 
              } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentMember = (state) => state.auth;