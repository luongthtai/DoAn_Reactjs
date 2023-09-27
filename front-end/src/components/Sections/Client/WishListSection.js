import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import WishListItem from 'components/Layouts/WishListItem'

export default function WishListSection() {
    const notify = () => toast.success('Delete Success !!!')

    const [data, setData] = useState([])

    const idUser = useSelector(state => state.auth.user.id)

    const handleDelete = (value) => {
        axios.delete(`/wishlist/delete/${value}`)
            .then(res => {
                notify()
                axios.get(`/wishlist/${idUser}`)
                    .then(response => setData(response.data))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (idUser) {
            axios.get(`/wishlist/${idUser}`)
                .then(res => setData(res.data))
                .catch(err => console.log(err))
        }
    }, [idUser])

    return (
        <section className='bg-white p-8 border rounded'>
            <ToastContainer
                position='top-right'
            />

            <h3 className='text-lg font-bold text-center'>My Wishlists</h3>

            <div className='grid gap-4 mt-10'>
                {
                    data.length !== 0 ?
                        data.map(item => <WishListItem product={item.image} productName={item.product_name} shopName={item.name_shop} price={item.price} idWishList={item.id} key={item.id} handleDelete={handleDelete} />)
                        : <p className='text-center'>There are no products in the cart !!!</p>
                }
            </div>
        </section>
    )
}
