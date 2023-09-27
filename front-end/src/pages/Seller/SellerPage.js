import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { logout } from 'redux/reducers/Auth'
import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Dashboard from './Dashboard'
import SideBarSeller from 'components/Sections/Seller/SideBarSeller'
import { getIdShop, logoutShop } from 'redux/reducers/Shop'

export default function SellerPage() {
  const dispatch = useDispatch()
  const location = useLocation()

  const idUser = useSelector(state => state.auth.user.id)
  const isLogin = useSelector(state => state.auth.isLogin)

  const role = useSelector(state => state.auth.role)

  const [data, setData] = useState([])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(logoutShop())
  }

  useEffect(() => {
    const response = async () =>
      await axios.get(`/shops/info/${idUser}`)
        .then(res => {
          setData(res.data)
          return res.data
        })
        .then(res => dispatch(getIdShop(res)))
        .catch(err => console.log(err))

    if (idUser) {
      response()
    }
  }, [idUser, dispatch])

  if (role !== 'seller') {
    return <Navigate to='/' />
  }

  if (!isLogin) {
    return <Navigate to='/' />
  }

  return (
    <>
      <header className='py-3 w-full z-50 shadow fixed top-0 left-0 bg-white'>
        <div className='px-10 flex justify-between'>
          <div className='flex items-center gap-6'>
            <Link to="/seller" className='font-extrabold text-3xl md:block hidden'>Pick <span className='text-green-500'>Bazar</span></Link>
          </div>

          {
            data.map(item =>
              <div className='flex items-center gap-5' key={item.id}>
                <Link to={`shop/update/${item.id}`} className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>Update Shop</Link>
                <div className='bg-white rounded-full w-8 h-8 flex justify-center items-center border dropdown'>
                  <label tabIndex={0}>
                    {
                      item.logo ?
                        <img
                          src={item.logo}
                          alt=''
                          className='rounded-full object-contain'
                        /> : <BiUser />
                    }
                  </label>

                  <ul tabIndex={0} className="dropdown-content bg-base-100 top-full right-0 w-44 translate-y-2 text-sm font-semibold shadow rounded">
                    <li className='py-2 px-4 bg-emerald-600 text-white rounded-t'>
                      <h5>{item.name_shop || 'Customer'}</h5>
                      <p className='text-xs'>{item.user_name || 'customer@demo.com'}</p>
                    </li>
                    {/* <li><Link to='' className='hover:text-emerald-500 duration-100 px-4 py-2 block border-b'>Profile</Link></li> */}
                    <li><button onClick={handleLogout} className='hover:text-emerald-500 duration-100 px-4 py-2 block '>Logout</button></li>
                  </ul>
                </div>
              </div>
            )
          }
        </div>
      </header>

      <main className='flex min-h-screen pt-14'>
        <SideBarSeller />

        <section className='w-full p-8 bg-gray-100'>
          {
            location.pathname === '/seller' ? <Dashboard /> : <Outlet />
          }
        </section>
      </main>
    </>
  )
}
