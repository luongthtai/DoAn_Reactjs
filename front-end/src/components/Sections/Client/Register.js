import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function Register() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const [changeHide, setChangeHide] = useState(false)

    const handleHide = (e) => {
        e.preventDefault()
        setChangeHide(!changeHide)
    }

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
        onSubmit: (values, { resetForm }) => {
            axios.post('/users/register', values)
                .then(res => {
                    if (res.status === 200) {
                        setTimeout(() => {
                            setSuccess(false)
                        }, 3000)

                        setSuccess(true)
                        resetForm()
                    }
                })
                .catch(err => {
                    console.log(err)
                    setError(true)
                })
        }
    })

    return (
        <div className='grid gap-10'>
            <div className='text-center grid gap-5'>
                <h3 className='font-extrabold text-3xl'>Pick <span className='text-green-500'>Bazar</span></h3>
                <p>By signing up, you agree to uor <Link className='text-emerald-600 underline'>terms</Link> & <Link className='text-emerald-600 underline'>policy</Link></p>
                {
                    success ? <p className='bg-green-500 rounded-sm text-white p-2'>Register Success !!</p> : null
                }
                {
                    error ? <p className='bg-red-500 rounded-sm text-white p-2'>Error server !!</p> : null
                }
            </div>


            <form className='grid gap-5' onSubmit={formik.submitForm}>
                <div>
                    <label htmlFor='name' className='font-semibold'>Name</label>
                    <input type='text' name='name' id='name' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.name} />
                    {
                        formik.errors.name && formik.touched.name && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.name}</p>
                    }
                </div>

                <div>
                    <label htmlFor='email' className='font-semibold'>Email</label>
                    <input type='email' name='email' id='email' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.email} />
                    {
                        formik.errors.email && formik.touched.email && <p className='mb-4 text-xs text-red-400 font-semibold'>{formik.errors.email}</p>
                    }
                </div>

                <div>
                    <label htmlFor='password' className='font-semibold'>Password</label>

                    <div className='relative'>
                        <input type={changeHide ? 'text' : 'password'} name='password' id='password' className='border rounded py-2 w-full outline-emerald-500 px-3' onChange={formik.handleChange} value={formik.values.password} />
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

                <button type='button' className='text-white rounded py-2 bg-emerald-600 w-full' onClick={formik.submitForm}>Register</button>
            </form>

            <div className="divider m-0">OR</div>
        </div>
    )
}
