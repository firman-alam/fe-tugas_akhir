'use client'

import { AuthContext } from '../utils/AuthContext'
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDoTestingMutation } from '@/lib/redux/services/tugasAkhirApi'

const schema = yup.object().shape({
  ratio: yup.string().required('Please select a ratio'),
  k: yup
    .number()
    .required('Please enter a value for k')
    .min(1, 'k must be at least 1'),
})

const Page = () => {
  const { getUser } = useContext(AuthContext)
  const user = getUser()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [doTesting, { data }] = useDoTestingMutation()
  const [activeTab, setActiveTab] = useState(1)
  const [process, setProcess] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const cm = data?.confusion_matrix
  const accuracy = data?.accuracy
  const precision = data?.precision
  const recall = data?.recall

  useEffect(() => {
    if (accuracy !== undefined) {
      localStorage.setItem('accuracy', accuracy.toString())
    }
  }, [accuracy])

  const handleTabClick = (tabIndex: any) => {
    setActiveTab(tabIndex)
  }

  const handleTesting = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const columnsDataUji = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'tweet',
        header: 'Tweet',
        size: 250,
      },
      {
        accessorKey: 'actual_label',
        header: 'Label (aktual)',
        size: 100,
      },
      {
        accessorKey: 'predicted_label',
        header: 'Label (prediksi)',
        size: 100,
      },
    ],
    []
  )

  const columnsDataLatih = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'tweet',
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
            <button className='white_btn mb-4 p-4' onClick={handleTesting}>
              Uji Data
            </button>

            <Transition.Root show={isOpen} as={Fragment}>
              <Dialog
                as='div'
                className='fixed inset-0 z-50 flex items-center justify-center'
                onClose={handleCloseModal}
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

                    <p>
                      Sejumlah 1330 dataset akan dibagi menjadi data latih dan
                      data uji berdasarkan pilihan rasio pembagian dataset untuk
                      dilakukan pengujian. Silahkan memilih rasio pembagian
                      dataset dan masukkan nilai k untuk pengujian K-Nearest
                      Neighbors.
                    </p>

                    <form
                      onSubmit={handleSubmit((data) => {
                        doTesting({ data: data })
                        handleCloseModal()
                        setProcess(true)
                        console.log(data)
                        reset()
                      })}
                      className='mt-4'
                    >
                      <div className='flex mt-2 w-full gap-4'>
                        <input
                          type='radio'
                          id='radio1'
                          value='0.1'
                          required
                          {...register('ratio', { required: true })}
                        />
                        <label htmlFor='radio1'>9 : 1</label>
                      </div>
                      <div className='flex mt-2 w-full gap-4'>
                        <input
                          type='radio'
                          id='radio2'
                          value='0.2'
                          required
                          {...register('ratio', { required: true })}
                        />
                        <label htmlFor='radio2'>8 : 2</label>
                      </div>
                      <div className='flex mt-2 w-full gap-4'>
                        <input
                          type='radio'
                          id='radio3'
                          value='0.3'
                          required
                          {...register('ratio', { required: true })}
                        />
                        <label htmlFor='radio3'>7 : 3</label>
                      </div>
                      <div className='flex mt-2 w-full gap-4'>
                        <input
                          type='radio'
                          id='radio4'
                          value='0.4'
                          required
                          {...register('ratio', { required: true })}
                        />
                        <label htmlFor='radio4'>6 : 4</label>
                      </div>
                      <div className='flex mt-2 w-full gap-4'>
                        <input
                          type='radio'
                          id='radio5'
                          value='0.5'
                          required
                          {...register('ratio', { required: true })}
                        />
                        <label htmlFor='radio5'>5 : 5</label>
                      </div>
                      {errors.ratio && <p>{errors.ratio.message}</p>}
                      <div className='flex mt-2 w-full'>
                        <label htmlFor='k' className='w-1/3'>
                          Nilai K
                        </label>
                        <input
                          type='number'
                          id='k'
                          min={1}
                          autoFocus
                          className='w-2/3 p-2 border-black border-2'
                          {...register('k')}
                          required
                        />
                      </div>
                      {errors.k && <p>{errors.k.message}</p>}
                      <div className='flex gap-2 justify-end'>
                        <button
                          className='mt-4 bg-gray-500 text-white py-2 px-4 rounded'
                          onClick={handleCloseModal}
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

            {process && (
              <>
                {/* Tabs */}
                <div className='flex gap-4 mt-8 p-4'>
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
                  {activeTab === 1 && data !== undefined && (
                    <MaterialReactTable
                      columns={columnsDataLatih}
                      data={data?.training_data}
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
                  {/* Render Table1 component when Tab 1 is active */}
                  {activeTab === 2 && data !== undefined && (
                    <MaterialReactTable
                      columns={columnsDataUji}
                      data={data?.testing_data}
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
                  {/* Render Table2 component when Tab 2 is active */}
                </div>
                {/* Confusion Matriz */}
                <div className='border-black border-2 p-4 w-full mt-6 shadow-box'>
                  <p className='text-center text-3xl font-semibold'>
                    Tabel Confusion Matrix
                  </p>

                  {/* Table */}
                  {cm !== undefined && (
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
                          <td className='border-black border-2 text-center'>
                            {cm[0][0]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[0][1]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[0][0] + cm[0][1]}
                          </td>
                        </tr>
                        <tr>
                          <td className='border-black border-2 text-center'>
                            Negatif
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[1][0]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[1][1]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[1][0] + cm[1][1]}
                          </td>
                        </tr>
                        <tr>
                          <td className='border-black border-2 text-center'>
                            Total
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[0][0] + cm[1][0]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[0][1] + cm[1][1]}
                          </td>
                          <td className='border-black border-2 text-center'>
                            {cm[1][0] + cm[1][1] + cm[0][0] + cm[0][1]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Perhitungan Evaluasi */}
                <div className='border-black border-2 p-4 w-full mt-6 shadow-box'>
                  <p className='text-center text-3xl font-semibold'>
                    Detail Perhitungan Evaluasi
                  </p>

                  {/* Table */}
                  {cm !== undefined && (
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
                              =(((TP / (TP + FP)) + (TN / (TN + FN))) / 2) x
                              100%
                            </p>
                          </td>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>
                              =(((TP / (TP + FN)) + (TN / (TN + FP))) / 2) x
                              100%
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>
                              =(({cm[0][0]} + {cm[1][1]}) / ({cm[0][0]} +{' '}
                              {cm[1][1]} + {cm[1][0]} + {cm[0][1]})) x 100%
                            </p>
                          </td>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>
                              =((({cm[0][0]} / ({cm[0][0]} + {cm[1][0]})) + (
                              {cm[0][1]} / ({cm[0][1]} + {cm[1][1]}))) / 2) x
                              100%
                            </p>
                          </td>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>
                              =((({cm[0][0]} / ({cm[0][0]} + {cm[1][1]})) + (
                              {cm[0][1]} / ({cm[0][1]} + {cm[1][0]}))) / 2) x
                              100%
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>{accuracy * 100} %</p>
                          </td>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>{precision * 100} %</p>
                          </td>
                          <td className='border-black border-2 text-center p-2'>
                            <p className='text-sm'>{recall * 100} %</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Visualiasi */}
                <div className='border-black border-2 w-full mt-6 shadow-box flex flex-col items-center h-96 p-4'>
                  <p className='text-center text-3xl font-semibold mb-2'>
                    Visualisasi Hasil Prediksi
                  </p>
                  <div className='h-5/6'>
                    <PieChart
                      negativeCount={data?.negative_count}
                      positiveCount={data?.positive_count}
                    />
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </main>
  )
}

interface PieChartProps {
  positiveCount: number
  negativeCount: number
}

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart: React.FC<PieChartProps> = ({
  positiveCount,
  negativeCount,
}) => {
  const data = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        data: [positiveCount, negativeCount],
        backgroundColor: ['#23A094', '#E2242F'],
      },
    ],
  }

  const options = {
    maintainAspectRatio: false, // Set to false to allow custom height
    responsive: true,
    height: 270, // Set the desired height of the pie chart
  }

  return <Pie data={data} options={options} />
}

export default Page
