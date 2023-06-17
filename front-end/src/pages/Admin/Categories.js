import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TiDelete } from 'react-icons/ti'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Categories() {

  const [data, setData] = useState([])
  const [mess, setMess] = useState(false)
  const [search, setSearch] = useState({
    search: ''
  })

  useEffect(() => {
    axios.get('/categories')
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
      <div className='flex justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold py-2'>Categories</h5>

        {
          data.length !== 0 ? <form className='flex items-center gap-4' onSubmit={handleSubmit}>
            {
              mess ? <p className='text-sm text-red-500 font-semibold'>Vui lòng nhập thông tin</p> : null
            }
            <input type='text' name='search' className='border rounded px-5 py-2 w-96 outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} />
          </form> : <p className='font-semibold'>Not data !!!!</p>
        }
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th>
              <th>Group</th>
              <th>Shop</th>
              <th className='text-end'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map(item => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td className='capitalize'>{item.category_name}</td>
                  <td className='capitalize'>{item.details}</td>
                  <td className='capitalize'>{item.commodity_name}</td>
                  <td>{item.name_shop}</td>
                  <td>
                    <div className='flex items-center justify-end gap-10 text-3xl'>
                      <button><TiDelete className='text-red-600' /></button>
                      <Link to=""><AiOutlineEye /></Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
