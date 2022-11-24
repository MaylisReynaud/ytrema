// Appel relatif à la connexion, ici tu dois recevoir un token
// import { api } from './api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let token = sessionStorage.getItem("token");

// Define a service using a base URL and expected endpoints
export const ytremaApi = createApi({
  reducerPath:'ytremaApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://ytrema.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Fabric', 'Haberdashery', 'Pattern', 'Auth', 'Project'],
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "POST",
          body
        };
      },

  }),
  signupUser: builder.mutation({
    query: (body) => {
      return {
        url: "/signup",
        method: "POST",
        body,
      };
    },
  }),
  getAllFabrics: builder.query({
    query: (memberId) => {
      token = sessionStorage.getItem("token");
      return {
        url: `/fabric/all/member/${memberId}`,
        method: "GET",
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
        method: "POST",
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
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Fabric'],
  }),
  deleteAllFabrics: builder.mutation({
    query: (memberId) => {
    return {
      url: `/fabric/all/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Fabric'],
  }),
  updateOneFabric: builder.mutation({
    query: (arg) => {
      const {memberId, fabricId, body} = arg;
    return {
      url: `/fabric/${fabricId}/member/${memberId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Fabric'],
  }),
  getAllHaberdasheries: builder.query({
    query: (memberId) => {
      token = sessionStorage.getItem("token");
      return {
        url: `/haberdashery/all/member/${memberId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    },
    providesTags: ['Haberdashery'],
  }),
  addOneHaberdashery: builder.mutation({
    query: (arg) =>{
      const {memberId, body} = arg;
      return {
        url: `/haberdashery/member/${memberId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Haberdashery'],
  }),
  deleteOneHaberdashery: builder.mutation({
    query: (arg) => {
      const {memberId, haberdasheryId} = arg;
    return {
      url: `/haberdashery/${haberdasheryId}/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Haberdashery'],
  }),
  deleteAllHaberdasheries: builder.mutation({
    query: (memberId) => {
    return {
      url: `/haberdashery/all/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Haberdashery'],
  }),
  updateOneHaberdashery: builder.mutation({
    query: (arg) => {
      const {memberId, haberdasheryId, body} = arg;
    return {
      url: `/haberdashery/${haberdasheryId}/member/${memberId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Haberdashery'],
  }),
  getAllPatterns: builder.query({
    query: (memberId) => {
      token = sessionStorage.getItem("token");
      return {
        url: `/pattern/all/member/${memberId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    },
    providesTags: ['Pattern'],
  }),
  addOnePattern: builder.mutation({
    query: (arg) =>{
      const {memberId, body} = arg;
      return {
        url: `/pattern/member/${memberId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Pattern'],
  }),
  deleteOnePattern: builder.mutation({
    query: (arg) => {
      const {memberId, patternId} = arg;
    return {
      url: `/pattern/${patternId}/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Pattern'],
  }),
  deleteAllPatterns: builder.mutation({
    query: (memberId) => {
    return {
      url: `/pattern/all/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Pattern'],
  }),
  updateOnePattern: builder.mutation({
    query: (arg) => {
      const {memberId, patternId, body} = arg;
    return {
      url: `/pattern/${patternId}/member/${memberId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Pattern'],
  }),
  updateOneUser: builder.mutation({
    query: (arg) => {
      const {memberId, body} = arg;
    return {
      url: `/member/${memberId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Auth'],
  }),
  deleteOneUser: builder.mutation({
    query: (memberId) => {
    return {
      url: `/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Auth'],
  }),
  getAllProjects: builder.query({
    query: (memberId) => {
      token = sessionStorage.getItem("token");
      return {
        url: `/project/all/member/${memberId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    },
    providesTags: ['Project'],
  }),
  addOneProject: builder.mutation({
    query: (arg) =>{
      const {memberId, body} = arg;
      return {
        url: `/project/member/${memberId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Project', 'Fabric', 'Haberdashery'],
  }),
  deleteOneProject: builder.mutation({
    query: (arg) => {
      const {memberId, projectId} = arg;
    return {
      url: `/project/${projectId}/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Project'],
  }),
  deleteAllProjects: builder.mutation({
    query: (memberId) => {
    return {
      url: `/project/all/member/${memberId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        },
      }
    },
    invalidatesTags: ['Project'],
  }),
  updateOneProject: builder.mutation({
    query: (arg) => {
      const {memberId, projectId, body} = arg;
    return {
      url: `/project/${projectId}/member/${memberId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        },
        body
      }
    },
    invalidatesTags: ['Project'],
  }),
  })
});

export const { 
              useSigninUserMutation, 
              useSignupUserMutation, 
              useGetAllFabricsQuery, 
              useAddOneFabricMutation, 
              useDeleteOneFabricMutation, 
              useDeleteAllFabricsMutation, 
              useUpdateOneFabricMutation,
              useGetAllHaberdasheriesQuery, 
              useAddOneHaberdasheryMutation, 
              useDeleteOneHaberdasheryMutation, 
              useDeleteAllHaberdasheriesMutation, 
              useUpdateOneHaberdasheryMutation,
              useGetAllPatternsQuery, 
              useAddOnePatternMutation, 
              useDeleteOnePatternMutation, 
              useDeleteAllPatternsMutation, 
              useUpdateOnePatternMutation,
              useUpdateOneUserMutation,
              useDeleteOneUserMutation,
              useGetAllProjectsQuery,
              useAddOneProjectMutation,
              useDeleteOneProjectMutation, 
              useDeleteAllProjectsMutation, 
              useUpdateOneProjectMutation,
             } = ytremaApi;

