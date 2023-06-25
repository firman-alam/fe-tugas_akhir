/* Instruments */
import { tugasAkhirApi } from './services/tugasAkhirApi'

export const reducer = {
  [tugasAkhirApi.reducerPath]: tugasAkhirApi.reducer,
}
