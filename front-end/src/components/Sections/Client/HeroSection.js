import React from 'react'
import heroImg from '../../../assets/image/grocery.webp'
import { FiSearch } from 'react-icons/fi'

export default function HeroSection() {
    return (
        <section className='relative border-b hidden lg:block'>
            <img
                src={heroImg}
                alt='hero section'
                className='object-cover h-screen w-full'
            />

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
                <h2 className='font-bold px-10' style={{ fontSize: '45px' }}>Groceries Delivered in 90 Minute</h2>
                <p className='py-6'>Get your healthy foods & snacks delivered at your door steps all day everyday</p>

                <form className='relative z-20 shadow-900' style={{ boxShadow: 'rgba(0,0,0,.05) 0 21px 36px' }}>
                    <input className='w-full px-5 py-3 rounded-lg outline-green-600 text-sm' placeholder='Search your products from here'/>
                    <button className='absolute right-0 top-0 flex items-center h-full bg-emerald-600 gap-2 text-white px-7 rounded-r-lg'><FiSearch /> Search</button>
                </form>
            </div>
        </section>
    )
}
