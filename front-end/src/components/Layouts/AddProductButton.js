import React, { useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import css from 'assets/style/components/AddProductButton.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from 'redux/reducers/Cart'
import { useSelector } from 'react-redux'

export default function AddProductButton({ idProduct }) {
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user[0].id)
    
    const [addProduct, setAddProduct] = useState({
        quantity: 0,
        idUser: id,
        idProduct: idProduct
    })

    // Do you want add cart you need idUser, idShop and quantity

    // const handleClick = () => {
    //     setAddProduct({
    //         ...addProduct,
    //         quantity: quantity += 1
    //     })

    //     dispatch(addToCart(addProduct))
    // }

    const handlePlusValue = () => {
        setAddProduct({
            ...addProduct,
            quantity: addProduct.quantity += 1
        })

        dispatch(addToCart(addProduct))
    }

    const handleMinusValue = () => {
        setAddProduct({
            ...addProduct,
            quantity: addProduct.quantity -= 1
        })

        dispatch(addToCart(addProduct))
    }

    return (
        <>
            {
                addProduct.quantity === 0 ?
                    <div className='flex items-center text-sm' id={css.root} onClick={handlePlusValue}>
                        <button className='bg-gray-100 w-full h-full rounded-l'>Add</button>
                        <button className='p-3 bg-gray-200 rounded-r'><HiPlusSm /></button>
                    </div>
                    :
                    <div className='flex items-center justify-between bg-emerald-500 rounded text-white text-sm'>
                        <button className='p-3 hover:bg-emerald-600 rounded-l' onClick={handleMinusValue}><HiMinusSm /></button>
                        <span>{addProduct.quantity}</span>
                        <button className='p-3 hover:bg-emerald-600 rounded-r' onClick={handlePlusValue}><HiPlusSm /></button>
                    </div>
            }
        </>
    )
}
