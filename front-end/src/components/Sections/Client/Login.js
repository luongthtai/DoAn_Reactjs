import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { BsPhone } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../../redux/reducers/Auth'

export default function Login() {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const [changeHide, setChangeHide] = useState(false)

    const handleHide = (e) => {
        e.preventDefault()

        setChangeHide(!changeHide)
    }

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

                    if (data) {
                        dispatch(login(data))
                        setError(false)
                    } else {
                        setError(true)
                    }
                })
                .catch(err => alert(err))
        }
    })

    return (
        <div className='grid gap-10'>
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

                    <div className='relative'>
                        <input type={changeHide ? 'text' : 'password'} name='password' id='password' className='border rounded py-2 w-full outline-emerald-500 px-3' value={formik.values.password} onChange={formik.handleChange} />
                        <button type='button' className='absolute top-1/2 right-3 -translate-y-1/2' onClick={handleHide}>
                            {
                                changeHide ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                            }
                        </button>
                    </div>
                        {
                            formik.errors.password && formik.touched.password && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.password}</p>
                        }
                </div>

                <button type='submit' onClick={formik.handleSubmit} className='text-white rounded py-2 bg-emerald-600 w-full outline-none'>Login</button>
            </form>

            <div className="divider m-0">OR</div>

            <div className='grid gap-3 pb-10 border-b'>
                <button type='button' className='w-full bg-blue-500 text-white rounded py-2 flex justify-center items-center gap-3'><AiOutlineGoogle /> Login with Google</button>
                <button type='button' className='w-full bg-slate-600 text-white rounded py-2 flex justify-center items-center gap-3'><BsPhone /> Login with Mobile number</button>
            </div>
        </div>
    )
}
