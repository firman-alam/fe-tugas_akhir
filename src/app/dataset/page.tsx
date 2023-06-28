'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useRef, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useGetDatasetQuery,
  useImportDatasetMutation,
} from '@/lib/redux/services/tugasAkhirApi'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Dataset } from '@/types/Dataset'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadFile] = useImportDatasetMutation()
  const { data, isLoading } = useGetDatasetQuery(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)

      uploadFile(formData)
        .unwrap()
        .then((data: string) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [selectedFile, uploadFile])

  // useEffect(() => {
  //   if (!user) {
  //     // Redirect the user to the login page.
  //     router.push('/')
  //   }
  // }, [user])

  const columns = useMemo<MRT_ColumnDef<Dataset>[]>(
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

  return (
    <main className='flex flex-row'>
      {/* {!user && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )} */}
      {user && (
        <>
          {isLoading ? (
            <p className='text-xl text-center'>Loading...</p>
          ) : (
            <>
              <section className='green_header h-screen'>
                <p className='text-center text-xl font-medium'>Dataset</p>

                <div className='absolute bottom-2 text-center'>
                  <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
                  <p className='font-semibold'>1911510012</p>
                </div>
              </section>
              <section className='px-4 py-6 w-5/6 h-screen overflow-scroll thin-scroll overflow-y-scroll'>
                <div>
                  <button
                    className='white_btn mb-4'
                    type='button'
                    onClick={handleButtonClick}
                  >
                    Import Data
                  </button>
                  <input
                    type='file'
                    accept='.csv'
                    onChange={handleFileSelect}
                    className='hidden'
                    ref={fileInputRef}
                  />
                </div>

                {data ? (
                  <MaterialReactTable
                    columns={columns}
                    data={data}
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
