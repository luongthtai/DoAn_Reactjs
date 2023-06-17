import React from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import apple from '../../assets/image/products/Apples.webp'

export default function CartItems() {
    return (
        <div className='flex justify-between border-b p-4'>
            <div className='flex items-center gap-4'>
                <div className='grid gap-2 bg-gray-100 justify-items-center p-2 rounded-full'>
                    <button><AiOutlinePlus /></button>
                    <span>1</span>
                    <button><AiOutlineMinus /></button>
                </div>

                <div className='flex gap-3 items-center'>
                    <img
                        src={apple}
                        alt='product_name'
                        className='w-12 h-12'
                    />

                    <div>
                        <h6 className='font-bold'>Green Beans</h6>
                        <span className='text-emerald-500 font-semibold'>$4.00</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <p className='font-semibold'>$4.00</p>
                <button className="text-sm"><AiOutlineClose /></button>
            </div>
        </div>
    )
}
