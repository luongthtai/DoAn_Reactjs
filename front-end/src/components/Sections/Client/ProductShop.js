import React, { useEffect, useState } from 'react'
import coverImg from 'assets/image/bgShop.webp'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import ProductItem from 'components/Layouts/ProductItem'

export default function ProductShop({ bgShop, idShop }) {
    const notify = (value) => toast.success(value)

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`/products/shop/${idShop}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [idShop])

    return (
        <article className='grid gap-6 justify-items-center px-8 lg:px-0'>
            <ToastContainer
                position='top-right'
                hideProgressBar
            />

            <img src={bgShop ? bgShop : coverImg} alt='' className='w-full rounded' />

            <section className='grid 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 w-full gap-4'>
                {
                    data.length !== 0 ? data.map(item => <ProductItem key={item.id} category={item.category_name} nameShop={item.name_shop} descripe={item.descripe} sell={item.sell} notify={notify} id={item.id} img={item.image} name={item.product_name} price={item.price} />) : <p className='underline font-semibold text-xl'>Not Product !!!</p>
                }
            </section>

            {
                data.length >= 10 ? <button className='text-white rounded py-2 bg-emerald-600 w-fit px-4'>Load More</button> : null
            }

        </article>
    )
}
