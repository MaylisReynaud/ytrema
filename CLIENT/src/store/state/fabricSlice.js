import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
};

export const fabricSlice = createSlice({
    name: 'fabrics',
    initialState,
    reducers : {
        addAllFabrics: (state, action) => {
            console.log('coucou dans addAllFabric' );
            state.value = action.payload;
        },
        addFabric: (state, action) => {
            console.log('coucou dans addfabric dans slice')
            // state.id = action.payload.id,
            // state.name = action.payload.name,
            // state.website = action.payload.website,
            // state.designer = action.payload.designer,
            // state.color = action.payload.color,
            // state.precise_color = action.payload.precise_color,
            // state.fabric = action.payload.fabric,
            // state.composition = action.payload.composition,
            // state.weight = action.payload.weight,
            // state.quantity = action.payload.quantity,
            // state.width = action.payload.width,
            // state.price = action.payload.price,
            // state.photo = action.payload.photo
            
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
                console.log(fabric.id, action.payload, 'fabricid / actionpayload')
               return fabric.id !== action.payload;  
            });
        }
    }
});

export const {addAllFabrics, addFabric, updateFabric, deleteFabric, defaultState } = fabricSlice.actions;


export default fabricSlice.reducer;
