import React from 'react'
import { Link } from 'react-router-dom'
// import { BsChevronDown } from 'react-icons/bs'
// import { TbApple } from 'react-icons/tb'
import icon from 'assets/image/apple.png'

export default function CategoryItem({ category }) {
    return (
        <Link to={`?search=${category}`} className='flex justify-between items-center px-3 py-2 text-slate-500'>
            <div className='flex items-center gap-2 font-semibold'>
                {/* <TbApple /> */}
                <img 
                    src={icon}
                    alt='icon'
                    className='w-5'
                />
                <span className='capitalize'>{category || 'Fruits & Vegetables'}</span>
            </div>

            {/* <BsChevronDown /> */}
        </Link>
    )
}
