import React, { useState } from 'react'

export default function OfferItem({ code, sell }) {
    const [copy, setCopy] = useState(false)

    const handleClick = () => {
        setTimeout(() => {
            setCopy(false)
        }, 4000)

        setCopy(true)
    }

    return (
        <div>
            <div className='bg-orange-300 p-3 h-40 rounded'>
                <div className='flex gap-2 justify-center items-center font-bold text-3xl text-white rounded border-dotted border-2 h-full'>
                    <p>${sell || 0}</p>
                    <span>OFF</span>
                </div>
            </div>

            <div className='px-2'>
                <div className='flex justify-between items-center bg-white py-3 px-4 rounded-b shadow font-semibold'>
                    <p className='uppercase'>{code || '5OFF2'}</p>
                    <span className='text-emerald-500 cursor-pointer text-sm' onClick={handleClick}>{copy ? 'Copied!' : 'Copy'}</span>
                </div>
            </div>
        </div>
    )
}
