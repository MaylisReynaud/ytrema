// Appel relatif à la connexion, ici tu dois recevoir un token
// import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem("token");

// Define a service using a base URL and expected endpoints
export const ytremaApi = createApi({
  reducerPath:'ytremaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    // prepareHeaders: (headers) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests      
    //     if (token) {
    //       headers.set('Authorization', `Bearer ${token}`)
    //       console.log(headers, 'headers dans login.js')
    //     }
    //     return headers;
    // },
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "post",
          body
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
  }),
  getAllFabrics: builder.query({
    query: (memberId) => {
      return {
        url: `/fabric/all/member/${memberId}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }
  }),
})
});

export const { useSigninUserMutation, useSignupUserMutation, useGetAllFabricsQuery } = ytremaApi;

