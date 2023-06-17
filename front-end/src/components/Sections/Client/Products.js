import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import ProductItem from 'components/Layouts/ProductItem'

export default function Products() {
  const notify = (title) => toast.success(title)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/products')
      .then(res => setData(res.data))
      .then(res => setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  if (isLoading) {
    return <p className='p-6'>Loading ...</p>
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        hideProgressBar
      />

      <section className='grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-6 pb-16 xl:pb-6 w-full '>

        {
          data.length !== 0 ? data.map(item => <ProductItem key={item.id} id={item.id} img={item.image} name={item.product_name} descripe={item.descripe} price={item.price} sell={item.sell} nameShop={item.name_shop} category={item.category_name} shopId={item.shop_id} notify={notify} />) : <p>Not product !!!</p>
        }
      </section>
    </>
  )
}
