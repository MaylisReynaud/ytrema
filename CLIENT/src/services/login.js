// Appel relatif à la connexion, ici tu dois recevoir un token
// import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const login = createApi({
  reducerPath:'login',
  baseQuery: fetchBaseQuery({
    baseUrl: { baseUrl: 'http://localhost:3000' },
   
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      
      console.log('on passe dans login.js');
      const token = getState().login.token;
      
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
          console.log(headers, 'headers dans login.js')
        }
        return headers
    },
  },  console.log('coucou dans login.js api')),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      },
      console.log(credentials, 'credentials dans login.js')),
      overrideExisting: false,
    })
  })
});

export const { useLoginMutation} = login;