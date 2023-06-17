import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../../redux/reducers/Auth'
import { logoutShop } from '../../../redux/reducers/Shop'

export default function ListLinkProfile() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(logoutShop())
  }

  return (
    <section className='bg-white border font-semibold rounded'>
        <ul className='grid gap-4 border-b py-6' >
            <li><NavLink to='/profile' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>Profile</NavLink></li>
            <li><NavLink to='changepass' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>Change Password</NavLink></li>
            <li><NavLink to='order' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Orders</NavLink></li>
            <li><NavLink to='download' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>Downloads</NavLink></li>
            <li><NavLink to='wishlist' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Wishlists</NavLink></li>
            <li><NavLink to='question' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Questions</NavLink></li>
            <li><NavLink to='refund' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Refunds</NavLink></li>
            <li><NavLink to='report' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Reports</NavLink></li>
            <li><NavLink to='card' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>My Cards</NavLink></li>
            <li><NavLink to='/faq' className={({isActive}) => isActive ? 'px-6 py-2 border-l-4 border-l-emerald-600' : 'px-6 py-2'}>Need Help</NavLink></li>
        </ul>
            
            <button onClick={handleLogout} className='py-4 px-6'><NavLink>Logout</NavLink></button>
    </section>
  )
}
