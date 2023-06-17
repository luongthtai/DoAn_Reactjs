import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import avatarDefault from 'assets/image/avatarDefault.png'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function Users() {
  const [data, setData] = useState([])
  const [mess, setMess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [customer, setCustomer] = useState({
    customer: ''
  })

  useEffect(() => {
    if (customer.customer === '') {
      axios.get('/users')
        .then(res => {
          setIsLoading(false)
          setData(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [customer])

  const handleChange = (e) => {
    setCustomer({
      [e.target.name]: e.target.value
    })

    if (customer.customer === '') {
      setMess(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (customer.customer !== '') {
      axios.post('/users/filter', customer)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    } else {
      setMess(true)
    }
  }

  const handleDelete = (id) => {
    setIsLoading(true)

    axios.delete(`/users/delete/${id}`)
      .then(res => console.log("success"))
      .then(res => axios.get('/users'))
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='flex lg:flex-row lg:gap-0 flex-col gap-3 justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold'>Customers</h5>

        <form className='flex sm:flex-row flex-col items-center gap-4 w-full lg:w-2/3' onSubmit={handleSubmit}>
          {
            mess ? <p className='text-sm text-red-500 font-semibold'>Vui lòng nhập thông tin</p> : null
          }
          <input type='text' name='customer' className='border rounded px-5 py-2 w-full outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} />

          <Link to='create' className='whitespace-nowrap bg-emerald-600 rounded font-semibold sm:w-44 w-full text-white px-3 py-2 text-center'>+ Add customer</Link>
        </form>
      </div>

      {
        isLoading ? <p className='text-center font-semibold py-10'>Loading...</p> :
          data.length === 0 ? <p className='text-center py-10 text-lg font-semibold'>Not data !!!</p> :
            <>
              <div className="overflow-x-auto py-5">
                <table className="table table-compact w-full text-center">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className='text-gray-500'>
                    {
                      data.map(item =>
                      (
                        <tr key={item.id}>
                          <td className='flex justify-center'>
                            <label htmlFor={item.email || undefined}>
                              <img
                                src={item.avatar ? item.avatar : avatarDefault}
                                alt={item.user_name}
                                className='w-10 h-10 object-contain rounded-lg'
                              />
                            </label>

                            {/* modal avatar */}
                            <input type="checkbox" id={item.email} className="modal-toggle" />
                            <label htmlFor={item.email} className="modal cursor-pointer">
                              <label className="modal-box relative" htmlFor="">
                                <img
                                  src={item.avatar ? item.avatar : avatarDefault}
                                  alt={item.user_name}
                                  className='w-full object-contain'
                                />
                              </label>
                            </label>
                          </td>
                          <td className='capitalize'>{item.user_name}</td>
                          <td>{item.email}</td>
                          <td>{<p className={`font-semibold ${item.status_id === 1 ? "text-red-600" : "text-emerald-500"}`}>{item.status}</p>}</td>
                          <td>
                            <div className='flex justify-center'>
                              <label htmlFor={item.user_name} className='text-red-500 cursor-pointer'><AiOutlineDelete /></label>
                            </div>

                            {/* modal delete */}
                            <input type="checkbox" id={item.user_name} className="modal-toggle" />
                            <label htmlFor={item.user_name} className="modal cursor-pointer">
                              <label className="modal-box relative grid gap-2 justify-items-center max-w-sm text-black" htmlFor="">
                                <RiDeleteBin6Line className='text-6xl text-emerald-500' />
                                <h4 className='font-bold text-xl'>Block Customer</h4>
                                <p className='text-lg whitespace-pre-wrap'>Are you sure you want block this customer ?</p>

                                <div className='grid grid-cols-2 w-full gap-2 mt-8'>
                                  <label htmlFor={item.user_name} className='bg-emerald-500 rounded py-2 font-bold text-lg text-white cursor-pointer'>Cancel</label>
                                  <button type='button' onClick={() => handleDelete(item.id)} className='bg-red-600 rounded py-2 font-bold text-lg text-white'>Block</button>
                                </div>
                              </label>
                            </label>
                          </td>
                        </tr>
                      )
                      )
                    }
                  </tbody>
                </table>
              </div>

              <div className='flex gap-2 justify-end'>
                <button className='outline-none w-7 h-7 border rounded bg-white flex justify-center items-center text-slate-500'><AiOutlineLeft /></button>
                <button className='outline-none w-7 h-7 border rounded bg-emerald-600 text-white'>1</button>
                <button className='outline-none w-7 h-7 border rounded bg-white flex justify-center items-center text-slate-500'><AiOutlineRight /></button>
              </div>
            </>
      }
    </>
  )
}
