import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { AiOutlineCloudUpload } from 'react-icons/ai'

export default function EditShop() {
    const { id } = useParams()

    const [data, setData] = useState([])
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

    useEffect(() => {
        axios.get(`/shops/info/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id])

    console.log(data)

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

            setSubmitting(false)
        }
    })

    return (
        <>
            <h3 className='border-dashed border-b-2 py-8 font-semibold'>Edit Shop</h3>

            <form>
                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Logo</h6>
                        <p className='text-sm'>Upload your shop logo from here</p>
                    </div>

                    <div className='md:w-2/3 w-full bg-white border rounded flex justify-center min-h-full items-center p-6'>
                        <input
                            ref={logoRef}
                            type='file' name='avatar'
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

                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Cover Image</h6>
                        <p className='text-sm'>Upload your shop cover image from here.<br /> Dimension of the avatar should be 1170 x 435px</p>
                    </div>

                    <div className='md:w-2/3 w-full bg-white border rounded flex justify-center min-h-full items-center p-6'>
                        <input
                            ref={coverImgRef}
                            type='file' name='coverImg'
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
                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Basic Info</h6>
                        <p className='text-sm'>Add some basic info about your shop from here</p>
                    </div>

                    <div className='md:w-2/3 w-full px-6 py-5 bg-white border rounded grid gap-4'>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' onChange={formik.handleChange} value={formik.values.name} />
                        </div>

                        <div>
                            <label htmlFor='description'>Description</label>
                            <textarea className='border rounded py-2 w-full outline-emerald-500 px-3' rows={5} name='description' type='text' id='description' />
                        </div>
                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Shop Address</h6>
                        <p className='text-sm'>Add your physical shop address from here</p>
                    </div>

                    <div className='md:w-2/3 w-full px-6 py-5 bg-white border rounded grid gap-4'>
                        <div>
                            <label htmlFor='country'>Country</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='country' type='text' id='country' />
                        </div>

                        <div>
                            <label htmlFor='city'>City</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='city' type='text' id='city' />
                        </div>

                        <div>
                            <label htmlFor='street'>Street Address</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='street' type='text' id='street' />
                        </div>
                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Shop Settings</h6>
                        <p className='text-sm'>Add your shop settings infomation from here</p>
                    </div>

                    <div className='md:w-2/3 w-full px-6 py-5 bg-white border rounded grid gap-4'>
                        <div>
                            <label htmlFor='phone'>Contact Number</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='phone' type='text' id='phone' />
                        </div>

                        <div>
                            <label htmlFor='website'>Website</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='website' type='text' id='website' />
                        </div>
                    </div>
                </div>

                <div className='py-8 text-end'>
                    <button className='text-white rounded py-2 px-4 bg-emerald-600 w-fit'>Update</button>
                </div>
            </form>
        </>
    )
}

