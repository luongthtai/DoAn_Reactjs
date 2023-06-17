import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

export default function CreateCategory() {
    const [commodity, setCommodity] = useState([])
    const [notif, setNotif] = useState(0)

    const idShop = useSelector(state => state.shop.idShop)

    const formik = useFormik({
        initialValues: {
            id: idShop,
            name: '',
            details: '',
            commodity: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required !!!'),
            details: Yup.string().required('Required !!!'),
            commodity: Yup.string().required('Required !!!'),
        }),
        onSubmit: (value) => {
            axios.post('/categories/create', value)
                .then(res => setNotif(1))
                .catch(err => {
                    setNotif(2)
                    console.log(err)
                })
        }
    })

    useEffect(() => {
        axios.get('/commoditys')
            .then(res => setCommodity(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Create New Category</h3>

            <form className='grid gap-5 w-full' onSubmit={formik.handleSubmit}>
                <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
                    <div className='md:w-2/5 w-full'>
                        <h6 className='font-semibold'>Description</h6>
                        <p className='text-sm'>Add category details and necessary infomation from here</p>
                    </div>

                    <div className=' px-6 py-5 bg-white border rounded grid gap-4 w-full'>
                        <div>
                            <label className='pb-2 block' htmlFor='name'>Name</label>
                            <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='name' type='text' id='name' onChange={formik.handleChange} value={formik.values.name} />
                            {
                                formik.errors.name && formik.touched.name && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                            }
                        </div>

                        <div>
                            <label className='pb-2 block' htmlFor='commodity'>Types</label>

                            <select name='commodity' id="commodity" className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.commodity}>
                                <option defaultValue={1}>------ Select ------</option>
                                {
                                    commodity.map(item => <option key={item.id} className='capitalize' value={item.id}>{item.commodity_name}</option>)
                                }
                            </select>
                            {
                                formik.errors.commodity && formik.touched.commodity && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.commodity}</p>
                            }
                        </div>

                        <div>
                            <label className='pb-2 block' htmlFor='name'>Details</label>
                            <textarea className='border rounded py-2 w-full outline-emerald-500 px-3' name='details' rows={5} id='name' onChange={formik.handleChange} value={formik.values.details} />
                            {
                                formik.errors.details && formik.touched.details && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.details}</p>
                            }
                        </div>

                        {
                            notif === 0 ? null : (<p className={`text-center mt-5 py-2 text-white rounded w-full ${notif === 1 ? 'bg-emerald-500' : 'bg-red-500'}`}>{notif === 1 ? 'Create success' : 'Error !!!'}</p>)
                        }
                    </div>
                </div>

                <div className='text-end'>
                    <button onClick={formik.handleSubmit} type='submit' className='border-2 bg-emerald-500 border-emerald-500 text-white rounded-lg px-4 py-2'>Create Category</button>
                </div>
            </form>
        </>
    )
}
