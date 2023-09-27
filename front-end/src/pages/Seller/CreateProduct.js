import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'

export default function CreateProduct() {
    const notify = () => toast.success('Create product success !!!')

    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState([])

    const [fileNameImage, setFileNameImage] = useState('')
    const [fileNameGallery, setFileNameGallery] = useState('')

    const idShop = useSelector(state => state.shop.idShop)

    const imageRef = useRef()
    const gallery = useRef()

    const clickAddImage = () => {
        imageRef.current.click()
    }

    const clickAddGallery = () => {
        gallery.current.click()
    }

    useEffect(() => {
        if (idShop) {
            axios.get(`/categories/shop/${idShop}`)
                .then(res => setCategories(res.data))
                .then(res => axios.get('/status'))
                .then(res => setStatus(res.data))
                .catch(err => console.log(err))
        }
    }, [idShop])

    var initialValues = {
        image: '',
        gallery: '',
        name: '',
        description: '',
        price: '',
        salePrice: '',
        category: '',
        status: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Required !!!'),
            description: Yup.string().required('Required !!!'),
            price: Yup.number().min(0, 'So am nay').required('Required !!!'),
            salePrice: Yup.number().min(0, 'So am nay').required('Required !!!'),
            category: Yup.number().required('Required !!!'),
            status: Yup.number().required('Required !!!'),
        }).shape({
            image: Yup.mixed().required('Required !!!').test('fileSize', 'The file is too large', (value) => {
                // console.log('image', value.size)
                setFileNameImage(value.name)

                return value.size <= 900000
            }),
            gallery: Yup.mixed().required('Required !!!').test('fileSize', 'The file is to large', (value) => {
                // console.log('gallery', value)
                setFileNameGallery(value.name)

                return value.size <= 900000
            })
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const formData = new FormData()

            formData.append('image', values.image)
            formData.append('gallery', values.gallery)
            formData.append('name', values.name)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('salePrice', values.salePrice)
            formData.append('category', values.category)
            formData.append('status', values.status)

            axios.post(`/products/create/${idShop}`, formData)
                .then(res => {
                    notify()
                    setFileNameGallery('')
                    setFileNameImage('')
                    resetForm()
                })
                .catch(err => console.log(err))

            setSubmitting(false)
        }
    })

    return (
        <section>
            <ToastContainer
                position='top-right'
            />
            <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Create New Product</h3>

            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Feature Image</h6>
                        <p className='text-sm'>Upload your product feature image here</p>
                    </div>

                    <div className='w-full bg-white rounded p-6'>
                        <input
                            ref={imageRef}
                            type='file' name='image'
                            accept="image/*"
                            className='hidden'
                            onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                        />

                        <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={clickAddImage}>
                            <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                <AiOutlineCloudUpload className='text-3xl' />
                                <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                {
                                    fileNameImage && <p>{fileNameImage}</p>
                                }
                            </div>
                        </div>

                        {
                            formik.errors.image && formik.touched.image && <p className='text-xs text-red-500 mt-2 font-semibold'>{formik.errors.image}</p>
                        }
                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Gallery</h6>
                        <p className='text-sm'>Upload your product image gallery here</p>
                    </div>

                    <div className='w-full bg-white border rounded p-6'>
                        <input
                            ref={gallery}
                            type='file' name='gallery'
                            multiple
                            accept="image/*"
                            className='hidden'
                            onChange={(e) => formik.setFieldValue('gallery', e.currentTarget.files[0])}
                        />

                        <div className='w-full h-44 rounded border-dashed border-2 hover:border-emerald-500 cursor-pointer duration-150 flex items-center justify-center' onClick={clickAddGallery}>
                            <div className='flex flex-col items-center gap-2 text-emerald-500'>
                                <AiOutlineCloudUpload className='text-3xl' />
                                <p className='text-sm text-semibold font-semibold text-center'>Upload an image <span className='text-black'>or drag and drop WEPB, JPG</span></p>
                                {
                                    fileNameGallery && <p>{fileNameGallery}</p>
                                }
                            </div>
                        </div>

                        {
                            formik.errors.gallery && formik.touched.gallery && <p className='text-xs text-red-500 mt-2 font-semibold'>{formik.errors.gallery}</p>
                        }
                    </div>
                </div>

                <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed'>
                    <div className='md:w-1/3 w-full'>
                        <h6 className='font-semibold'>Product Infomation</h6>
                        <p className='text-sm'>Edit your product infomation from here</p>
                    </div>

                    <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                        <div>
                            <label htmlFor='name'>Name*</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' onChange={formik.handleChange} value={formik.values.name} />
                            {
                                formik.errors.name && formik.touched.name && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='description'>Description</label>
                            <textarea name='description' rows={5} className='w-full py-2 border rounded outline-emerald-500 px-3' id='description' onChange={formik.handleChange} value={formik.values.description} />
                            {
                                formik.errors.description && formik.touched.description && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.description}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='price'>Price*</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='price' type='number' id='price' onChange={formik.handleChange} value={formik.values.price} />
                            {
                                formik.errors.price && formik.touched.price && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.price}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='salePrice'>Sale Price*</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='salePrice' type='number' id='salePrice' onChange={formik.handleChange} value={formik.values.salePrice} />
                            {
                                formik.errors.price && formik.touched.price && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.price}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='category' className='capitalize'>Category*</label>
                            <select className='border rounded py-2 w-full outline-emerald-500 px-3' name='category' id='category' onChange={formik.handleChange}>
                                <option defaultValue={1} className='hidden capitalize'>------ Select ------</option>
                                {
                                    categories.map(item => <option key={item.id} className='capitalize' value={item.id}>{item.category_name}</option>)
                                }
                            </select>
                            {
                                formik.errors.category && formik.touched.category && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.category}</p>
                            }
                        </div>

                        <div>
                            <label>Status</label>

                            <div>
                                {
                                    status.map(item =>
                                        <div key={item.id}>
                                            <input type='radio' name='status' value={item.id} id={item.status} onChange={(e) => formik.setFieldValue('status', e.target.value)} />
                                            <label htmlFor={item.status} className='ml-2'>{item.id === 1 ? 'Draft' : 'Publish'}</label>
                                        </div>)
                                }

                                {
                                    formik.errors.status && formik.touched.status && <p className='mb-4 mt-2 text-xs text-red-500 font-semibold'>{formik.errors.status}</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-3 font-bold'>
                    <button className='border-2 rounded-lg border-gray-400 px-4 py-2 text-gray-400 hover:bg-emerald-500 hover:border-emerald-500 duration-100 hover:text-white' type='button'>Back</button>
                    <button className='border-2 bg-emerald-500 border-emerald-500 text-white rounded-lg px-4 py-2' type='button' onClick={formik.handleSubmit}>Create Product</button>
                </div>
            </form>
        </section>
    )
}
