import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ProductsShop() {
  const [search, setSearch] = useState({
    product: ''
  })

  const idShop = useSelector(state => state.shop.idShop)

  const [data, setData] = useState([])

  const handleChange = (e) => {
    setSearch({
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(search)
  }

  const handleDelete = (id) => {
    console.log(id)
  }

  useEffect(() => {
    axios.get(`/products/showAll/${idShop}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [idShop])

  return (
    <>
      <div className='flex lg:flex-row lg:gap-0 flex-col gap-3 justify-between w-full bg-white rounded p-5 items-center shadow'>
        <h5 className='font-bold'>Products</h5>

        <form className='flex sm:flex-row flex-col justify-end items-center gap-4 w-full lg:w-2/3' onSubmit={handleSubmit}>
          {
            data.length !== 0 ? <input type='text' name='product' className='border rounded px-5 py-2 w-full outline-emerald-600' placeholder='Type your query and press enter' onChange={handleChange} /> : null
          }

          <Link to='add' className='whitespace-nowrap bg-emerald-600 rounded font-semibold sm:w-44 w-full text-center text-white px-3 py-2'>+ Add Product</Link>
        </form>
      </div>

      <div className="overflow-x-auto py-5">
        <table className="table table-compact w-full text-center">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map(item =>
                <tr key={item.id}>
                  <td className='w-20'>
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className='w-16 h-16 rounded'
                    />
                  </td>
                  <td className='capitalize'>{item.product_name}</td>
                  <td className='capitalize'>{item.category_name}</td>
                  <td>${item.price}.00</td>
                  <td>{'Quantity'}</td>
                  <td>
                    <div className='flex justify-center'>
                      <p className={`text-white rounded-full py-1 w-20 text-center ${item.status_id === 1 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                        {item.status_id === 1 ? 'Published' : 'Draft'}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-center gap-3 font-semibold'>
                      <label htmlFor={item.product_name} className='text-red-500 cursor-pointer'><RiDeleteBin6Line /></label>
                      <Link to={`update/${item.id}`}><BiPencil /></Link>
                    </div>

                    {/* modal delete */}
                    <input type="checkbox" id={item.product_name} className="modal-toggle" />
                    <label htmlFor={item.product_name} className="modal cursor-pointer">
                      <label className="modal-box relative grid gap-2 justify-items-center max-w-sm text-black" htmlFor="">
                        <RiDeleteBin6Line className='text-6xl text-emerald-500' />
                        <h4 className='font-bold text-xl'>Block Customer</h4>
                        <p className='text-lg whitespace-pre-wrap'>Are you sure you want block this customer ?</p>

                        <div className='grid grid-cols-2 w-full gap-2 mt-8'>
                          <label htmlFor={item.product_name} className='bg-emerald-500 rounded py-2 font-bold text-lg text-white cursor-pointer'>Cancel</label>
                          <button type='button' onClick={() => handleDelete(item.id)} className='bg-red-600 rounded py-2 font-bold text-lg text-white'>Block</button>
                        </div>
                      </label>
                    </label>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
