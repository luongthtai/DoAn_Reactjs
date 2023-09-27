import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import Login from 'components/Sections/Client/Login'

export default function CreateShop() {
    const id = useSelector(state => state.auth.user.id)
    const checkShop = useSelector(state => state.auth.role)

    const notify = (title) => toast.error(title)

    const [logo, setLogo] = useState('')
    const [coverImg, setCoverImg] = useState('')

    const logoRef = useRef()
    const coverImgRef = useRef()

    const clickAddLogo = () => {
        logoRef.current.click()
    }

    const clickAddCoverImg = () => {
        coverImgRef.current.click()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            logo: '',
            id: id,
            coverImg: '',
            description: '',
            country: '',
            city: '',
            address: '',
            phone: '',
            website: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required !!!'),
            description: Yup.string().required('Required !!!'),
            country: Yup.string().required('Required !!!'),
            city: Yup.string().required('Required !!!'),
            address: Yup.string().required('Required !!!'),
            phone: Yup.string().matches(/[0-9]/, 'Phone Number !!').min(10, "Don't phone number !!!").max(10, "Don't phone number !!!").required('Required !!!'),
            website: Yup.string().required('Required !!!')
        })
            .shape({
                logo: Yup.mixed().required('Required !!!').test('fileSize', 'The file is too large', (value) => {
                    // console.log(value)
                    setLogo(value.name)

                    return value.size <= 30000
                }),
                coverImg: Yup.mixed().required('Required !!!').test('fileSize', 'The file is to large', (value) => {
                    // console.log(value)
                    setCoverImg(value.name)

                    return value.size <= 300000
                })
            }),
        onSubmit: (values, { setSubmitting }) => {
            if (checkShop === 'seller' || checkShop === 'admin') {
                notify('Have you signed up for a shop?')
            }
            else {
                const formData = new FormData()

                formData.append('logo', values.logo)
                formData.append('name', values.name)
                formData.append('id', values.id)
                formData.append('coverImg', values.coverImg)
                formData.append('description', values.description)
                formData.append('country', values.country)
                formData.append('city', values.city)
                formData.append('address', values.address)
                formData.append('phone', values.phone)
                formData.append('website', values.website)

                axios.post('/shops/create', formData)
                    .then(res => <Navigate to='/admin' />)
                    .catch(err => console.log(err))
            }

            setSubmitting(false)
        }
    })

    if (!id) {
        return <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <Login />
        </div>
    }

    return (
        <main className='bg-gray-50 xl:py-16 pt-8 pb-16 min-h-screen px-8'>
            <ToastContainer
                position='top-right'
            />

            <section className='container m-auto mt-16 '>
                <h4 className='text-2xl font-bold mb-6 text-center'>Create Shop</h4>

                <form className='bg-white p-5 rounded shadow' onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    {/******** logo ***********/}
                    <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                        <div className='md:w-2/5 w-full'>
                            <h6 className='font-semibold'>Logo</h6>
                            <p className='text-sm'>Upload your shop logo from here</p>
                        </div>

                        <div className='w-full bg-white border rounded p-6'>
                            <input
                                ref={logoRef}
                                type='file' name='logo'
                                accept='image/jpeg, image/webp'
                                className='hidden'
                                onChange={(e) => formik.setFieldValue('logo', e.currentTarget.files[0])}
                            />

                            <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={clickAddLogo}>
                                <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                    <AiOutlineCloudUpload className='text-3xl' />
                                    <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                    {
                                        logo && <p>{logo}</p>
                                    }
                                </div>
                            </div>

                            {
                                formik.errors.logo && formik.touched.logo && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.logo}</p>
                            }
                        </div>
                    </div>

                    {/********** cover Image ***********/}

                    <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                        <div className='md:w-2/5 w-full'>
                            <h6 className='font-semibold'>Cover Image</h6>
                            <p className='text-sm'>Upload your shop cover image image from here</p>
                            <p className='text-sm'>Dimension of the cover image shoult be <span className='font-bold'>1170 x 435px</span></p>
                        </div>

                        <div className='w-full bg-white border rounded p-6' >
                            <input
                                ref={coverImgRef}
                                type='file' name='coverImg'
                                accept='image/jpeg, image/webp'
                                className='hidden'
                                onChange={(e) => formik.setFieldValue('coverImg', e.currentTarget.files[0])}
                            />

                            <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={clickAddCoverImg}>
                                <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                    <AiOutlineCloudUpload className='text-3xl' />
                                    <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                    {
                                        coverImg && <p>{coverImg}</p>
                                    }
                                </div>
                            </div>

                            {
                                formik.errors.coverImg && formik.touched.coverImg && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.coverImg}</p>
                            }
                        </div>
                    </div>

                    {/********** Infomation ***********/}

                    <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                        <div className='md:w-2/5 w-full'>
                            <h6 className='font-semibold'>Basic Infomation</h6>
                            <p className='text-sm'>Add some basic info about your shop from here</p>
                        </div>

                        <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>

                            {/********** Name Shop ***********/}
                            <div>
                                <label htmlFor='name'>Name*</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' onChange={formik.handleChange} value={formik.values.name} />
                                {
                                    formik.errors.name && formik.touched.name && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                                }
                            </div>

                            {/********** Description Shop ***********/}
                            <div>
                                <label htmlFor='description'>Description</label>
                                <textarea name='description' rows={5} className='w-full py-2 border rounded outline-emerald-500 px-3' id='description' onChange={formik.handleChange} value={formik.values.description} />
                                {
                                    formik.errors.description && formik.touched.description && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.description}</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/********** Address Shop ***********/}

                    <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                        <div className='md:w-2/5 w-full'>
                            <h6 className='font-semibold'>Shop Address</h6>
                            <p className='text-sm'>Add your physical shop address from here</p>
                        </div>

                        <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                            <div>
                                <label htmlFor='country'>Country</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='country' type='text' id='country' onChange={formik.handleChange} value={formik.values.country} />
                                {
                                    formik.errors.country && formik.touched.country && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.country}</p>
                                }
                            </div>

                            <div>
                                <label htmlFor='city'>City</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='city' type='text' id='city' onChange={formik.handleChange} value={formik.values.city} />
                                {
                                    formik.errors.city && formik.touched.city && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.city}</p>
                                }
                            </div>

                            <div>
                                <label htmlFor='address'>Street Address</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='address' type='text' id='address' onChange={formik.handleChange} value={formik.values.address} />
                                {
                                    formik.errors.address && formik.touched.address && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.address}</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/********** Setting Shop ***********/}

                    <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                        <div className='md:w-2/5 w-full'>
                            <h6 className='font-semibold'>Shop Settings</h6>
                            <p className='text-sm'>Add your shop settings infomation from here</p>
                        </div>

                        <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                            <div>
                                <label htmlFor='phone'>Contact Number</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='phone' type='text' id='phone' onChange={formik.handleChange} value={formik.values.phone} />
                                {
                                    formik.errors.phone && formik.touched.phone && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.phone}</p>
                                }
                            </div>

                            <div>
                                <label htmlFor='website'>Website</label>
                                <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='website' type='text' id='website' placeholder="http://" onChange={formik.handleChange} value={formik.values.website} />
                                {
                                    formik.errors.website && formik.touched.website && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.website}</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='text-end mt-5'>
                        <button className='border-2 bg-emerald-500 border-emerald-500 text-white rounded-lg px-4 py-2' type='button' onClick={formik.handleSubmit}>Create Shop</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

