// // Fichier d'appel de base au back pour toutes les requêtes
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//     baseQuery: fetchBaseQuery({
//       baseUrl: { baseUrl: 'http://localhost:3000' },
//       prepareHeaders: (headers, { getState }) => {
//         // By default, if we have a token in the store, let's use that for authenticated requests
        
//         console.log('on passe dans api.js');
//         const token = getState().login.token;
        
//           if (token) {
//             headers.set('authorization', `Bearer ${token}`)
//             console.log(headers, 'headers dans api.js')
//           }
//           return headers
//       },
//     }),
//     endpoints: () => ({ }),
//       });
  
 