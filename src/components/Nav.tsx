'use client'

import { AuthContext } from '@/app/utils/AuthContext'
import Link from 'next/link'
import { useContext } from 'react'

const Nav = () => {
  const { getUser, signout } = useContext(AuthContext)
  const user = getUser()

  const handlesignout = () => {
    signout()
  }
  return (
    <nav className='flex justify-between h-14 border-b-2 border-black pl-9 w-full bg-white'>
      {/* Logo or title */}
      <Link href='/' className='flex items-center'>
        <p className='logo_text cursor-pointer'>Analisis Sentimen</p>
      </Link>

      {/* menu */}
      {user ? (
        <div className='flex gap-6'>
          <Link href='/home' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Dashboard
            </p>
          </Link>
          <div className='flex items-center relative group'>
            <p className='text-large font-semibold hover:border-b hover:border-black cursor-pointer'>
              Kamus Kata
            </p>
            <div className='absolute left-0 mt-28 bg-white border border-gray-100 rounded shadow-md hidden group-hover:block'>
              <Link
                href='/stopwords'
                className='block px-4 py-2 hover:bg-gray-100'
              >
                <p className='text-sm font-medium hover:border-b hover:border-black cursor-pointer'>
                  Stopwords
                </p>
              </Link>
              <Link
                href='/slangwords'
                className='block px-4 py-2 hover:bg-gray-100'
              >
                <p className='text-sm font-medium hover:border-b hover:border-black cursor-pointer'>
                  Slangwords
                </p>
              </Link>
            </div>
          </div>
          <Link href='/dataset' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Dataset
            </p>
          </Link>
          <Link href='/preprocessing' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Preprocessing
            </p>
          </Link>
          <Link href='/labelling' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Labelling
            </p>
          </Link>
          <Link href='/testing' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Testing
            </p>
          </Link>
        </div>
      ) : null}

      {user ? (
        <Link
          href='/'
          className='flex items-center border-l-2 border-black transition-all hover:bg-black hover:text-white'
        >
          <p className='text-xl font-semibold px-4' onClick={handlesignout}>
            Sign Out
          </p>
        </Link>
      ) : (
        <Link
          href='/auth'
          className='flex items-center border-l-2 border-black transition-all hover:bg-black hover:text-white'
        >
          <p className='text-xl font-semibold px-4'>Sign In</p>
        </Link>
      )}
    </nav>
  )
}

export default Nav
