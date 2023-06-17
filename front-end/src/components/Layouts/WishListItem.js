import React from 'react'
import productImg from '../../assets/image/products/Apples.webp'
import { AiFillStar } from 'react-icons/ai'

export default function WishListItem({ product, productName, shopName, price, idWishList, ratting, handleDelete }) {

    const handleAddCart = () => {
        // axios.post('/cart/add/:id')
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
    }

    return (
        <div className='flex sm:flex-row flex-col justify-between gap-4 items-center border-b pb-4 last:border-none w-full'>
            <div className='flex items-center gap-4 w-full'>
                <img
                    src={product ? product : productImg}
                    alt={productName || 'product_name'}
                    className='w-20 h-20 rounded object-contain border'
                />

                <div className='grid gap-1'>
                    <h6 className='font-semibold text-xl capitalize'>{productName || 'Baby Spinach'}</h6>
                    <p className='text-sm capitalize font-semibold py-1'>{shopName || 'Grocery Shop'}</p>

                    <p className='flex items-center gap-1 bg-emerald-600 text-white w-fit rounded px-2 py-1 text-sm'>{ratting || 0} <AiFillStar className='text-xs' /></p>
                </div>
            </div>

            <div className='sm:grid flex justify-items-end gap-2 pl-20 sm:ml-auto justify-between sm:justify-normal w-full flex-wrap'>
                <p className='font-bold text-xl'>${price || '0.60'}.00</p>
                <div className='flex font-semibold gap-3 text-sm'>
                    <button className='text-emerald-500 border-r-2 border-dotted pr-3' type='button' onClick={handleAddCart}>Add to Cart</button>
                    <button className='text-red-500' type='button' onClick={() => handleDelete(idWishList)}>Remove</button>
                </div>
            </div>
        </div>
    )
}
