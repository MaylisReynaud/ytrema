import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // value: [
    //     {
    //         id: 1,
    //         image: 'http://react-responsive-carousel.js.org/assets/1.jpeg',
    //         alt: 'tissuthèque',
    //         name: 'Blue Soy',
    //         designer: 'Atelier Brunette',
    //         fabric: 'Viscose',
    //         color: 'Vert',
    //         size: '150 cm',
    //     },
    //     {
    //         id: 2,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'merceriethèque',
    //         name: 'Reminescence',
    //         designer: 'Gold',
    //         fabric: 'Batiste',
    //         color: 'Vert',
    //         size: '150 cm',
    //     },
    //     {
    //         id: 3,
    //         image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yellow',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Bords-côtes',
    //         color: 'Bleu',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 4,
    //         image: 'http://react-responsive-carousel.js.org/assets/6.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africa',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 5,
    //         image: 'http://react-responsive-carousel.js.org/assets/7.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yellow',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 6,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africa',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Batiste',
    //         color: 'Bleu',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 7,
    //         image: 'http://react-responsive-carousel.js.org/assets/1.jpeg',
    //         alt: 'tissuthèque',
    //         name: 'Rose bonbon',
    //         designer: 'Atelier Brunette',
    //         fabric: 'Viscose',
    //         color: 'Vert',
    //         size: '120 cm',
    //     },
    //     {
    //         id: 8,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'merceriethèque',
    //         name: 'Reminescence 2',
    //         designer: 'Gold',
    //         fabric: 'Batiste',
    //         color: 'Vert',
    //         size: '210 cm',
    //     },
    //     {
    //         id: 17,
    //         image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yellow blues',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Bords-côtes',
    //         color: 'Bleu',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 9,
    //         image: 'http://react-responsive-carousel.js.org/assets/6.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africa2',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 10,
    //         image: 'http://react-responsive-carousel.js.org/assets/7.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yellowez',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 11,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africaza',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Batiste',
    //         color: 'Bleu',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 12,
    //         image: 'http://react-responsive-carousel.js.org/assets/3.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yellow bluesze',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Bords-côtes',
    //         color: 'Bleu',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 13,
    //         image: 'http://react-responsive-carousel.js.org/assets/6.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africae2',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 14,
    //         image: 'http://react-responsive-carousel.js.org/assets/7.jpeg',
    //         alt: 'patronthèque',
    //         name: 'Yelloweez',
    //         designer: 'Eglantine & Zoé',
    //         fabric: 'Viscose',
    //         color: 'Jaune',
    //         size: '300 cm',
    //     },
    //     {
    //         id: 15,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africazzza',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Batiste',
    //         color: 'Bleu',
    //         size: '130 cm',
    //     },
    //     {
    //         id: 16,
    //         image: 'http://react-responsive-carousel.js.org/assets/2.jpeg',
    //         alt: 'projet couture digitalisé',
    //         name: 'Red Africzazzza',
    //         designer: 'Atelier Nomade',
    //         fabric: 'Batiste',
    //         color: 'Bleu',
    //         size: '130 cm',
    //     }
    // ]
    value: []
};

export const fabricSlice = createSlice({
    name: 'fabrics',
    initialState,
    reducers : {
        addAllFabrics: (state, action) => {
            state.value = action.payload;
        },
        getAllFabrics: (state) => {
            console.log('coucou dans getAllFabrics')
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
