'use client'

import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const signin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const getUser = () => {
    return user
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}
