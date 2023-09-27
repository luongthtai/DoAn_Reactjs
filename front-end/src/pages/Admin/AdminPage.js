import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CgMenuLeft } from 'react-icons/cg'
import { logoutShop } from 'redux/reducers/Shop'
import { logout } from 'redux/reducers/Auth'
import SideBarAdmin from 'components/Sections/Admin/SideBarAdmin'
import SideBarDrawer from 'components/Sections/Admin/SideBarDrawer'
import MainAdmin from 'components/Sections/Admin/MainAdmin'

export default function AdminPage() {
    const dispatch = useDispatch()

    const role = useSelector(state => state.auth.role)

    const [data, setData] = useState([])
    const [toggleSidebar, setToggleSidebar] = useState(false)

    const isLogin = useSelector(state => state.auth.isLogin)
    const id = useSelector(state => state.auth.user.id)

    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
    }, [id])

    const handleToggle = () => {
        setToggleSidebar(!toggleSidebar)
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(logoutShop())
    }

    if (role !== "admin") {
        return <Navigate to="/" />
    }

    if (isLogin) {
        return (
            <>
                <header className='py-3 w-full z-50 shadow fixed top-0 left-0 bg-white'>
                    <div className='px-10 flex justify-between'>
                        <div className='flex items-center gap-6'>
                            <button className='text-3xl block lg:hidden' onClick={() => setToggleSidebar(!toggleSidebar)}><CgMenuLeft /></button>
                            <Link to="/admin" className='font-extrabold text-3xl md:block hidden'>Pick <span className='text-green-500'>Bazar</span></Link>
                        </div>

                        <div className='flex items-center gap-5'>
                            <Link className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>Create Shop</Link>
                            {
                                data.map(item =>
                                    <div className='bg-white rounded-full w-8 h-8 flex justify-center items-center border dropdown' key={item.id}>
                                        <label tabIndex={0}>
                                            {
                                                item.avatar ?
                                                    <img
                                                        src={item.avatar}
                                                        alt=''
                                                        className='rounded-full object-contain'
                                                    /> : <BiUser />
                                            }
                                        </label>

                                        <ul tabIndex={0} className="dropdown-content bg-base-100 top-full right-0 w-44 translate-y-2 text-sm font-semibold shadow rounded">
                                            <li className='py-2 px-4 bg-emerald-600 text-white rounded-t'>
                                                <h5>{item.user_name || 'Customer'}</h5>
                                                <p className='text-xs'>{item.email || 'customer@demo.com'}</p>
                                            </li>
                                            <li><Link to='profile-update' className='hover:text-emerald-500 duration-100 px-4 py-2 block border-b'>Profile</Link></li>
                                            <li><button onClick={handleLogout} className='hover:text-emerald-500 duration-100 px-4 py-2 block '>Logout</button></li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </header>

                <main className='flex min-h-screen pt-14'>
                    <SideBarAdmin />
                    <SideBarDrawer toggle={toggleSidebar} onclick={handleToggle} />
                    <MainAdmin />
                </main>
            </>
        )
    }

    return (
        <Navigate to='login' />
    )
}
