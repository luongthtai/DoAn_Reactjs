import { useFormik } from 'formik'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as Yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

export default function ChangePassSection() {
  const notify = () => toast.success('Change password success !!!')
  const notifyErr = () => toast.error('Password not match !!!')

  const [oldPass, setOldPass] = useState(true)
  const [newPass, setNewPass] = useState(true)
  const [cfPass, setCfPass] = useState(true)

  const idUser = useSelector(state => state.auth.user.id)

  const formik = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
      confirmPass: ''
    },
    validationSchema: Yup.object({
      oldPass: Yup.string().required('Require !!!'),
      newPass: Yup.string().min(8, 'Password must be at least 8 characters').required('Require !!!'),
      confirmPass: Yup.string().oneOf([Yup.ref('newPass'), null], 'Password must match !!!')
    }),
    onSubmit: (value, { resetForm, setSubmitting }) => {
      axios.post(`/users/changePassword/${idUser}`, value)
        .then(res => {
          if (res.data) {
            notify()
            resetForm()
          } else {
            notifyErr()
          }
        })
        .catch(err => console.log(err))

      setSubmitting(false)
    }
  })

  return (
    <section className='bg-white p-8 border rounded grid gap-8'>
      <ToastContainer
        position='top-right'
      />
      <h3 className='text-lg font-bold'>Change Password</h3>

      <form className='grid gap-5 justify-items-end' onSubmit={formik.handleSubmit}>
        <div className='w-full'>
          <label htmlFor='oldPass' className='font-semibold block mb-2'>Old Password</label>

          <div className='relative'>
            <input type={`${oldPass ? 'password' : 'text'}`} name='oldPass' id='oldPass' className='w-full border p-2 rounded outline-emerald-500' onChange={formik.handleChange} value={formik.values.oldPass} />

            <button type='button' onClick={() => setOldPass(!oldPass)} className='absolute top-1/2 right-3 -translate-y-1/2 outline-none'>
              {
                oldPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            </button>
          </div>

          {
            formik.errors.oldPass && formik.touched.oldPass && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.newPass}</p>
          }

        </div>

        <div className='w-full'>
          <label htmlFor='newPass' className='font-semibold block mb-2'>New Password</label>

          <div className='relative'>
            <input type={`${newPass ? 'password' : 'text'}`} name='newPass' id='newPass' className='w-full border p-2 rounded outline-emerald-500' onChange={formik.handleChange} value={formik.values.newPass} />

            <button type='button' onClick={() => setNewPass(!newPass)} className='absolute top-1/2 right-3 -translate-y-1/2 outline-none'>
              {
                newPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            </button>
          </div>

          {
            formik.errors.newPass && formik.touched.newPass && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.newPass}</p>
          }

        </div>

        <div className='w-full'>
          <label htmlFor='confirmPass' className='font-semibold block mb-2'>Confirm Password</label>

          <div className='relative'>
            <input type={`${cfPass ? 'password' : 'text'}`} name='confirmPass' id='confirmPass' className='w-full border p-2 rounded outline-emerald-500' onChange={formik.handleChange} value={formik.values.confirmPass} />

            <button onClick={() => setCfPass(!cfPass)} type='button' className='absolute top-1/2 right-3 -translate-y-1/2 outline-none'>
              {
                cfPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            </button>
          </div>

          {
            formik.errors.confirmPass && formik.touched.confirmPass && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.confirmPass}</p>
          }

        </div>

        <button onClick={formik.handleSubmit} type='submit' className='font-semibold px-4 py-2 bg-emerald-600 rounded text-white w-fit outline-none'>Submit</button>
      </form>
    </section>
  )
}

