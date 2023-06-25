import { Dataset, DatasetLabelled } from '@/types/Dataset'
import { Stopwords, Slangwords } from '@/types/SlangStop'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tugasAkhirApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: 'user/signup',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: 'user/signin',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
    getDataset: builder.query<Dataset[], null>({
      query: () => 'dataset',
      providesTags: ['Dataset'],
    }),
    importDataset: builder.mutation({
      query: (data) => ({
        url: 'dataset',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Dataset' }],
    }),
    getDatasetLabelled: builder.query<DatasetLabelled[], null>({
      query: () => 'dataset/labelled',
      providesTags: ['Label'],
    }),
    getSlangwords: builder.query<Slangwords[], null>({
      query: () => 'slangword',
      providesTags: ['Slangword'],
    }),
    importSlangword: builder.mutation({
      query: (file) => ({
        url: 'slangword/import',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: [{ type: 'Slangword' }],
    }),
    getStopwords: builder.query<Stopwords[], null>({
      query: () => 'stopword',
      providesTags: ['Stopword'],
    }),
    importStopword: builder.mutation({
      query: (file) => ({
        url: 'stopword/import',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: [{ type: 'Stopword' }],
    }),
  }),
  tagTypes: [
    'User',
    'Dataset',
    'Slangword',
    'Stopword',
    'Label',
    'Preprocesing',
    'Testing',
  ],
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetDatasetQuery,
  useImportDatasetMutation,
  useGetDatasetLabelledQuery,
  useGetSlangwordsQuery,
  useGetStopwordsQuery,
  useImportSlangwordMutation,
  useImportStopwordMutation,
} = tugasAkhirApi
