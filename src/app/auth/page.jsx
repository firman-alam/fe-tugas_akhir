'use client'

import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../utils/AuthContext'
import { useRouter } from 'next/navigation'
import {
  useSignInMutation,
  useSignUpMutation,
} from '@/lib/redux/services/tugasAkhirApi'

const page = () => {
  const router = useRouter()
  const [user, setUser] = useState(false)
  const [consoleMessage, setConsoleMessage] = useState('')

  // rtk query
  const [signIn] = useSignInMutation()
  const [signUp] = useSignUpMutation()

  const { signin } = useContext(AuthContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    shouldUseNativeValidation: true,
  })

  const onSubmitSignUp = async (data) => {
    signUp(data)
      .then((data) => {
        if (data.status === true) {
          setConsoleMessage('User registered successfully')
          reset()

          setTimeout(() => {
            setUser(true)
          }, 3000)
        } else if (data.status === false) {
          reset()
          setConsoleMessage('Failed to register')
        }
      })
      .catch((error) => {
        reset()
        setConsoleMessage('Something went wrong', error)
      })
  }

  const onSubmitSignIn = async (data) => {
    signIn(data)
      .then((data) => {
        if (data.data.status === true) {
          setConsoleMessage(`Welcome ${data.data.data.username}`)
          reset()
          signin(data.data.data)
          router.push('/home')
        } else if (data.data.status === false) {
          reset()
          setConsoleMessage('Failed to find the account')
        }
      })
      .catch((error) => {
        reset()
        setConsoleMessage('Something went wrong', error)
      })
  }

  const SignUp = () => {
    return (
      <section className='flex'>
        <div className='w-1/2 text-center bg-white flex flex-col justify-center gap-4'>
          <h3 className='text-center text-3xl mb-6'>Welcome.</h3>
          <form
            className='w-1/2 mx-auto border-2 border-black border-solid rounded p-4'
            onSubmit={handleSubmit(onSubmitSignUp)}
          >
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Name
              </label>
              <input
                type='text'
                id='username'
                name='username'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('username', {
                  required: 'Please enter a valid username',
                })}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('password', { required: 'Password is required' })}
              />
            </div>

            <button type='submit' className='black_btn w-full mb-4'>
              SIGN UP
            </button>

            <p className='text-xs'>
              Sudah punya akun?{' '}
              <span
                className='blue_gradient cursor-pointer'
                onClick={() => setUser(!user)}
              >
                Klik di sini
              </span>
            </p>
          </form>
          <p className='mt-4'>{consoleMessage}</p>
        </div>
        <div className='border-r-2 border-black h-screen' />
        <div className='w-1/2 text-center bg-yellow-fir flex flex-col justify-center'>
          <p className='text-center font-medium mb-5 text-3xl font-mabry_pro p-6'>
            "K-Nearest Neighbors"
          </p>
        </div>
      </section>
    )
  }

  const SignIn = () => {
    return (
      <section className='flex'>
        <div className='w-1/2 text-center bg-paleblue-fir flex flex-col justify-center'>
          <p className='text-center font-medium mb-5 text-3xl font-mabry_pro p-6'>
            "Lexicon"
          </p>
        </div>
        <div className='border-r-2 border-black h-screen' />
        <div className='w-1/2 text-center bg-white flex flex-col justify-center gap-4'>
          <h3 className='text-center text-3xl mb-6'>Welcome back.</h3>
          <form
            className='w-1/2 mx-auto border-2 border-black border-solid rounded p-4'
            onSubmit={handleSubmit(onSubmitSignIn)}
          >
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Name
              </label>
              <input
                type='text'
                id='username'
                name='username'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('username', {
                  required: 'Please enter a valid username',
                })}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-lg font-medium text-gray-700 text-left'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full px-4 py-2 border-2 border-black rounded-md'
                {...register('password', { required: 'Password is required' })}
              />
            </div>

            <button type='submit' className='black_btn w-full mb-4'>
              SIGN IN
            </button>

            <p className='text-xs'>
              Belum punya akun?{' '}
              <span
                className='blue_gradient cursor-pointer'
                onClick={() => setUser(!user)}
              >
                Klik di sini
              </span>
            </p>
          </form>

          <p className='mt-4'>{consoleMessage}</p>
        </div>
      </section>
    )
  }

  return <div>{user ? <SignIn /> : <SignUp />}</div>
}

export default page
