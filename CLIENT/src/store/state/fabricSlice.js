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
        addFabric: (state, {payload}) => {
            console.log('coucou dans addfabric dans slice')
            state.id = payload.id,
            state.name = payload.name,
            state.website = payload.website,
            state.designer = payload.designer,
            state.color = payload.color,
            state.precise_color = payload.precise_color,
            state.fabric = payload.fabric,
            state.composition = payload.composition,
            state.weight = payload.weight,
            state.quantity = payload.quantity,
            state.width = payload.width,
            state.price = payload.price,
            state.photo = payload.photo
            
            // state.value.push(action.payload);

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
