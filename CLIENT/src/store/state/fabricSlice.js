import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: [],
};

export const fabricSlice = createSlice({
    name: 'fabrics',
    initialState,
    reducers : {
        addAllFabrics: (state, action) => {
            console.log('coucou dans addFabric' );
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
            console.log('coucou dans deleteFabric' );
            state.value = state.value.filter((fabric) => {
                console.log(fabric.id, action.payload, 'fabricid / actionpayload')
               return fabric.id !== action.payload;
        
                
            });
            console.log(state.value, 'state value')
        }
    }
});

export const {addAllFabrics, addFabric, updateFabric, deleteFabric} = fabricSlice.actions;


export default fabricSlice.reducer;
