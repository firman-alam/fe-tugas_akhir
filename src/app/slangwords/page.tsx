'use client'

import { AuthContext } from '../utils/AuthContext'
import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Fragment,
} from 'react'
import { useRouter } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Slangwords } from '@/types/SlangStop'
import {
  useAddSlangwordMutation,
  useDeleteSlangwordMutation,
  useGetSlangwordsQuery,
  useImportSlangwordMutation,
  useUpdateSlangwordMutation,
} from '@/lib/redux/services/tugasAkhirApi'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'

interface DataEdit {
  id: number
  kata_baku: string
  kata_slang: string
}

interface DataDelete {
  id: number
}

const Page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm()
  const user = getUser()

  const [uploadFile] = useImportSlangwordMutation()
  const [addSlangword] = useAddSlangwordMutation()
  const [deleteSlangword] = useDeleteSlangwordMutation()
  const [selectedFile, setSelectedFile] = useState(null)
  const { data, isLoading } = useGetSlangwordsQuery(null)
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<DataEdit | null>(null)
  const [dataDelete, setDataDelete] = useState<DataDelete | null>(null)

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

  const handleOpenModalAdd = () => {
    setIsOpenAdd(true)
  }

  const handleCloseModalAdd = () => {
    setIsOpenAdd(false)
  }

  const handleOpenModalEdit = (params: any) => {
    setIsOpenEdit(true)
    setDataEdit(params.row.original)
  }

  const handleCloseModalEdit = () => {
    setIsOpenEdit(false)
  }

  const handleOpenModalDelete = (params: any) => {
    setIsOpenDelete(true)
    const { id, kata_stop } = params.row.original
    setDataDelete(id)
  }

  const handleCloseModalDelete = () => {
    setIsOpenDelete(false)
  }

  const onSubmitAdd = (data: any) => {
    console.log(data)
    addSlangword({ data: data })
    handleCloseModalAdd()
    reset()
  }

  const handleDelete = () => {
    console.log(dataDelete)
    deleteSlangword({ id: dataDelete })
    handleCloseModalDelete()
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
        accessorKey: 'kata_baku',
        header: 'Kata Baku',
        size: 170,
      },
      {
        accessorKey: 'kata_slang',
        header: 'Kata Slang',
        size: 170,
      },
      {
        header: 'Opsi',
        Cell: (params: any) => (
          <div className='flex gap-2 w-full'>
            <button
              className='border-black border-2 px-4 py-1 bg-yellow-fir'
              onClick={() => handleOpenModalEdit(params)}
            >
              Edit
            </button>
            <button
              className='border-black border-2 px-4 py-1 bg-red-fir'
              onClick={() => handleOpenModalDelete(params)}
            >
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
            <div className='flex gap-4 mb-4'>
              <button
                className='white_btn'
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

              <button
                className='yellow_btn shadow-box'
                onClick={handleOpenModalAdd}
              >
                Tambah data
              </button>
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

      {/* Add Modal */}
      <Transition.Root show={isOpenAdd} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 flex items-center justify-center'
          onClose={handleCloseModalAdd}
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
                Tambah Data
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmitAdd)} className='mt-4'>
                <div className='flex mt-2 w-full'>
                  <label htmlFor='kata_stop' className='w-1/3'>
                    Kata Baku
                  </label>
                  <input
                    type='text'
                    id='kata_stop'
                    autoFocus
                    className='w-2/3 p-2 border-black border-2'
                    {...register('kata_baku')}
                    required
                  />
                </div>
                <div className='flex mt-2 w-full'>
                  <label htmlFor='kata_stop' className='w-1/3'>
                    Kata Slang
                  </label>
                  <input
                    type='text'
                    id='kata_stop'
                    autoFocus
                    className='w-2/3 p-2 border-black border-2'
                    {...register('kata_slang')}
                    required
                  />
                </div>
                <div className='flex gap-2 justify-end'>
                  <button
                    className='mt-4 bg-gray-500 text-white py-2 px-4 rounded'
                    onClick={handleCloseModalAdd}
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

      {/* Edit Modal */}
      <EditModal
        isOpenEdit={isOpenEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataEdit={dataEdit}
      />
      {/* Delete Modal */}
      <Transition.Root show={isOpenDelete} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 flex items-center justify-center'
          onClose={handleCloseModalDelete}
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
                Hapus Data
              </Dialog.Title>

              <div className='flex gap-2 w-full'>
                <p>Apakah anda yakin menghapus item ini?</p>
              </div>
              <div className='flex gap-2 justify-end'>
                <button
                  className='mt-4 bg-gray-500 text-white py-2 px-4 rounded'
                  onClick={handleCloseModalDelete}
                >
                  Batal
                </button>
                <button
                  className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
                  onClick={handleDelete}
                >
                  Ya
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
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
  const { id, kata_slang, kata_baku } = dataEdit || {}
  const { register, handleSubmit, setValue } = useForm()
  const [updateSlangword] = useUpdateSlangwordMutation()

  useEffect(() => {
    setValue('kata_baku', kata_baku)
    setValue('kata_slang', kata_slang)
  }, [kata_slang, kata_baku, setValue])

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
              Edit Data
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
              <div className='flex mt-2 w-full'>
                <label htmlFor='kata_stop' className='w-1/3'>
                  Kata Baku
                </label>
                <input
                  type='text'
                  id='kata_stop'
                  autoFocus
                  className='w-2/3 p-2 border-black border-2'
                  {...register('kata_baku')}
                  required
                />
              </div>
              <div className='flex mt-2 w-full'>
                <label htmlFor='kata_stop' className='w-1/3'>
                  Kata Slang
                </label>
                <input
                  type='text'
                  id='kata_stop'
                  autoFocus
                  className='w-2/3 p-2 border-black border-2'
                  {...register('kata_slang')}
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
