'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { DataLatih, DataUji } from '@/types/Testing'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const [activeTab, setActiveTab] = useState(1)

  const handleTabClick = (tabIndex: any) => {
    setActiveTab(tabIndex)
  }

  const columnsDataUji = useMemo<MRT_ColumnDef<DataUji>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'raw_tweet',
        header: 'Tweet',
        size: 250,
      },
      {
        accessorKey: 'label_aktual',
        header: 'Label (aktual)',
        size: 100,
      },
      {
        accessorKey: 'label_prediksi',
        header: 'Label (prediksi',
        size: 100,
      },
    ],
    []
  )

  const columnsDataLatih = useMemo<MRT_ColumnDef<DataLatih>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'raw_tweet',
        header: 'Tweet',
        size: 300,
      },
      {
        accessorKey: 'label',
        header: 'Label',
        size: 100,
      },
    ],
    []
  )

  // useEffect(() => {
  //   if (!user) {
  //     // Redirect the user to the login page.
  //     router.push('/auth')
  //   }
  // }, [user])

  return (
    <main className='flex flex-row'>
      {!user && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}
      {user && (
        <>
          <section className='red_header h-screen'>
            <p className='text-center text-xl font-medium'>Testing</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
              <p className='font-semibold'>1911510012</p>
            </div>
          </section>
          <section className='p-4 w-5/6 h-screen overflow-scroll thin-scroll overflow-y-scroll'>
            {/* Button */}
            <button className='white_btn mb-4'>Uji Data</button>

            {/* Tabs */}
            <div className='flex gap-4 mt-8'>
              <button
                className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                  activeTab === 1
                    ? 'bg-red-fir text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => handleTabClick(1)}
              >
                Data Latih
              </button>
              <button
                className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                  activeTab === 2
                    ? 'bg-red-fir text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => handleTabClick(2)}
              >
                Data Uji
              </button>
            </div>

            {/* Tables */}
            <div className='bg-white p-4 rounded-b-md'>
              {activeTab === 1 && <div>Table 1</div>}
              {/* Render Table1 component when Tab 1 is active */}
              {activeTab === 2 && <div>Table 2</div>}
              {/* Render Table2 component when Tab 2 is active */}
            </div>

            {/* Confusion Matriz */}
            <div className='border-black border-2 w-full mt-6 shadow-box'>
              <p className='text-center text-3xl font-semibold'>
                Tabel Confusion Matrix
              </p>

              {/* Table */}
              <table className='p-2 m-4 w-11/12'>
                <thead className='border-black'>
                  <tr className='border-black border-2'>
                    <th rowSpan={2} className='border-black border-2'>
                      Data Aktual
                    </th>
                    <th colSpan={2} className='border-black border-2'>
                      Data Prediksi
                    </th>
                    <th rowSpan={2} className='border-black border-2'>
                      Total
                    </th>
                  </tr>
                  <tr>
                    <th className='border-black border-2'>Positif</th>
                    <th className='border-black border-2'>Negatif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-black border-2 text-center'>
                      Positif
                    </td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                  </tr>
                  <tr>
                    <td className='border-black border-2 text-center'>
                      Negatif
                    </td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                  </tr>
                  <tr>
                    <td className='border-black border-2 text-center'>Total</td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                    <td className='border-black border-2 text-center'></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Perhitungan Evaluasi */}
            <div className='border-black border-2 w-full mt-6 shadow-box'>
              <p className='text-center text-3xl font-semibold'>
                Detail Perhitungan Evaluasi
              </p>

              {/* Table */}
              <table className='p-2 m-4 w-11/12'>
                <thead className='border-black'>
                  <tr className='border-black border-2'>
                    <th className='border-black border-2'>Akurasi</th>
                    <th className='border-black border-2'>Presisi</th>
                    <th className='border-black border-2'>Recall</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =((TP + TN) / (TP + TN + FP + FN)) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FP)) + (TN / (TN + FN))) / 2) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FN)) + (TN / (TN + FP))) / 2) x 100%
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =((TP + TN) / (TP + TN + FP + FN)) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FP)) + (TN / (TN + FN))) / 2) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FN)) + (TN / (TN + FP))) / 2) x 100%
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =((TP + TN) / (TP + TN + FP + FN)) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FP)) + (TN / (TN + FN))) / 2) x 100%
                      </p>
                    </td>
                    <td className='border-black border-2 text-center p-2'>
                      <p className='text-sm'>
                        =(((TP / (TP + FN)) + (TN / (TN + FP))) / 2) x 100%
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Visualiasi */}
            <div className='border-black border-2 w-full mt-6 shadow-box'>
              <p className='text-center text-3xl font-semibold'>
                Visualisasi Hasil Prediksi
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default page
