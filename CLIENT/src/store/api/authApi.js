// Appel relatif à la connexion, ici tu dois recevoir un token
// import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath:'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
   
    // prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      
  //     console.log('on passe dans login.js');
  //     const token = getState().login.token;
      
  //       if (token) {
  //         headers.set('Authorization', `Bearer ${token}`)
  //         console.log(headers, 'headers dans login.js')
  //       }
  //       return headers;
  //   },
  // },  console.log('coucou dans login.js api')),
  // keepUnusedDataFor: 30,
  // tagTypes:['Login'],
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "post",
          body,
        };
      },
  }),
  signupUser: builder.mutation({
    query: (body) => {
      return {
        url: "/signup",
        method: "post",
        body,
      };
    },
  })
})
});

export const { useSigninUserMutation, useSignupUserMutation } = authApi;