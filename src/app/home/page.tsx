'use client'

import { AuthContext } from '../utils/AuthContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const { getUser } = useContext(AuthContext)
  const user = getUser()

  useEffect(() => {
    if (!user) {
      // Redirect the user to the login page.
      router.push('/')
    }
  }, [user])

  return (
    <main className='flex flex-row'>
      {!user && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}
      {user && (
        <>
          <section className='blue_header h-screen'>
            <p className='text-center text-xl font-medium'>Dashboard</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
              <p className='font-semibold'>1911510012</p>
            </div>
          </section>
          <section className='px-4 py-10 bg-white w-5/6'>
            <div className='border-black border-2 p-4 m-8 shadow-box bg-paleblue-fir'>
              <p className='text-2xl font-semibold text-center'>
                ANALISIS SENTIMEN KEPUASAN PENGGUNA APLIKASI GRAMEDIA DIGITAL
                PADA MEDIA SOSIAL TWITTER MENGGUNAKAN METODE <br /> K-NEAREST
                NEIGHBORS DAN LEXICON-BASED
              </p>
            </div>
            <div className='flex gap-4 p4 m-8 justify-between'>
              <div className='border-black border-2 p-4 shadow-box w-full flex flex-col gap-6 bg-paleblue-fir'>
                <p className='font-bold tx-lg'>Jumlah Dataset</p>
                <p className='font-medium'>1500</p>
              </div>
              <div className='border-black border-2 p-4 shadow-box w-full flex flex-col gap-6 bg-paleblue-fir'>
                <p className='font-bold tx-lg'>Total Akurasi</p>
                <p className='font-medium'>80%</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Page
