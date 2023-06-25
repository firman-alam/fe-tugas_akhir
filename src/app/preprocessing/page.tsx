'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Preprocessing } from '@/types/Preprocessing'

const page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  const columns = useMemo<MRT_ColumnDef<Preprocessing>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'No.',
        size: 30,
      },
      {
        accessorKey: 'tweet_before',
        header: 'Tweet Before',
        size: 250,
      },
      {
        accessorKey: 'tweet_after',
        header: 'Tweet After',
        size: 250,
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
            <button className='white_btn mb-4'>Preprocesing Data</button>

            {/* Table */}
          </section>
        </>
      )}
    </main>
  )
}

export default page
