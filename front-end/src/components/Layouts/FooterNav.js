import React, { useEffect, useState } from 'react'
import { CgMenuLeft, CgShoppingBag } from 'react-icons/cg'
import { CiSearch } from 'react-icons/ci'
import { GrHomeRounded } from 'react-icons/gr'
import { HiOutlineUser } from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import MenuHeader from '../Sections/Client/MenuHeader'
import ProfileList from '../Sections/Client/ProfileList'
import CartList from '../Sections/Client/CartList'
import { BiShoppingBag } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Login from 'components/Sections/Client/Login'
import Register from 'components/Sections/Client/Register'

export default function FooterNav({ search }) {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleProfile, setToggleProfile] = useState(false)
    const [toggleCart, setToggleCart] = useState(false)
    const [page, setPage] = useState(true)

    const [dataCart, setDataCart] = useState([])

    const isLogin = useSelector(state => state.auth.isLogin)

    const id = useSelector(state => state.auth.user[0].id)

    const location = useLocation()

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleToggleProfile = () => {
        setToggleProfile(!toggleProfile)
    }

    const handleToggleCart = () => {
        setToggleCart(!toggleCart)
    }

    const handleCLick = () => {
        setPage(!page)
    }

    useEffect(() => {
        if (id) {
            const getData = axios.get(`/carts/${id}`)
                .then(res => setDataCart(res.data))
                .catch(err => console.log(err))

            if (getData.length !== 0) {
                setDataCart(getData)
            }
        }
    }, [id])

    return (
        <>
            <footer className='fixed z-10 bottom-0 left-0 w-full bg-white lg:hidden block p-3'>
                <nav>
                    <ul className='flex justify-between text-lg'>
                        <li>
                            <button onClick={setToggleMenu}><CgMenuLeft /></button>
                        </li>

                        {
                            search ? <li><CiSearch /></li> : null
                        }

                        <li><Link to='/'><GrHomeRounded /></Link></li>
                        <li className='relative' onClick={setToggleCart}>
                            <span className='bg-emerald-500 absolute -top-2  -right-3 rounded-full text-white w-5 text-sm flex justify-center items-center'>{dataCart.length}</span>
                            <CgShoppingBag />
                        </li>
                        <li>
                            {
                                isLogin ?
                                    <button onClick={setToggleProfile}><HiOutlineUser /></button>
                                    :
                                    <label htmlFor='loginMbl'><HiOutlineUser /></label>}
                        </li>
                    </ul>
                </nav>
            </footer>

            {
                location.pathname === '/' ?
                    isLogin && <button className="rounded-l bg-emerald-500 fixed top-1/2 -translate-y-1/2 right-0 p-3 gap-3 lg:grid hidden cursor-pointer hover:bg-emerald-600 duration-150" onClick={handleToggleCart}>
                        <div className="flex items-center gap-1 text-bold text-white">
                            <BiShoppingBag className="text-xl" />
                            <span>{dataCart.length} Items</span>
                        </div>

                        <p className="bg-white p-2 rounded text-emerald-500 font-bold text-center">${dataCart.length ? dataCart.map(item => item.price++) : 0}</p>
                    </button>
                    :
                    null
            }

            <MenuHeader toggle={toggleMenu} onclick={handleToggleMenu} />
            <ProfileList toggle={toggleProfile} onclick={handleToggleProfile} />
            <CartList toggle={toggleCart} onclick={handleToggleCart} />

            {
                !isLogin ? (
                    <>
                        <input type='checkbox' id='loginMbl' className='modal-toggle' />
                        <label htmlFor="loginMbl" className="modal cursor-pointer z-20">
                            <label className="modal-box relative z-20" htmlFor="">
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
        </>
    )
}
