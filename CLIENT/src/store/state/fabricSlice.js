import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
    // addFabricStatus: "",
    // addFabricError: "",
    // getFabricsStatus: "",
    // getFabricsError: "",
    // updateFabricStatus: "",
    // updateFabricError: "",
    // deleteFabricStatus: "",
    // deleteFabricError: "",
};

export const fabricSlice = createSlice({
    name: 'fabrics',
    initialState,
    reducers : {
        addAllFabrics: (state, action) => {
            state.value = action.payload;
        },
        getAllFabrics: (state) => {
            console.log(state.value, 'state.value : coucou dans getAllFabrics')
            return state.value
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

export const {addAllFabrics, addFabric, updateFabric, deleteFabric, getAllFabrics} = fabricSlice.actions;


export default fabricSlice.reducer;
