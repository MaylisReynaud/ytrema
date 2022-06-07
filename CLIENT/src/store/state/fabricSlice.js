import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const fabricSlice = createSlice({
  name: "fabrics",
  initialState,
  reducers: {
    addAllFabrics: (state, action) => {
      state.value = action.payload;
    },
    addFabric: (state, action) => {
      state.value.push(action.payload);
    },
    updateFabric: (state, action) => {
      state.value = state.value.map((fabric) => {
        if (fabric.id === action.payload.id) {
          return {
            ...fabric,
            ...action.payload,
          };
        } else {
          return {
            ...fabric
          };
        }
      });
    },
    deleteFabric: (state, action) => {
      state.value = state.value.filter((fabric) => {
        return fabric.id !== action.payload;
      });
    },
  },
});

export const {
  addAllFabrics,
  addFabric,
  updateFabric,
  deleteFabric,
  defaultState,
} = fabricSlice.actions;

export default fabricSlice.reducer;
