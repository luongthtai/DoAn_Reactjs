import React from 'react'
import product from '../../assets/image/products/Apples.webp'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'

export default function QuestionItem() {
    return (
        <div className='grid gap-5 border-b pb-5 last:border-none w-full'>
            <div className='flex gap-5 items-center'>
                <img src={product} alt='' className='w-16 h-16 border rounded' />

                <div className='font-semibold'>
                    <h5 className='capitalize'>Sun Tropics organic mango nectar, 250ml</h5>
                    <p className='text-gray-500'>$2.25</p>
                </div>
            </div>

            <div className='bg-gray-50 p-5 rounded flex justify-between items-end'>
                <div>
                    <p className='font-bold'><span>Q:</span> Is it sweet or sour?</p>
                    <p><span className='font-bold'>A:</span> its sweet as it contains suger.</p>

                    <p className='text-gray-400 mt-4 text-sm'>Date: 18 March, 2023</p>
                </div>

                <div className='flex gap-4 text-gray-400'>
                    <button type='button' className='flex items-center gap-1'><AiFillLike className='text-lg'/> <span className='text-sm'>0</span></button>
                    <button type='button' className='flex items-center gap-1'><AiFillDislike className='text-lg'/> <span className='text-sm'>0</span></button>
                </div>
            </div>
        </div>
    )
}
