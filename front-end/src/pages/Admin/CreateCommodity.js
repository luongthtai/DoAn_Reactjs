import axios from 'axios'
import SelectCommodity from 'components/Layouts/SelectCommodity'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

export default function CreateCommodity() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/icons')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      details: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required !!!'),
      details: Yup.string().required('Required !!!'),
    }),
    onSubmit: (value) => {
      axios.post('/commoditys/create', value)
        .catch(err => console.log(err))
    }
  })

  return (
    <>
      <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>Create Commodity</h3>

      <form className='grid gap-5 w-full' onSubmit={formik.handleSubmit}>
        <div className='flex gap-4 md:flex-row flex-col py-6 border-dashed'>
          <div className='md:w-2/5 w-full'>
            <h6 className='font-semibold'>Description</h6>
            <p className='text-sm'>Add commodity details and necessary infomation from here</p>
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
              <label htmlFor=''>Icon</label>
                <SelectCommodity data={data} value={'url_icon'} />
            </div>

            <div>
              <label className='pb-2 block' htmlFor='name'>Details</label>
              <textarea className='border rounded py-2 w-full outline-emerald-500 px-3' name='details' rows={5} id='name' onChange={formik.handleChange} value={formik.values.details} />
              {
                formik.errors.details && formik.touched.details && <p className='mb-4 mt-1 text-xs text-red-500 font-semibold'>{formik.errors.details}</p>
              }
            </div>
          </div>
        </div>

        <div className='text-end'>
          <button onClick={formik.handleSubmit} type='submit' className='border-2 bg-emerald-500 border-emerald-500 text-white rounded-lg px-4 py-2'>Create Commodity</button>
        </div>
      </form>
    </>
  )
}
