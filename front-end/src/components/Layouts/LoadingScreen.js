import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='h-screen pt-16 flex flex-col gap-2 justify-center items-center text-emerald-500'>
        <div className='w-14 h-14 border-b-transparent border-t-transparent rounded-full border-4 border-emerald-500 animate-spin'></div>
        <p className='font-semibold'>Loading ... </p>
    </div>
  )
}
