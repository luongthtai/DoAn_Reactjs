import React from 'react'

export default function AddressItem({type, address}) {
  return (
    <div className='bg-gray-100 py-4 px-5 rounded w-full'>
        <h5 className='font-semibold mb-2'>{type || 'Shipping'}</h5>
        <p className='text-sm'>{address || "2231 Kidd Avenue, AK, Kipnuk, 99614, United States"}</p>
    </div>
  )
}
