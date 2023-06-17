import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import css from 'assets/style/components/EditProduct.module.scss'

export default function EditProduct() {
    const { id } = useParams()

    const [status, setStatus] = useState([])
    const [data, setData] = useState([])

    const [nameImage, setNameImage] = useState('')
    const [nameFeature, setNameFeature] = useState('')

    const imageRef = useRef()
    const featureImageRef = useRef()

    const handleClickImage = () => {
        imageRef.current.click()
    }

    const handleClickFeature = () => {
        featureImageRef.current.click()
    }

    useEffect(() => {
        axios.get('/status')
            .then(res => setStatus(res.data))
            .then(res => axios.get(`/products/info/${id}`))
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id])

    const formik = useFormik({
        initialValues: {
            image: '',
            featureImage: '',
            category: '',
            name: '',
            descripe: '',
            status: '',
            price: '',
            salePrice: '',
            quantity: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required !!!'),
            descripe: Yup.string().required('Required !!!'),
            price: Yup.number().required('Required !!!'),
            category: Yup.number().required('Required !!!'),
            status: Yup.number().required('Required !!!'),
            salePrice: Yup.number().required('Required !!!'),
            quantity: Yup.number().required('Required !!!')
        }).shape({
            image: Yup.mixed().required('Required !!!').test('fileSize', 'The file is to large', (value) => {
                setNameImage(value.name)

                return value.size <= 30000
            }),
            featureImage: Yup.mixed().required('Required !!!').test('fileSize', 'The file is to large', (value) => {
                setNameFeature(value.name)

                return value.size <= 30000
            }),
        }),
        onSubmit: (value) => {
            console.log(value)
        }
    })

    return (
        <section>
            <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Update Product</h3>

            {
                data.map(items =>
                    <form key={items.id} onSubmit={formik.handleSubmit}>
                        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                            <div className='md:w-1/3 w-full'>
                                <h6 className='font-semibold'>Feature Image</h6>
                                <p className='text-sm'>Upload your product feature image here</p>
                            </div>

                            <div className='w-full bg-white rounded p-6 grid gap-2'>
                                <input
                                    ref={imageRef}
                                    type='file' name='image'
                                    accept="image/*"
                                    className='hidden'
                                    onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                                />

                                <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={handleClickImage}>
                                    <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                        <AiOutlineCloudUpload className='text-3xl' />
                                        <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                        {
                                            nameImage && nameImage
                                        }
                                    </div>
                                </div>

                                {
                                    formik.errors.image && formik.touched.image && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.image}</p>
                                }

                                <img
                                    src={items.image}
                                    alt={items.product_name}
                                    className='w-20 border rounded'
                                />
                            </div>
                        </div>

                        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                            <div className='md:w-1/3 w-full'>
                                <h6 className='font-semibold'>Feature Image</h6>
                                <p className='text-sm'>Upload your product feature image here</p>
                            </div>

                            <div className='w-full bg-white rounded p-6'>
                                <input
                                    ref={featureImageRef}
                                    type='file' name='featureImage'
                                    accept="image/*"
                                    className='hidden'
                                    onChange={(e) => formik.setFieldValue('featureImage', e.currentTarget.files[0])}
                                />

                                <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={handleClickFeature}>
                                    <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                        <AiOutlineCloudUpload className='text-3xl' />
                                        <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                        {
                                            nameFeature && nameFeature
                                        }
                                    </div>
                                </div>

                                {
                                    formik.errors.featureImage && formik.touched.featureImage && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.featureImage}</p>
                                }
                            </div>
                        </div>

                        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                            <div className='md:w-1/3 w-full'>
                                <h6 className='font-semibold'>Group & Categories</h6>
                                <p className='text-sm'>Select product group and categories from here</p>
                            </div>

                            <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                                <div>
                                    <label htmlFor='group'>Group*</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='group' type='text' id='group' />
                                </div>

                                <div>
                                    <label htmlFor='category'>Categories</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='category' type='number' id='category' onChange={formik.handleChange} value={formik.values.category} />
                                    {
                                        formik.errors.category && formik.touched.category && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.category}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                            <div className='md:w-1/3 w-full'>
                                <h6 className='font-semibold'>Description</h6>
                                <p className='text-sm'>Edit your product description and necessary infomation from here</p>
                            </div>

                            <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                                <div>
                                    <label htmlFor='name'>Name*</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3 capitalize' name='name' type='text' id='name' onChange={formik.handleChange} value={formik.values.name} />
                                    {
                                        formik.errors.name && formik.touched.name && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                                    }
                                </div>

                                <div>
                                    <label htmlFor='descripe'>Description</label>
                                    <textarea className='border rounded py-2 w-full outline-emerald-500 px-3' rows={5} name='descripe' id='descripe' value={formik.values.descripe} onChange={formik.handleChange} />
                                    {
                                        formik.errors.descripe && formik.touched.descripe && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.descripe}</p>
                                    }
                                </div>

                                <div>
                                    <label htmlFor='status'>Status</label>

                                    <div id={css.root}>
                                        {
                                            status.map(item =>
                                                <div className='flex items-center gap-2' key={item.id}>
                                                    <input
                                                        type='radio' name='status' value={item.id} id={item.status}
                                                        onChange={(e) => formik.setFieldValue('status', e.target.value)}
                                                        defaultChecked={items.status_id === item.id ? false : true}
                                                    />

                                                    <label htmlFor={item.status}>{item.id === 1 ? 'Draft' : 'Published'}</label>
                                                </div>
                                            )
                                        }
                                    </div>

                                    {
                                        formik.errors.status && formik.touched.status && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.status}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed'>
                            <div className='md:w-1/3 w-full'>
                                <h6 className='font-semibold'>Product Infomation</h6>
                                <p className='text-sm'>Edit your product description and necessary infomation from here</p>
                            </div>

                            <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                                <div>
                                    <label htmlFor='price'>Price*</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='price' type='number' id='price' onChange={formik.handleChange} value={formik.values.price} />
                                    {
                                        formik.errors.price && formik.touched.price && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.price}</p>
                                    }
                                </div>

                                <div>
                                    <label htmlFor='salePrice'>Sale Price</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='salePrice' type='number' id='salePrice' onChange={formik.handleChange} value={formik.values.salePrice} />
                                    {
                                        formik.errors.salePrice && formik.touched.salePrice && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.salePrice}</p>
                                    }
                                </div>

                                <div>
                                    <label htmlFor='quantity'>Quantity*</label>
                                    <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='quantity' type='number' id='quantity' onChange={formik.handleChange} value={formik.values.quantity} />
                                    {
                                        formik.errors.quantity && formik.touched.quantity && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.quantity}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-end gap-3 font-semibold'>
                            <button className='border-gray-500 border text-gray-500 rounded-lg px-4 py-2' type='button'>Back</button>
                            <button className='border-2 bg-emerald-500 border-emerald-500 text-white rounded-lg px-4 py-2' type='submit' onClick={formik.handleSubmit}>Update Product</button>
                        </div>
                    </form>
                )
            }
        </section>
    )
}
