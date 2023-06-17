import React from 'react'
import { MdDashboard, MdOutlineTypeSpecimen } from 'react-icons/md'
import { BsBox, BsBoxes, BsShop } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { AiOutlineSetting } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { BiCategory } from 'react-icons/bi'

export default function SideBarDrawer({ toggle, onclick }) {
    return (
        <>
            <aside className='fixed top-0 left-0 bg-white z-50 md:w-1/2 w-4/5 h-full border duration-150 xl:hidden' style={{ transform: toggle ? 'translateX(0)' : 'translateX(-100%)' }}>
                <div className='flex justify-between items-center px-7 border-b'>
                    <Link to="/admin" className='font-extrabold text-2xl py-3'>Pick <span className='text-green-500'>Bazar</span></Link>
                    <button className='w-6 h-6 bg-gray-100 rounded-full font-bold flex items-center justify-center' onClick={onclick}>x</button>
                </div>

                <ul className='grid gap-5 p-5'>
                    <li>
                        <Link to='/admin' className='flex gap-4 items-center'><MdDashboard className='text-2xl' /> Dashboard</Link>
                    </li>
                    <li>
                        <Link to='shops' className='flex gap-4 items-center'><BsShop className='text-2xl' /> Shops</Link>
                    </li>
                    <li>
                        <Link to='products' className='flex gap-4 items-center'><BsBox className='text-2xl' /> Products</Link>
                    </li>
                    <li>
                        <Link to='attributes' className='flex gap-4 items-center'><MdOutlineTypeSpecimen className='text-2xl' /> Attributes</Link>
                    </li>
                    <li>
                        <Link to='commoditys' className='flex gap-4 items-center'><BsBoxes className='text-2xl' /> Commoditys</Link>
                    </li>
                    <li>
                        <Link to='categories' className='flex gap-4 items-center'><BiCategory className='text-2xl' /> Categories</Link>
                    </li>
                    <li>
                        <Link to='users' className='flex gap-4 items-center'><FiUsers className='text-2xl' /> Users</Link>
                    </li>
                    <li>
                        <Link to='settings' className='flex gap-4 items-center'><AiOutlineSetting className='text-2xl' /> Settings</Link>
                    </li>
                </ul>
            </aside>

            <div className='fixed top-0 left-0 w-full h-full z-10 bg-black opacity-10 duration-150 xl:hidden' onClick={onclick} style={{ display: toggle ? 'block' : 'none' }}></div>
        </>
    )
}
