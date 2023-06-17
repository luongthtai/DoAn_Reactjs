import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default function RegisterAdmin() {
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
            axios.post('/users/registerAdmin', values)
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
                    setError(true)
                })
        }
    })

    return (
        <section className='h-screen flex items-center bg-gray-100'>
            <div className='grid gap-10 container m-auto w-96 p-5 border rounded bg-white'>
                <div className='text-center grid gap-5'>
                    <h3 className='font-extrabold text-3xl'>Pick <span className='text-green-500'>Bazar</span></h3>
                    <p>Login with your email & password</p>
                    {
                        success ? <p className='bg-green-500 rounded-sm text-white p-2'>Register Success !!</p> : null
                    }
                    {
                        error ? <p className='bg-red-500 rounded-sm text-white p-2'>Error server !!</p> : null
                    }
                </div>

                <form className='grid gap-5' onSubmit={formik.handleSubmit}>
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

                    <button type='submit' onClick={formik.handleSubmit} className='text-white rounded py-2 bg-emerald-600 w-full outline-none'>Login</button>
                </form>

                <div className="divider m-0">OR</div>

                <div className='text-center'>
                    <p className='inline-block'>Already have an account?</p>
                    <Link to='/admin/login' className='text-emerald-500 underline font-semibold inline'>Login</Link>
                </div>
            </div>
        </section>
    )
}
