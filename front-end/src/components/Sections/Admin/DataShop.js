import React from 'react'
import { BsBox, BsBox2, BsPercent } from 'react-icons/bs'
import { TbMoneybag } from 'react-icons/tb'
import * as moment from 'moment'

export default function DataShop({sine, totalProduct, totalOrder}) {

    return (
        <section className='flex gap-5'>
            <div className='grid md:grid-cols-3 grid-cols-1 p-4 gap-4 items-start bg-white rounded-lg xl:w-3/4 w-full'>
                <div className='grid gap-3'>
                    <h4 className='text-xl font-semibold'>Products</h4>

                    <ul className='border'>
                        <li className='flex gap-2 p-3 border-b'>
                            <p className='w-12 h-12 bg-pink-300 rounded-full flex justify-center items-center text-white text-lg font-semibold'>
                                <BsBox />
                            </p>
                            <div>
                                <p className='text-lg font-semibold'>{totalProduct || 0}</p>
                                <span className='text-slate-500'>Total Products</span>
                            </div>
                        </li>

                        <li className='flex gap-2 p-3'>
                            <p className='w-12 h-12 bg-blue-400 rounded-full flex justify-center items-center text-white text-lg font-semibold'>
                                <BsBox2 />
                            </p>
                            <div>
                                <p className='text-lg font-semibold'>{totalOrder || 0}</p>
                                <span className='text-slate-500'>Total Orders</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='grid gap-3'>
                    <h4 className='text-xl font-semibold'>Revenue</h4>

                    <ul className='border'>
                        <li className='flex gap-2 p-3 border-b items-center'>
                            <p className='w-12 h-12 bg-stone-500 rounded-full flex justify-center items-center text-white text-lg font-semibold'>
                                <TbMoneybag />
                            </p>

                            <p className='text-slate-500'>Gross Sale</p>
                        </li>

                        <li className='flex gap-2 p-3 items-center'>
                            <p className='w-12 h-12 bg-pink-300 rounded-full flex justify-center items-center text-white text-lg font-semibold'>
                                <BsBox2 />
                            </p>

                            <p className='text-slate-500'>Current Balance</p>
                        </li>
                    </ul>
                </div>
                <div className='grid gap-3'>
                    <h4 className='text-xl font-semibold'>Orders</h4>

                    <ul className='border'>
                        <li className='flex gap-2 p-3'>
                            <p className='w-12 h-12 bg-amber-800 rounded-full flex justify-center items-center text-white text-lg font-semibold'>
                                <BsPercent />
                            </p>
                            
                            <div>
                                <p className='text-lg font-semibold'>0 %</p>
                                <span className='text-slate-500'>Admin Commission Rate</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='w-1/4 bg-white rounded-lg xl:block hidden'>
                <div className='p-6 border-b'>
                    <h5 className='text-gray-400'>Registered since</h5>
                    <p className='font-semibold text-sm'>{sine ? moment(sine).format("DD/MM/YYYY") : 'June 27, 2021'}</p>
                </div>

                <div className='p-6'>
                    <h5 className='text-lg font-semibold mb-2'>Payment Infomation</h5>

                    <ul className='text-gray-400 grid gap-2'>
                        <li>
                            Name:
                        </li>

                        <li>
                            Email:
                        </li>

                        <li>
                            Bank:
                        </li>

                        <li>
                            Account No:
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
