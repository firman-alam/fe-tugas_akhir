/* Core */
import { configureStore } from '@reduxjs/toolkit'
import { tugasAkhirApi } from './services/tugasAkhirApi'

export const store = configureStore({
  reducer: {
    [tugasAkhirApi.reducerPath]: tugasAkhirApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([tugasAkhirApi.middleware])
  },
  devTools: true,
})
