import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from 'redux/reducers/Auth'
import { logoutShop } from 'redux/reducers/Shop'

export default function ProfileList({ toggle, onclick }) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(logoutShop())
    }

    return (
        <>
            <div className="lg:hidden bg-base-100 fixed top-0 right-0 md:w-1/2 w-4/5 z-40 h-full duration-150" style={{ transform: toggle ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="p-0">
                    <div className='flex justify-between items-center px-7 border-b'>
                        <Link to='/'><h1 className='font-extrabold text-2xl border-b p-4'>Pick <span className='text-green-500'>Bazar</span></h1></Link>
                        <button className='w-6 h-6 bg-gray-100 rounded-full font-bold flex items-center justify-center' onClick={onclick}>x</button>
                    </div>

                    <div className='grid gap-2 px-4 bg-gray-100 py-2 text-semibold'>
                        <div className='flex justify-between'>
                            <p>Total Points</p>
                            <span>0</span>
                        </div>
                        <div className='flex justify-between'>
                            <p>Points Used</p>
                            <span>0</span>
                        </div>
                        <div className='flex justify-between'>
                            <p>Available Points</p>
                            <span>0</span>
                        </div>
                    </div>

                    <ul className='grid p-5 text-semibold'>
                        <li><Link className='w-full block py-2' to='/profile'>Profile</Link></li>
                        <li><Link to='/profile/order' className='w-full block py-2'>My Orders</Link></li>
                        <li><Link to='/profile/card' className='w-full block py-2'>My Cards</Link></li>
                        <li><Link to='/profile/wishlist' className='w-full block py-2'>My Wishlists</Link></li>
                        <li><Link to='/profile/question' className='w-full block py-2'>My Questions</Link></li>
                        <li><Link to='/profile/refund' className='w-full block py-2'>My Rufunds</Link></li>
                        <li><Link to='/profile/report' className='w-full block py-2'>My Reposts</Link></li>
                        <li><Link to='/profile/checkout' className='w-full block py-2'>Checkout</Link></li>
                        <li><Link to='/profile/changePass' className='w-full block py-2'>Change Password</Link></li>
                        <li><button type='button' onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-screen z-10 bg-black opacity-10 duration-150 xl:hidden' onClick={onclick} style={{ display: toggle ? 'block' : 'none' }}></div>
        </>
    )
}
