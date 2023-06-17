import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { TiDelete } from 'react-icons/ti'
import { AiOutlineEye } from 'react-icons/ai'

export default function Shops() {
  const [data, setData] = useState([])
  const [mess, setMess] = useState(false)
  const [search, setSearch] = useState({
    search: ''
  })

  useEffect(() => {
    axios.get('/shops')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleChange = (e) => {
    setSearch({
      [e.target.name]: e.target.value
    })

    if (search.search === '') {
      setMess(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (search.search === '') {
      setMess(true)
    } else {
      setMess(false)
    }
  }

  return (
    <section>
      <div className='flex lg:flex-row lg:gap-0 flex-col justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold py-2'>Shops</h5>

        {
          data.length !== 0 ?
            <form className='flex sm:flex-row flex-col items-center gap-4' onSubmit={handleSubmit}>
              {
                mess ? <p className='text-sm text-red-500 font-semibold'>Vui lòng nhập thông tin</p> : null
              }
              <input type='text' name='search' className='border rounded px-5 py-2 w-96 outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} />
            </form>
            :
            <p className='font-semibold'>Not data !!!!</p>
        }
      </div>

      <div className="overflow-x-auto w-full mt-10 shadow">
        <table className="table table-xs w-full text-center">
          <thead>
            <tr>
              <th className='text-start'>Logo</th>
              <th className='text-start'>Name</th>
              <th>Owner Name</th>
              <th>Products</th>
              <th>Orders</th>
              <th>Status</th>
              <th className='text-end'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-500 font-semibold'>
            {
              data.map(item =>
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.logo}
                      alt={item.name_shop}
                      className='w-12 h-12 rounded-lg'
                    />
                  </td>
                  <td className='text-start'>{item.name_shop}</td>
                  <td>{item.user_name}</td>
                  <td>{item.product_count}</td>
                  <td>{item.name_shop}</td>
                  <td>
                    <p className='bg-emerald-500 rounded-full py-1 text-white'>Active</p>
                  </td>
                  <td>
                    <div className='flex items-center justify-end gap-10 text-3xl'>
                      <button><TiDelete className='text-red-600' /></button>
                      <Link to={`${item.id}`}><AiOutlineEye /></Link>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
