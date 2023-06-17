import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'

export default function Commoditys() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [commodity, setCommodity] = useState({
    commodity: ''
  })

  const [mess, setMess] = useState(false)

  useEffect(() => {
    if (commodity.commodity === '') {
      axios.get('/commoditys')
        .then(res => {
          setIsLoading(false)
          setData(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [commodity])

  const handleChange = (e) => {
    setCommodity({
      [e.target.name]: e.target.value
    })

    if (commodity.commodity === '') {
      setMess(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (commodity.commodity !== '') {
      axios.post('/commoditys/filter', commodity)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    } else {
      setMess(true)
    }
  }

  return (
    <>
      <div className='flex lg:flex-row lg:gap-0 flex-col gap-3 justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold'>Commoditys</h5>

        <form className='flex sm:flex-row flex-col items-center gap-4 w-full lg:w-2/3' onSubmit={handleSubmit}>
          {
            mess ? <p className='text-sm text-red-500 font-semibold'>Vui lòng nhập thông tin</p> : null
          }
          <input type='text' name='commodity' className='border rounded px-5 py-2 w-full outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} />

          <Link to='add' className='whitespace-nowrap bg-emerald-600 rounded font-semibold sm:w-44 w-full text-center text-white px-3 py-2'>+ Add commodity</Link>
        </form>
      </div>

      {
        isLoading ? (<p className='text-center font-semibold py-10'>Loading ....</p>) :
          (
            data.length === 0 ? <p className='text-center py-10 text-lg font-semibold'>Not data !!!</p> :
              <div className="overflow-x-auto py-5">
                <table className="table table-compact w-full text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Icon</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody className='text-gray-500'>
                    {
                      data.map(item =>
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td className='capitalize'>{item.commodity_name}</td>
                          <td>{item.commodity_name}</td>
                          <td>
                            <div className='flex gap-3 justify-center font-semibold'>
                              <button className='text-red-500'><AiOutlineDelete /></button>
                              <Link><BiPencil /></Link>
                            </div>
                          </td>
                        </tr>)
                    }
                  </tbody>
                </table>
              </div>
          )
      }
    </>
  )
}
