import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { Link, Navigate } from 'react-router-dom'
import { TiDelete } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { CgMenuLeft } from 'react-icons/cg'
import { logoutShop } from 'redux/reducers/Shop'
import { logout } from 'redux/reducers/Auth'
import SideBarDrawer from 'components/Sections/Admin/SideBarDrawer'

export default function ProfileUpdate() {
    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.user.id)
    const isLogin = useSelector(state => state.auth.isLogin)

    const [data, setData] = useState([])
    const [loadImg, setLoadImg] = useState(true)

    const [toggleSidebar, setToggleSidebar] = useState(false)

    // set value avatar
    const [avatar, setAvatar] = useState('')

    // set value infomation
    const [infomation, setInfomation] = useState({
        name: '',
        descripe: '',
        phone: ''
    })


    // handle avatar
    const handleChangeFile = (e) => {
        setAvatar(e.target.files[0])
    }

    // handle infomation
    const handleChange = (e) => {
        setInfomation({
            ...infomation,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        axios.get(`/users/${id}`)
            .then(res => {
                setLoadImg(false)
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleToggle = () => {
        setToggleSidebar(!toggleSidebar)
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(logoutShop())
    }

    // submit
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('avatar', avatar)


        if (avatar) {
            axios.post(`/update/avatar/${id}`, formData)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }

        if (infomation) {
            axios.post(`/users/update/${id}`, infomation)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }

    if (isLogin) {
        return (
            <>
                <header className='py-3 w-full z-50 shadow fixed bg-white'>
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
                                                        className='rounded-full'
                                                    /> : <BiUser />
                                            }
                                        </label>

                                        <ul tabIndex={0} className="dropdown-content bg-base-100 top-full right-0 w-44 translate-y-2 text-sm font-semibold shadow rounded">
                                            <li className='py-2 px-4 bg-emerald-600 text-white rounded-t'>
                                                <h5>{item.user_name || 'Customer'}</h5>
                                                <p className='text-xs'>{item.email || 'customer@demo.com'}</p>
                                            </li>
                                            <li><Link to='' className='hover:text-emerald-500 duration-100 px-4 py-2 block border-b'>Profile</Link></li>
                                            <li><button onClick={handleLogout} className='hover:text-emerald-500 duration-100 px-4 py-2 block '>Logout</button></li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </header>

                {
                    data.map(item =>
                        <main key={item.id} className='flex items-start pt-14'>
                            <aside className='w-2/12 lg:grid hidden justify-items-center text-center gap-3 pt-6 border-r sticky top-14 left-0'>
                                <div className='w-24 h-24 border rounded-full flex flex-col justify-center items-center'>
                                    {
                                        loadImg ? <p>Loading ...</p> :
                                            (
                                                item.avatar ? <img
                                                    src={item.avatar}
                                                    alt=''
                                                    className='rounded-full object-contain w-full h-full'
                                                /> : <BiUser />
                                            )
                                    }
                                </div>

                                <div>
                                    <h5 className='font-bold'>{item.user_name}</h5>
                                    <p className='text-sm text-slate-400'>{item.email}</p>
                                    <p className='text-sm text-slate-400'>{item.phone || 'null'}</p>
                                </div>

                                <button disabled className='border px-2 pr-3 rounded-sm flex items-center gap-1'><TiDelete className='text-red-500' />Disabled</button>
                            </aside>

                            <section className='lg:w-10/12 w-full bg-gray-100 pt-10 p-6'>
                                <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Profile Settings</h3>

                                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                                    <div className='md:w-1/3 w-full'>
                                        <h6 className='font-semibold'>Email</h6>
                                        <p className='text-sm'>Chang your email from here</p>
                                    </div>

                                    <form className='md:w-2/3 w-full grid gap-2' method='post'>
                                        <div className='bg-white px-6 py-5 rounded border'>
                                            <label htmlFor='email'>Email</label>
                                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='email' type='email' id='email' defaultValue={item.email} placeholder={item.email} />
                                        </div>

                                        <button className='text-white rounded py-2 px-4 bg-emerald-600 w-fit'>Save</button>
                                    </form>
                                </div>

                                <form onSubmit={handleSubmit} method='post'>
                                    <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                                        <div className='md:w-1/3 w-full'>
                                            <h6 className='font-semibold'>Avatar</h6>
                                            <p className='text-sm'>Upload your profile image from here. Dimension of the avatar should be 140 x 140px</p>
                                        </div>

                                        <div className='md:w-2/3 w-full bg-white border rounded flex justify-center h-40 items-center p-6'>
                                            <input onChange={handleChangeFile} type='file' name='avatar' className='border-dashed file:bg-green-100 file:border-0 file:text-emerald-500 file:rounded-full file:px-2 file:py-1 file:font-semibold text-slate-500 border p-2 rounded' />
                                        </div>
                                    </div>

                                    <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                                        <div className='md:w-1/3 w-full'>
                                            <h6 className='font-semibold'>Email Notification</h6>
                                            <p className='text-sm'>Set your email notification for messaging feature</p>
                                        </div>

                                        <div className='md:w-2/3 w-full px-6 py-5 bg-white border rounded grid gap-4'>
                                            <div>
                                                <label htmlFor='notification'>Notification email</label>
                                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='notification' type='text' id='notification' />
                                            </div>

                                            <div className='flex items-center gap-3'>
                                                <input type="checkbox" className="toggle" />
                                                <label>Enable Notification</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                                        <div className='md:w-1/3 w-full'>
                                            <h6 className='font-semibold'>Infomation</h6>
                                            <p className='text-sm'>Add your profile infomation from here</p>
                                        </div>

                                        <div className='md:w-2/3 w-full grid gap-3'>
                                            <div className=' px-6 py-5 bg-white border rounded grid gap-4'>
                                                <div>
                                                    <label htmlFor='name'>Name</label>
                                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' defaultValue={item.user_name} placeholder={item.user_name} onChange={handleChange} />
                                                </div>

                                                <div>
                                                    <label htmlFor='bio'>Bio</label>
                                                    <textarea name='descripe' rows={5} className='w-full py-2 border rounded outline-emerald-500 px-3' onChange={handleChange} defaultValue={item.descripe} />
                                                </div>

                                                <div>
                                                    <label htmlFor='contactNumber'>Contact Number</label>
                                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='phone' type='text' id='contactNumber' defaultValue={item.phone} placeholder={item.phone || 'null'} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <button onClick={handleSubmit} type='submit' className='text-white rounded py-2 px-4 bg-emerald-600 w-fit'>Save</button>
                                        </div>
                                    </div>
                                </form>

                                <div className='flex gap-4 md:flex-row flex-col py-8'>
                                    <div className='md:w-1/3 w-full'>
                                        <h6 className='font-semibold'>Password</h6>
                                        <p className='text-sm'>Change your password from here</p>
                                    </div>

                                    <form className='md:w-2/3 w-full grid gap-3'>
                                        <div className='bg-white grid gap-2 py-5 px-6 border'>
                                            <div>
                                                <label htmlFor='oldPass'>Old Password</label>
                                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='oldPass' type='password' id='oldPass' />
                                            </div>

                                            <div>
                                                <label htmlFor='newPass'>New Password</label>
                                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='newPass' type='password' id='newPass' />
                                            </div>

                                            <div>
                                                <label htmlFor='cfPass'>Confirm Password</label>
                                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='cfPass' type='password' id='cfPass' />
                                            </div>
                                        </div>

                                        <button className='text-white rounded py-2 px-4 bg-emerald-600 w-fit'>Change Password</button>
                                    </form>
                                </div>
                            </section>
                        </main>)
                }
                <SideBarDrawer onclick={handleToggle} toggle={toggleSidebar} />
            </>
        )
    }

    return (
        <Navigate to='/admin/login' />
    )
}
