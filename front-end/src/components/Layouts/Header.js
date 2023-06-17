import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Login from 'components/Sections/Client/Login'
import axios from 'axios'
import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { TbApple } from 'react-icons/tb'
import { logout } from 'redux/reducers/Auth'
import { logoutShop } from 'redux/reducers/Shop'
import Register from 'components/Sections/Client/Register'
import icon from 'assets/image/apple.png'

export default function Header({ position }) {
    const dispatch = useDispatch()

    const role = useSelector(state => state.auth.role)
    
    const [data, setData] = useState([])
    const [page, setPage] = useState(true)
    const [categories, setCategories] = useState([])
    const [dropdown, setDropdown] = useState(false)

    const isLogin = useSelector(state => state.auth.isLogin)

    const id = useSelector(state => state.auth.user[0].id)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(logoutShop())
    }

    const handleCLick = () => {
        setPage(!page)
    }

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }

    useEffect(() => {
        axios.get('/commoditys')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))

        if (id) {
            axios.get(`/users/${id}`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
    }, [id])

    return (
        <header className='py-3 top-0 left-0 w-full z-10 shadow-sm bg-white' style={{ position: position || 'sticky' }}>
            <div className='px-10 flex lg:justify-between justify-center'>
                <div className='flex items-center gap-10'>
                    <Link to='/' className='outline-none'><h1 className='font-extrabold text-3xl'>Pick <span className='text-green-500'>Bazar</span></h1></Link>

                    {
                        categories.length !== 0 ? <div className='relative hidden xl:block'>
                            <div className='flex gap-2 items-center text-emerald-500 font-bold border rounded px-4 py-2 cursor-pointer select-none' onClick={handleDropdown}>
                                {/* <TbApple className='text-2xl' /> */}
                                <img 
                                    src={icon}
                                    alt=''
                                    className='w-5'
                                />
                                <span>Grocery</span>
                                {
                                    !dropdown ? <AiFillCaretDown className='ml-2' /> : <AiOutlineCaretUp className='ml-2' />}
                            </div>

                            <div className={`absolute top-full left-0 w-48 bg-white px-4 py-3 rounded translate-y-2 ${dropdown ? 'block' : 'hidden'}`} style={{ boxShadow: 'rgba(0,0,0,.08) 0px 2px 16px' }}>
                                <ul className='grid gap-3'>
                                    {
                                        categories.length !== 0 && categories.map(item => <li key={item.id} className='flex gap-1 items-center font-semibold hover:text-emerald-500 duration-100 cursor-pointer'>
                                            <TbApple className='text-2xl' />
                                            <span className='capitalize'>{item.commodity_name}</span>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </div> : null
                    }
                </div>

                <nav className='gap-8 items-center hidden lg:flex'>
                    <ul className='flex gap-8 text-sm'>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-emerald-500' : 'hover:text-emerald-500'} to='/shops'>Shops</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-emerald-500' : 'hover:text-emerald-500'} to='/offers'>Offers</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-emerald-500' : 'hover:text-emerald-500'} to='/faq'>FAQ</NavLink></li>
                        <li><NavLink className={({ isActive }) => isActive ? 'text-emerald-500' : 'hover:text-emerald-500'} to='/contact'>Contact</NavLink></li>
                    </ul>

                    <div className='flex items-center gap-3'>
                        {
                            role === "seller" ?
                                <Link target='_blank' to='/seller' className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>Go to Shop</Link>
                                : role === "admin" ? <Link target='_blank' to="/admin" className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>Admin</Link> :
                                    <Link to="createshop" className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>Become a Seller</Link>
                        }

                        {
                            isLogin ?
                                <div className='bg-white rounded-full w-8 h-8 flex justify-center items-center border dropdown'>
                                    <label tabIndex={0}>
                                        {
                                            data.map(item => (
                                                item.avatar ? <img
                                                    key={item.id}
                                                    src={item.avatar}
                                                    alt={item.user_name}
                                                    className='rounded-full h-8 w-8 object-contain'
                                                /> : <BiUser key={item.id} />
                                            )
                                            )
                                        }
                                    </label>

                                    <ul tabIndex={0} className="dropdown-content bg-base-100 top-full right-0 w-44 translate-y-2 text-sm font-semibold">
                                        <li className='flex justify-between py-2 px-4 bg-emerald-600 text-white'>
                                            <p>Points</p>
                                            <span>0</span>
                                        </li>
                                        <li><Link to='/profile' className='hover:text-emerald-500 duration-100 px-4 py-2 block'>Profile</Link></li>
                                        <li><Link to='/profile/order' className='hover:text-emerald-500 duration-100 px-4 py-2 block'>My Orders</Link></li>
                                        <li><Link to='/profile/wishlist' className='hover:text-emerald-500 duration-100 px-4 py-2 block'>My Wishlists</Link></li>
                                        <li><Link to='/profile/checkout' className='hover:text-emerald-500 duration-100 px-4 py-2 block'>Checkout</Link></li>
                                        <li><button onClick={handleLogout} className='hover:text-emerald-500 duration-100 px-4 py-2 block'>Logout</button></li>
                                    </ul>
                                </div>
                                :
                                <label htmlFor='login' className='bg-emerald-600 rounded font-semibold text-white text-xs px-3 py-2'>
                                    Join
                                </label>
                        }
                    </div>
                </nav>
            </div>

            {
                !isLogin ? (
                    <>
                        <input type='checkbox' id='login' className='modal-toggle' />
                        <label htmlFor="login" className="modal cursor-pointer">
                            <label className="modal-box relative" htmlFor="">
                                {
                                    page ? <Login /> : <Register />
                                }

                                {
                                    page ? <div className='flex justify-center gap-2 mt-5'>
                                        <p>Don't have any account?</p>
                                        <button className='text-emerald-600 font-semibold underline hover:no-underline' onClick={handleCLick}>Register</button>
                                    </div> : <div className='flex justify-center gap-2 mt-5'>
                                        <p>Already have an account?</p>
                                        <button className='text-emerald-600 font-semibold underline hover:no-underline' onClick={handleCLick}>Login</button>
                                    </div>
                                }
                            </label>
                        </label>
                    </>
                ) : null
            }
        </header>
    )
}
