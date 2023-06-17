import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdOutlineTypeSpecimen } from 'react-icons/md'
import { BsBox, BsBoxes, BsShop } from 'react-icons/bs'
import { AiOutlineSetting } from 'react-icons/ai'
import { GiShop } from 'react-icons/gi'
import { BiCategory } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'

export default function SideBarAdmin() {
    const role = useSelector(state => state.auth.role)

    return (
        <aside className='p-5 border-r w-72 sticky top-14 left-0 lg:block hidden bg-white h-full'>
            <ul className='grid gap-5 '>
                <li>
                    <NavLink to='/admin' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><MdDashboard className='text-2xl' /> Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='myshop' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><GiShop className='text-2xl' /> My Shop</NavLink>
                </li>
                <li>
                    <NavLink to='shops' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><BsShop className='text-2xl' /> Shops</NavLink>
                </li>
                <li>
                    <NavLink to='products' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><BsBox className='text-2xl' /> Products</NavLink>
                </li>
                <li>
                    <NavLink to='attributes' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><MdOutlineTypeSpecimen className='text-2xl' /> Attributes</NavLink>
                </li>
                <li>
                    <NavLink to='commoditys' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><BsBoxes className='text-2xl' /> Commoditys</NavLink>
                </li>
                <li>
                    <NavLink to='categories' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><BiCategory className='text-2xl' /> Categories</NavLink>
                </li>
                {
                    role === 'admin' ? (
                        <>
                            <li>
                                <NavLink to='users' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><FiUsers className='text-2xl' /> Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='settings' className={({isActive}) => !isActive ? 'flex gap-4 items-center' : 'flex gap-4 items-center text-emerald-500'}><AiOutlineSetting className='text-2xl' /> Settings</NavLink>
                            </li>
                        </>
                    ) : null
                }
            </ul>
        </aside>
    )
}
