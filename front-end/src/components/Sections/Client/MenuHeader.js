import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuHeader({ toggle, onclick }) {
    return (
        <>
            <div className="lg:hidden bg-base-100 fixed top-0 left-0 md:w-1/2 w-4/5 z-40 h-full duration-150" style={{ transform: toggle ? 'translateX(0)' : 'translateX(-100%)' }}>
                <div className="p-0">
                    <div className='flex justify-between items-center px-7 border-b'>
                        <Link to='/'><h1 className='font-extrabold text-2xl border-b p-4'>Pick <span className='text-green-500'>Bazar</span></h1></Link>
                        <button className='w-6 h-6 bg-gray-100 rounded-full font-bold flex items-center justify-center' onClick={onclick}>x</button>
                    </div>

                    <ul className='grid p-5'>
                        <li><Link className='w-full block py-2' to='/shops'>Shops</Link></li>
                        <li><Link className='w-full block py-2' to=''>Manufacturers/Publishers</Link></li>
                        <li><Link className='w-full block py-2' to=''>Authors</Link></li>
                        <li><Link className='w-full block py-2' to='/offers'>Offers</Link></li>
                        <li><Link className='w-full block py-2' to='/faq'>FAQ</Link></li>
                        <li><Link className='w-full block py-2' to='/contact'>Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-screen z-10 bg-black opacity-10 duration-150 xl:hidden' onClick={onclick} style={{ display: toggle ? 'block' : 'none' }}></div>
        </>
    )
}
