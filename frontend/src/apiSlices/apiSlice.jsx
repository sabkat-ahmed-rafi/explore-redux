import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'testingApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BACKEND_URL}),
    tagTypes: ['TestingData'],
    endpoints: (builder) => ({
        getAllData: builder.query({
            query: () => "/data",
            providesTags: ['Data']
        }),
        getSingleData: builder.query({
            query: (id) => `/data/${id}`,

        }),
        addData: builder.mutation({
            query: (newData) => ({
                url: '/data',
                method: 'POST',
                body: newData
            }),
            invalidatesTags: ['Data']
        })
    })
})

export const {
    useGetAllDataQuery,
    useAddDataMutation,
} = apiSlice;