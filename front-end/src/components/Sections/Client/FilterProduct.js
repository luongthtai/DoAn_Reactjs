import React from 'react'
import { FiFilter } from 'react-icons/fi'

export default function FilterProduct() {
    return (
        <section className='sticky top-16 flex justify-between xl:hidden w-full bg-white py-3 text-lg px-6 z-10'>
            <button className='flex items-center gap-1 bg-gray-200 p-1 px-3 rounded'>
                <FiFilter /> <span>Filter</span>
            </button>

            <select className=''>
                <option value={1}>Grocery</option>
            </select>
        </section>
    )
}
