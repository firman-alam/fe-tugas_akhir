'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Preprocessing } from '@/types/Preprocessing'
import { Dataset } from '@/types/Dataset'
import {
  useGetDatasetQuery,
  useLazyGetPreprocessingQuery,
} from '@/lib/redux/services/tugasAkhirApi'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const [activeTab, setActiveTab] = useState<number>(1)
  const [process, setProcess] = useState<boolean>(false)

  const { data: dataset, isLoading: loadDataset } = useGetDatasetQuery(null)
  const [
    getPreprocessing,
    { data: dataPreprocessing, isLoading: loadPreprocessing },
  ] = useLazyGetPreprocessingQuery(undefined)

  console.log(dataPreprocessing)

  const handleTabClick = (tabIndex: any) => {
    setActiveTab(tabIndex)
  }

  const handlePreprocessing = () => {
    setProcess(true)
    getPreprocessing(null)
  }

  const columnsDataset = useMemo<MRT_ColumnDef<Dataset>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        size: 120,
      },
      {
        accessorKey: 'raw_tweet',
        header: 'Tweet',
        size: 300,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 120,
      },
    ],
    []
  )

  const columnsCaseFolding = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'caseFolding_data',
        header: 'Tweet Sesudah',
        size: 300,
      },
    ],
    []
  )

  const columnsCleansing = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'cleansing_data',
        header: 'Tweet Sesudah',
        size: 300,
      },
    ],
    []
  )

  const columnsNormalizing = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'normalize_data',
        header: 'Tweet Sesudah',
        size: 300,
      },
    ],
    []
  )

  const columnsStopword = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'stopwordsRemoval_data',
        header: 'Tweet Sesudah',
        size: 300,
      },
    ],
    []
  )

  const columnsStemming = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'stemming_data',
        header: 'Tweet Sesudah',
        size: 300,
      },
    ],
    []
  )

  const columnsTokenizing = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'awal_data',
        header: 'Tweet Sebelum',
        size: 300,
      },
      {
        accessorKey: 'tokenizing_data',
        header: 'Tweet Sesudah',
        size: 300,
        Cell: (params: any) => (
          <span>{params.row.original.tokenizing_data.join(', ')}</span>
        ),
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
          <section className='orange_header h-screen'>
            <p className='text-center text-xl font-medium'>Preprocessing</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
              <p className='font-semibold'>1911510012</p>
            </div>
          </section>
          <section className='p-4 w-5/6 h-screen overflow-scroll thin-scroll overflow-y-scroll'>
            {/* Button */}
            <button className='white_btn mb-4' onClick={handlePreprocessing}>
              Preprocesing Data
            </button>

            {/* Tabs */}
            {process && (
              <div className='flex gap-4 mt-8'>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 1
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  Case Folding
                </button>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 2
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  Cleansing
                </button>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 3
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(3)}
                >
                  Normalisasi
                </button>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 4
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(4)}
                >
                  Menghapus kata stop
                </button>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 5
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(5)}
                >
                  Stemming
                </button>
                <button
                  className={`py-2 px-4 text-sm border-black border-2 shadow-box ${
                    activeTab === 6
                      ? 'bg-orange-fir text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  onClick={() => handleTabClick(6)}
                >
                  Tokenizing
                </button>
              </div>
            )}

            {/* Table */}
            {!process && dataset ? (
              loadDataset ? (
                <p>Loading...</p>
              ) : (
                <MaterialReactTable
                  columns={columnsDataset}
                  data={dataset}
                  enableColumnFilters={false}
                  enableColumnActions={false}
                  enableHiding={false}
                  muiTableProps={{
                    sx: {
                      tableLayout: 'fixed',
                      border: '1px solid black',
                    },
                  }}
                  muiTableBodyCellProps={{
                    sx: {
                      border: '1px solid black',
                    },
                  }}
                  muiTableHeadCellProps={{
                    sx: {
                      border: '1px solid black',
                    },
                  }}
                  muiTableFooterCellProps={{
                    sx: {
                      border: '1px solid black',
                    },
                  }}
                />
              )
            ) : null}

            {/* Tables */}
            {process &&
              (loadPreprocessing ? (
                <p>Loading...</p>
              ) : (
                <div className='bg-white p-4 rounded-b-md'>
                  {activeTab === 1 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsCaseFolding}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                  {activeTab === 2 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsCleansing}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                  {activeTab === 3 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsNormalizing}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                  {activeTab === 4 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsStopword}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                  {activeTab === 5 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsStemming}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                  {activeTab === 6 && dataPreprocessing && (
                    <MaterialReactTable
                      columns={columnsTokenizing}
                      data={dataPreprocessing}
                      enableColumnFilters={false}
                      enableColumnActions={false}
                      enableHiding={false}
                      muiTableProps={{
                        sx: {
                          tableLayout: 'fixed',
                          border: '1px solid black',
                        },
                      }}
                      muiTableBodyCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableHeadCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                      muiTableFooterCellProps={{
                        sx: {
                          border: '1px solid black',
                        },
                      }}
                    />
                  )}
                </div>
              ))}
          </section>
        </>
      )}
    </main>
  )
}

export default page
