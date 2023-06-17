import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'redux/reducers/Auth'

export default function LoginAdmin() {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const isLogin = useSelector(state => state.auth.isLogin)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email !!').required('Require !!'),
            password: Yup.string().min(8, 'To short').required('Require !!')
        }),
        onSubmit: (values) => {
            axios.post('/users/login', values)
                .then(res => {
                    const data = res.data

                    if (Object.values(data).length === 0) {
                        setError(true)
                    } else {
                        dispatch(login(data))
                        setError(false)
                    }
                })
                .catch(err => console.log(err))
        }
    })

    if (!isLogin) {
        return (
            <section className='h-screen flex items-center bg-gray-100'>
                <div className='grid gap-10 container m-auto w-96 p-5 border rounded bg-white'>
                    <div className='text-center grid gap-5'>
                        <h3 className='font-extrabold text-3xl'>Pick <span className='text-green-500'>Bazar</span></h3>
                        <p>Login with your email & password</p>

                        {
                            error ? <p className='bg-red-500 rounded-sm text-white p-2'>Don't not match !!</p> : null
                        }
                    </div>

                    <form className='grid gap-5' onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor='email' className='font-semibold'>Email</label>
                            <input type='email' name='email' id='email' className='border rounded py-2 w-full outline-emerald-500 px-3' value={formik.values.email} onChange={formik.handleChange} />
                            {
                                formik.errors.email && formik.touched.email && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.email}</p>
                            }
                        </div>

                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='font-semibold'>Password</label>
                                <Link className='text-emerald-600 text-xs outline-none'>Forgot pasword?</Link>
                            </div>
                            <input type='password' name='password' id='password' className='border rounded py-2 w-full outline-emerald-500 px-3' value={formik.values.password} onChange={formik.handleChange} />
                            {
                                formik.errors.password && formik.touched.password && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.password}</p>
                            }
                        </div>

                        <button type='submit' onClick={formik.handleSubmit} className='text-white rounded py-2 bg-emerald-600 w-full outline-none'>Login</button>
                    </form>

                    <div className="divider m-0">OR</div>

                    <div className='text-center'>
                        <p className='inline-block'>Don't have any account?</p>
                        <Link to='/admin/register' className='text-emerald-500 underline font-semibold inline'>Register as Shop Owner</Link>
                    </div>
                </div>
            </section>
        )
    }

    return <Navigate to='/admin' />
}
