import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const patternSlice = createSlice({
  name: "patterns",
  initialState,
  reducers: {
    addAllPatterns: (state, action) => {
      state.value = action.payload;
    },
    addPattern: (state, action) => {
      state.value.push(action.payload);
    },
    updatePattern: (state, action) => {
      state.value = state.value.map((pattern) => {
        if (pattern.id === action.payload.id) {
          return {
            ...pattern,
            ...action.payload,
          };
        } else {
          return {
            ...pattern
          };
        }
      });
    },
    deletePattern: (state, action) => {
      state.value = state.value.filter((pattern) => {
        return pattern.id !== action.payload;
      });
    },
    patternsDefaultState: (state) => {
      state = initialState;
    }
  },
});

export const {
  addAllPatterns,
  addPattern,
  updatePattern,
  deletePattern,
  patternsDefaultState,
} = patternSlice.actions;

export default patternSlice.reducer;
