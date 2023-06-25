'use client'

import React from 'react'

const Header = ({ title, bgColor }) => {
  return (
    <section
      className={`w-1/4 h-screen border-r-2 border-black p-4 flex ${bgColor} items-center justify-center`}
    >
      <p className='text-center text-xl font-medium'>{title}</p>
    </section>
  )
}

export default Header
