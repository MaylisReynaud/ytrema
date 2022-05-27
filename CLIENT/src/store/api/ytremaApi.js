// Appel relatif à la connexion, ici tu dois recevoir un token
// import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem("token");

// Define a service using a base URL and expected endpoints
export const ytremaApi = createApi({
  reducerPath:'ytremaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Fabric'],
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
    },
    providesTags: ['Fabric'],
  }),
  addOneFabric: builder.mutation({
    query: (arg) =>{
      const {memberId, body} = arg;
      return {
        url: `/fabric/member/${memberId}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Fabric'],
  }),
  deleteOneFabric: builder.mutation({
    query: (arg) => {
      const {memberId, fabricId} = arg;
    return {
      url: `/fabric/${fabricId}/member/${memberId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Fabric'],
  })
  })
});

export const { useSigninUserMutation, useSignupUserMutation, useGetAllFabricsQuery, useAddOneFabricMutation, useDeleteOneFabricMutation } = ytremaApi;

