'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Slangwords } from '@/types/SlangStop'
import {
  useGetSlangwordsQuery,
  useImportSlangwordMutation,
} from '@/lib/redux/services/tugasAkhirApi'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadFile] = useImportSlangwordMutation()
  const { data, isLoading } = useGetSlangwordsQuery(null)

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
      console.log(selectedFile)

      uploadFile(formData)
    }
  }, [selectedFile, uploadFile])

  // useEffect(() => {
  //   if (!user) {
  //     // Redirect the user to the login page.
  //     router.push('/auth')
  //   }
  // }, [user])

  const columns = useMemo<MRT_ColumnDef<Slangwords>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'kata_slang',
        header: 'Kata Slang',
        size: 170,
      },
      {
        accessorKey: 'kata_baku',
        header: 'Kata Baku',
        size: 170,
      },
      {
        header: 'Opsi',
        Cell: (params: any) => (
          <div className='flex gap-2 w-full'>
            <button className='border-black border-2 px-4 py-1 bg-yellow-fir'>
              Edit
            </button>
            <button className='border-black border-2 px-4 py-1 bg-red-fir'>
              Hapus
            </button>
          </div>
        ),
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
          <section className='orange_header h-screen'>
            <p className='text-center text-xl font-medium'>Slangwords</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
              <p className='font-semibold'>1911510012</p>
            </div>
          </section>
          <section className='p-4 w-5/6 h-screen overflow-scroll thin-scroll overflow-y-scroll'>
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
    </main>
  )
}

export default page
