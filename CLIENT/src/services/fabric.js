// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const fabricsApi = createApi({
  reducerPath: 'fabricsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/fabric/' }),
  endpoints: (builder) => ({
    getAllFabrics: builder.query({
      query: (memberId) => `all/member/${memberId}`,
    
    }, 
    ),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllFabricsQuery } = fabricsApi;

