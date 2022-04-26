import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
};

export const fabricSlice = createSlice({
    name: 'fabrics',
    initialState,
    reducers : {
        addAllFabrics: (state, action) => {
            state.value = action.payload;
        },
        addFabric: (state, action) => {
            state.value.push(action.payload);
        },
        updateFabric: (state, action) => {
            state.value.map((fabric) => {
                if (fabric.id === action.payload.id) {
                    return {
                        ...fabric,
                        ...action.payload    
                    }}
            });
        },
        deleteFabric: (state, action) => {
            state.value = state.value.filter((fabric) => {
                fabric.id !== action.payload.id
            });
        }
    }
});

export const {addAllFabrics, addFabric, updateFabric, deleteFabric} = fabricSlice.actions;


export default fabricSlice.reducer;
