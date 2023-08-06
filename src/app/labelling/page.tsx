'use client'

import { AuthContext } from '../utils/AuthContext'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useGetDatasetLabelledQuery,
  useLazyRunLabellingQuery,
  useUpdateLabelMutation,
} from '@/lib/redux/services/tugasAkhirApi'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { DatasetLabelled } from '@/types/Dataset'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'

interface DataEdit {
  id: number
  label: string
}

const Page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<DataEdit | null>(null)

  const [runLabelling, { isLoading: loadLabel }] = useLazyRunLabellingQuery()
  const { data, isLoading, refetch } = useGetDatasetLabelledQuery(null)

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 6000)

    return () => {
      clearInterval(interval)
    }
  }, [refetch])

  const handleOpenModalEdit = (params: any) => {
    setIsOpenEdit(true)
    setDataEdit(params.row.original)
  }

  const handleCloseModalEdit = () => {
    setIsOpenEdit(false)
  }

  // useEffect(() => {
  //   if (!user) {
  //     // Redirect the user to the login page.
  //     router.push('/')
  //   }
  // }, [user])

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
      {
        header: 'Opsi',
        Cell: (params: any) => (
          <button
            className='border-black border-2 px-4 py-1 bg-yellow-fir'
            onClick={() => handleOpenModalEdit(params)}
          >
            Edit
          </button>
        ),
        size: 100,
      },
    ],
    []
  )

  if (isLoading || loadLabel) {
    return <p className='mt-2'>Loading...</p>
  }

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
                <button
                  className='white_btn mb-4'
                  onClick={() => runLabelling()}
                >
                  Start Labelling
                </button>
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

          {/* Edit Modal */}
          <EditModal
            isOpenEdit={isOpenEdit}
            handleCloseModalEdit={handleCloseModalEdit}
            dataEdit={dataEdit}
          />
        </>
      )}
    </main>
  )
}

type EditProps = {
  isOpenEdit: boolean
  handleCloseModalEdit: () => void
  dataEdit: DataEdit | null
}

const EditModal = ({
  isOpenEdit,
  handleCloseModalEdit,
  dataEdit,
}: EditProps) => {
  const { id, label } = dataEdit || {}
  const { register, handleSubmit, setValue } = useForm()
  const [updateSlangword] = useUpdateLabelMutation()

  useEffect(() => {
    setValue('label', label)
  }, [label])

  const onSubmit = (data: any) => {
    console.log(data)
    updateSlangword({ id: id, data: data })
    handleCloseModalEdit()
  }

  return (
    <Transition.Root show={isOpenEdit} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 flex items-center justify-center'
        onClose={handleCloseModalEdit}
      >
        <Transition.Child
          as={Fragment}
          enter='transition-opacity duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='transition-all duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition-all duration-300'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='relative w-2/4 bg-white p-4 border-2 border-black shadow-box'>
            <Dialog.Title as='h3' className='text-lg font-bold'>
              Edit Label
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
              <div className='flex mt-2 w-full'>
                <label htmlFor='kata_stop' className='w-1/3'>
                  Label
                </label>
                <input
                  type='text'
                  id='label'
                  autoFocus
                  className='w-2/3 p-2 border-black border-2'
                  {...register('label')}
                  required
                />
              </div>
              <div className='flex gap-2 justify-end'>
                <button
                  className='mt-4 bg-gray-500 text-white py-2 px-4 rounded'
                  onClick={handleCloseModalEdit}
                >
                  Batal
                </button>
                <button
                  type='submit'
                  className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default Page
