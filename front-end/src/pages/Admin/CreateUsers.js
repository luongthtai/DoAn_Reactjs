import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

export default function CreateUsers() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(8, 'To short !!').required('Require !!'),
            email: Yup.string().email('Email !!').required('Require !!'),
            password: Yup.string().min(8, 'It nhat 8 charactor').matches(/^[a-zA-Z0-9]*$/, 'ki tu dac biet').required('Require !!')
        }),
        onSubmit: (values) => {
            axios.post('/users/register', values)
                .then(res => {
                    if (res.status === 200) {
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)

                        setSuccess(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                    setTimeout(() => {
                        setError(false)
                    }, 3000)

                    setError(true)
                })
            console.log(values)
        }
    })

    return (
        <section>
            <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Create New Customer</h3>

            <div className='flex pt-5'>
                <div className='w-1/3 pt-10'>
                    <h5 className='text-sm font-semibold my-1'>Infomation</h5>
                    <p className='text-sm'>Add your customer infomation and create a new customer from here</p>
                </div>

                <form className='grid gap-5 w-2/3' onSubmit={formik.submitForm} method='post'>
                    <div className='bg-white px-6 py-8 rounded border grid gap-4'>
                        <div>
                            <label htmlFor='name' className='font-semibold'>Name</label>
                            <input type='text' name='name' id='name' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.name} />
                            {
                                formik.errors.name && formik.touched.name && <p className='text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='email' className='font-semibold'>Email</label>
                            <input type='email' name='email' id='email' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.email} />
                            {
                                formik.errors.email && formik.touched.email && <p className='text-xs text-red-400 font-semibold'>{formik.errors.email}</p>
                            }
                        </div>

                        <div>
                            <label htmlFor='password' className='font-semibold'>Password</label>
                            <input type='password' name='password' id='password' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.password} />
                            {
                                formik.errors.password && formik.touched.password && <p className='text-xs text-red-500 font-semibold'>{formik.errors.password}</p>
                            }
                        </div>

                        {
                            success ? <p className='text-green-500 font-semibold text-sm'>Success !!!</p> : null
                        }

                        {
                            error ? <p className='text-red-500 font-semibold text-sm'>Error !!!</p> : null
                        }
                    </div>

                    <div className='text-right'>
                        <button type='button' className='text-white rounded py-2 px-7 bg-emerald-600 w-fit' onClick={formik.submitForm}>Create Customer</button>
                    </div>
                </form>
            </div>
        </section>
    )
}
