import React from 'react'
import imgBook from '../../assets/image/shopItem.webp'

export default function DownloadItem() {
    return (
        <div className='flex justify-between items-start border-b pb-5 last:border-none'>
            <div className='flex gap-5'>
                <img src={imgBook} alt='' className='w-20 h-20'/>

                <div>
                    <h4 className='capitalize font-bold mb-2'>The bedtime stories part one</h4>

                    <p className='font-semibold'>Key: <span>1PDOeYosO0mZaEDY</span> <span className='font-normal text-gray-500'>| Purchased on 10.01.2022</span></p>
                </div>
            </div>

            <button className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white w-fit' type='button'>Pay Now</button>
        </div>
    )
}
