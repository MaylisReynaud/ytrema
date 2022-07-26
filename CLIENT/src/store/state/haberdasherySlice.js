import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const haberdasherySlice = createSlice({
  name: "haberdasheries",
  initialState,
  reducers: {
    addAllHaberdasheries: (state, action) => {
      state.value = action.payload;
    },
    addHaberdashery: (state, action) => {
      state.value.push(action.payload);
    },
    updateHaberdashery: (state, action) => {
      state.value = state.value.map((haberdashery) => {
        if (haberdashery.id === action.payload.id) {
          return {
            ...haberdashery,
            ...action.payload,
          };
        } else {
          return {
            ...haberdashery
          };
        }
      });
    },
    deleteHaberdashery: (state, action) => {
      state.value = state.value.filter((haberdashery) => {
        return haberdashery.id !== action.payload;
      });
    },
    haberdasheriesDefaultState: (state) => {
      state = initialState;
    }
  },
});

export const {
  addAllHaberdasheries,
  addHaberdashery,
  updateHaberdashery,
  deleteHaberdashery,
  haberdasheriesDefaultState,
} = haberdasherySlice.actions;

export default haberdasherySlice.reducer;
