import React, { useEffect, useRef, useState } from 'react'
import AddressItem from '../../Layouts/AddressItem'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCloudUpload } from 'react-icons/ai'

export default function ProfileSection() {
    const id = useSelector(state => state.auth.user[0].id)

    const avatarRef = useRef()
    const [filenameAvatar, setFilenameAvatar] = useState('')

    const handleClickAvatar = () => {
        avatarRef.current.click()
    }

    const [data, setData] = useState([])

    const [avatar, setAvatar] = useState('')

    const [infomation, setInfomation] = useState({
        name: '',
        descripe: '',
        email: '',
        phone: ''
    })

    const notify = (notification) => toast.success(notification, {
        hideProgressBar: true,
    })

    const handleChange = (e) => {
        setInfomation({
            ...infomation,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeFile = (e) => {
        setAvatar(e.target.files[0])
        setFilenameAvatar(e.target.files[0].name)
    }

    const handleSubmitInfo = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('avatar', avatar)

        if (avatar) {
            axios.post(`/update/avatar/${id}`, formData)
                .then(res => {
                    notify('Update Avatar Success !!!')
                    setAvatar('')
                    setFilenameAvatar('')
                })
                .then(res => axios.get(`users/${id}`))
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }

        if (infomation.name || infomation.descripe || infomation.email || infomation.phone) {
            axios.post(`/users/update/${id}`, infomation)
                .then(res => {
                    notify('Update Infomation Success !!!')
                    setInfomation({
                        name: '',
                        descripe: '',
                        email: '',
                        phone: ''
                    })
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        axios.get(`users/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <ToastContainer
                position='bottom-right'
                autoClose={4000}
            />

            {data.map(item => (
                <section className='grid gap-4' key={item.id}>
                    <form className='bg-white p-8 border rounded grid gap-5' onSubmit={handleSubmitInfo}>
                        <div className='grid gap-3'>
                            <div className='rounded'>
                                <input
                                    ref={avatarRef}
                                    type='file' name='avatar'
                                    className='hidden'
                                    onChange={handleChangeFile} />

                                <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={handleClickAvatar}>
                                    <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                        <AiOutlineCloudUpload className='text-3xl' />
                                        <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                        {
                                            filenameAvatar && <p>{filenameAvatar}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            {
                                item.avatar ? <img
                                    src={item.avatar}
                                    alt=''
                                    className='h-20'
                                /> : null
                            }
                        </div>

                        <div>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text' name='name' id='name' className='w-full border p-2 rounded outline-emerald-500' defaultValue={item.user_name} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor='bio'>Bio</label>
                            <textarea rows={3} id='bio' name='descripe' className='w-full border p-2 rounded outline-emerald-500' onChange={handleChange} defaultValue={item.descripe} />
                        </div>

                        <button onClick={handleSubmitInfo} className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white w-fit'>Save</button>
                    </form>

                    <form className='bg-white p-8 border rounded grid gap-5' onSubmit={handleSubmitInfo}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' className='w-full border p-2 rounded outline-emerald-500' defaultValue={item.email} onChange={handleChange} />
                        </div>

                        <button onClick={handleSubmitInfo} type='submit' className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white w-fit'>Update</button>
                    </form>

                    <div className='bg-white p-8 border rounded grid gap-5'>
                        <div className='flex justify-between'>
                            <h3 className='text-xl'>Contact Number</h3>
                            <label htmlFor='addPhone' className='font-semibold text-emerald-600'>+ Update</label>
                        </div>

                        <input disabled type='text' className="cursor-not-allowed w-full border p-2 rounded outline-emerald-500" defaultValue={item.phone} onChange={handleChange} />
                    </div>

                    <div className='bg-white p-8 border rounded grid gap-5'>
                        <div className='flex justify-between'>
                            <h3 className='text-xl'>Addresses</h3>
                            <label htmlFor='addAddress' className='font-semibold text-emerald-600'>+ Add</label>
                        </div>

                        <div className='grid 2xl:grid-cols-3 md:grid-cols-2 gap-3'>
                            <AddressItem />
                            <AddressItem />
                        </div>
                    </div>


                    {/*  modal phone number */}
                    <input type="checkbox" id="addPhone" className="modal-toggle" />
                    <label htmlFor="addPhone" className="modal cursor-pointer">
                        <label className="modal-box relative text-center rounded" htmlFor="">
                            <h3 className="text-lg font-bold pb-2">Update Contact Number</h3>

                            <form className='flex'>
                                <input type="text" name="phone" className="w-full border p-2 rounded-l outline-emerald-500" onChange={handleChange} defaultValue={item.phone} />
                                <button type='submit' className='font-semibold px-4 py-2 bg-emerald-600 rounded-r text-white w-fit whitespace-nowrap' onClick={handleSubmitInfo}>Update Contact</button>
                            </form>
                        </label>
                    </label>


                    {/* modal address */}
                    <input type="checkbox" id="addAddress" className="modal-toggle" />
                    <label htmlFor="addAddress" className="modal cursor-pointer">
                        <label className="modal-box relative w-96" htmlFor="">
                            <h3 className="text-lg font-bold text-center mb-3">Add New Address</h3>

                            <form className='grid gap-2'>
                                <div>
                                    <label>Type</label>

                                    <div className='flex gap-3 py-2'>
                                        <div className='flex gap-1'>
                                            <input type='radio' id='billing' name='type' value='billing' />
                                            <label htmlFor='billing'>Billing</label>
                                        </div>

                                        <div className='flex gap-1'>
                                            <input type='radio' id='shipping' name='type' value='shipping' />
                                            <label htmlFor='shipping'>Shipping</label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor='title'>Title</label>
                                    <input name='title' type='text' className="w-full border p-2 rounded-l outline-emerald-500" />
                                </div>

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <label htmlFor='country'>Country</label>
                                        <input type='text' name='country' className="w-full border p-2 rounded-l outline-emerald-500" />
                                    </div>

                                    <div>
                                        <label htmlFor='city'>City</label>
                                        <input type='text' name='city' className="w-full border p-2 rounded-l outline-emerald-500" />
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <label htmlFor='state'>State</label>
                                        <input type='text' name='state' className="w-full border p-2 rounded-l outline-emerald-500" />
                                    </div>

                                    <div>
                                        <label htmlFor='zip'>Zip</label>
                                        <input type='text' name='Zip' className="w-full border p-2 rounded-l outline-emerald-500" />
                                    </div>
                                </div>

                                <div>
                                    <label>Street Address</label>
                                    <textarea name='streetAddress' rows={4} className="w-full border p-2 rounded-l outline-emerald-500" />
                                </div>
                                <button className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white'>Update Address</button>
                            </form>
                        </label>
                    </label>
                </section >
            ))
            }
        </>
    )
}
