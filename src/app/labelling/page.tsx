'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useGetDatasetLabelledQuery } from '@/lib/redux/services/tugasAkhirApi'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { DatasetLabelled } from '@/types/Dataset'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const { data, isLoading } = useGetDatasetLabelledQuery(null)

  useEffect(() => {
    if (!user) {
      // Redirect the user to the login page.
      router.push('/')
    }
  }, [user])

  const columns = useMemo<MRT_ColumnDef<DatasetLabelled>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        size: 100,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 100,
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

  return (
    <main className='flex flex-row'>
      {!user && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}
      {user && (
        <>
          {isLoading ? (
            <p className='text-xl text-center'>Loading...</p>
          ) : (
            <>
              <section className='pink_header h-screen'>
                <p className='text-center text-xl font-medium'>Labelling</p>

                <div className='absolute bottom-2 text-center'>
                  <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
                  <p className='font-semibold'>1911510012</p>
                </div>
              </section>
              <section className='p-4 w-5/6 h-screen overflow-scroll thin-scroll overflow-y-scroll'>
                <button className='white_btn mb-4'>Start Labelling</button>
                {data ? (
                  <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnFilters={false}
                    enableColumnActions={false}
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
                ) : (
                  <p>No data available</p>
                )}
              </section>
            </>
          )}
        </>
      )}
    </main>
  )
}

export default page
