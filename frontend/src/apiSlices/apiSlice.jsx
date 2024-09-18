import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'testingApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BACKEND_URL}),
    tagTypes: ['TestingData'],
    endpoints: (builder) => ({
        getAllData: builder.query({
            query: () => "/data",
            // using the same name for tags because if the data change then only it will refetch the data or it will remain unchanged
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
            // using the same name for tags because if the data change then only it will refetch the data or it will remain unchanged
            invalidatesTags: ['Data']
        })
    })
})

export const {
    useGetAllDataQuery,
    useAddDataMutation,
} = apiSlice;