import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsBox } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { HiOutlineViewGrid } from 'react-icons/hi'

export default function SideBarSeller() {
  return (
    <aside className='p-5 border-r w-72 sticky top-14 left-0 lg:block hidden bg-white h-full'>
      <ul className='grid gap-5'>
        <li>
          <NavLink className={({ isActive }) => isActive ? 'flex gap-4 items-center hover:text-emerald-500 duration-150' : "text-emerald-500"}><MdDashboard className='text-2xl' /> Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='products' className='flex gap-4 items-center hover:text-emerald-500 duration-150'><BsBox className='text-2xl' /> Products</NavLink>
        </li>
        <li>
          <NavLink to='category' className='flex gap-4 items-center hover:text-emerald-500 duration-150'><BiCategory className='text-2xl' /> Categories</NavLink>
        </li>
        <li>
          <NavLink to='reviews' className='flex gap-4 items-center hover:text-emerald-500 duration-150'><HiOutlineViewGrid className='text-2xl' /> Reviews</NavLink>
        </li>
      </ul>
    </aside>
  )
}
