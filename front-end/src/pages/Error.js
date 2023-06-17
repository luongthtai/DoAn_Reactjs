import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <main className='flex justify-center items-center w-full h-screen'>
      <div className='text-center grid gap-2'>
        <h1 className='text-7xl font-bold'>404</h1>

        <Link to='/' className='text-2xl underline underline-offset-1'>Back to Home !!!</Link>
      </div>
    </main>
  )
}
