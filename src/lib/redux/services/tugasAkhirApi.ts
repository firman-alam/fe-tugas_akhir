import { Dataset, DatasetLabelled } from '@/types/Dataset'
import { Preprocessing } from '@/types/Preprocessing'
import { Stopwords, Slangwords } from '@/types/SlangStop'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tugasAkhirApi: any = createApi({
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
      query: (file) => ({
        url: 'dataset',
        method: 'POST',
        body: file,
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
    addSlangword: builder.mutation({
      query: ({ data }) => ({
        url: `slangword`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Slangword' }],
    }),
    updateSlangword: builder.mutation({
      query: ({ id, data }) => ({
        url: `slangword/update/${id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Slangword' }],
    }),
    deleteSlangword: builder.mutation({
      query: ({ id }) => ({
        url: `slangword/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Slangword' }],
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
    addStopword: builder.mutation({
      query: ({ data }) => ({
        url: `stopword`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Stopword' }],
    }),
    updateStopword: builder.mutation({
      query: ({ id, data }) => ({
        url: `stopword/update/${id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Stopword' }],
    }),
    deleteStopword: builder.mutation({
      query: ({ id }) => ({
        url: `stopword/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Stopword' }],
    }),
    importStopword: builder.mutation({
      query: (file) => ({
        url: 'stopword/import',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: [{ type: 'Stopword' }],
    }),
    getPreprocessing: builder.query<Preprocessing, null>({
      query: () => 'preprocessing',
      providesTags: ['Preprocessing'],
    }),
    runLabelling: builder.query({
      query: () => 'labelling',
      providesTags: ['Label'],
    }),
    doTesting: builder.mutation({
      query: ({ data }) => ({
        url: `testing`,
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: [{ type: 'Testing' }],
    }),
  }),
  tagTypes: [
    'User',
    'Dataset',
    'Slangword',
    'Stopword',
    'Label',
    'Preprocessing',
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
  useGetPreprocessingQuery,
  useLazyGetPreprocessingQuery,
  useAddSlangwordMutation,
  useUpdateSlangwordMutation,
  useDeleteSlangwordMutation,
  useAddStopwordMutation,
  useUpdateStopwordMutation,
  useDeleteStopwordMutation,
  useLazyRunLabellingQuery,
  useDoTestingMutation,
} = tugasAkhirApi
