import React, { useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import css from 'assets/style/components/AddProductButton.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart, removeToCart } from 'redux/reducers/Cart'
import { useSelector } from 'react-redux'

export default function AddProductButton({ idProduct }) {
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user.id)

    const [addProduct, setAddProduct] = useState({
        quantity: 0,
        idUser: id,
        idProduct: idProduct
    })

    // Do you want add cart you need idUser, idShop and quantity

    const handlePlusValue = () => {
        const newQuantity = addProduct.quantity + 1

        setAddProduct({
            ...addProduct,
            quantity: newQuantity
        })

        dispatch(addToCart(addProduct))
    }

    const handleMinusValue = () => {
        const newQuantity = addProduct.quantity - 1

        setAddProduct({
            ...addProduct,
            quantity: newQuantity
        })

        dispatch(removeToCart(addProduct))
    }

    console.log(addProduct)

    return (
        <>
            <div className={`flex items-center text-sm ${addProduct.quantity ? 'bg-emerald-400' : 'bg-gray-100'}`} id={css.root} onClick={addProduct.quantity ? null : handlePlusValue}>
                <button className={`p-3 bg-emerald-700 rounded-l text-white ${addProduct.quantity ? 'block' : 'hidden'}`} onClick={handleMinusValue}><HiMinusSm /></button>
                <button className={`w-full h-full rounded-l`}>{addProduct.quantity || 'Add'}</button>
                <button className={`p-3 rounded-r ${addProduct.quantity ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`} onClick={handlePlusValue}><HiPlusSm /></button>
            </div>
        </>
    )
}
