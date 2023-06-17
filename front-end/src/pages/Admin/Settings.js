import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

export default function Settings() {
  const [status, setSataus] = useState([])

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

  const formik = useFormik({
    initialValues: {
      logo: '',
      coverImg: '',
      title: '',
      subTitle: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required !!!'),
      subTitle: Yup.string().required("Require !!!")
    }).shape({
      logo: Yup.mixed().required('Required !!!').test('fileSize', 'The file is too large', (value) => {
        // console.log(value)
        setLogo(value.name)

        return value.size <= 9000
      }),
      coverImg: Yup.mixed().required('Required !!!').test('fileSize', 'The file is too large', (value) => {
        // console.log(value)
        setCoverImg(value.name)

        return value.size <= 80000
      })
    }),
    onSubmit: (value, { setSubmitting }) => {
      console.log(value)

      setSubmitting(false)
    }
  })

  useEffect(() => {
    axios.get('/status')
      .then(res => setSataus(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Settings</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
          <div className='md:w-1/3 w-full'>
            <h6 className='font-semibold'>Logo</h6>
            <p className='text-sm'>Upload your website logo from here</p>
          </div>

          <div className='md:w-2/3 w-full bg-white border rounded p-6'>
            <input
              ref={logoRef}
              type='file' name='logo'
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

            {
              formik.errors.logo && formik.touched.logo && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.logo}</p>
            }
          </div>
        </div>

        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
          <div className='md:w-1/3 w-full'>
            <h6 className='font-semibold'>Cover Image</h6>
            <p className='text-sm'>Upload your cover image from here.<br /> Dimension of the avatar should be <span className='font-bold'>Full screen</span></p>
          </div>

          <div className='md:w-2/3 w-full bg-white border rounded p-6'>
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

            {
              formik.errors.coverImg && formik.touched.coverImg && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.coverImg}</p>
            }
          </div>
        </div>

        <div className='flex gap-4 md:flex-row flex-col py-8 border-dashed border-b-2'>
          <div className='md:w-1/3 w-full'>
            <h6 className='font-semibold'>Infomation</h6>
            <p className='text-sm'>Change your sie infomation from here</p>
          </div>

          <div className='md:w-2/3 w-full px-6 py-5 bg-white border rounded grid gap-4'>
            <div>
              <label htmlFor='title'>Site Title</label>
              <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='title' type='text' id='title' onChange={formik.handleChange} value={formik.values.title} />

              {
                formik.errors.title && formik.touched.title && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.title}</p>
              }
            </div>

            <div>
              <label htmlFor='subTitle'>Site Subtitle</label>
              <input className='border rounded py-2 w-full outline-emerald-500 px-3' name='subTitle' type='text' id='subTitle' onChange={formik.handleChange} value={formik.values.subTitle} />

              {
                formik.errors.subTitle && formik.touched.subTitle && <p className='mb-4 text-xs text-red-500 font-semibold'>{formik.errors.subTitle}</p>
              }
            </div>

            <div>
              <label htmlFor='status'>Status</label>
              <select name='status' id='status' className='border rounded py-2 w-full outline-emerald-500 px-3'>
                <option defaultValue={1} className='hidden'>----- Select -----</option>
                {
                  status.map(item => <option key={item.id} value={item.id}>{item.status}</option>)
                }
              </select>
            </div>
          </div>
        </div>

        <div className='text-end py-5'>
          <button className='text-white rounded py-2 px-7 bg-emerald-600 w-fit' type='submit' onClick={formik.handleSubmit}>Save Settings</button>
        </div>
      </form>
    </>
  )
}
