import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import LoadingScreen from 'components/Layouts/LoadingScreen'

export default function CategorySeller() {
  const [search, setSearch] = useState({
    product: ''
  })

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleChange = (e) => {
    setSearch({
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(search)
  }

  useEffect(() => {
    axios.get(`/categories`)
      .then(res => setData(res.data))
      .then(res => setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className='flex lg:flex-row lg:gap-0 flex-col gap-3 justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold'>Categories</h5>

        <form className='flex sm:flex-row flex-col justify-end items-center gap-4 w-full lg:w-2/3' onSubmit={handleSubmit}>
          {
            data.length !== 0 ? <input type='text' name='product' className='border rounded px-5 py-2 w-full outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} /> : null
          }

          <Link to='add' className='whitespace-nowrap bg-emerald-600 rounded font-semibold sm:w-44 w-full text-center text-white px-3 py-2'>+ Add Category</Link>
        </form>

      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table table-xs w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th>
              <th>Group</th>
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
    </>
  )
}
