import React, { useEffect } from 'react'
import { BiShoppingBag } from 'react-icons/bi'
import CartItems from '../../Layouts/CartItems'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from 'redux/actions/CartAction'
import LoadingScreen from 'components/Layouts/LoadingScreen'

export default function CartList({ toggle, onclick }) {
    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.user[0].id)
    const data = useSelector(state => state.cart.cart)
    const isLoading = useSelector(state => state.cart.isLoading)

    useEffect(() => {
        if (id) {
            dispatch(fetchCart(id))
        }
    }, [id, dispatch])

    if (isLoading && id) {
        return <LoadingScreen />
    }

    return (
        <>
            <div className=" bg-base-100 fixed top-0 right-0 md:w-1/2 w-4/5 lg:w-1/5 z-40 h-full  duration-150" style={{ transform: toggle ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="p-0 relative h-full overflow-auto">
                    <div className='flex justify-between items-center px-7 py-5 border-b sticky top-0 bg-white'>
                        <div className='flex items-center gap-2 font-bold text-emerald-500'>
                            <BiShoppingBag className='text-2xl' />
                            <span>{data.length} Items</span>
                        </div>
                        <button className='w-6 h-6 bg-gray-100 rounded-full font-bold flex items-center justify-center' onClick={onclick}>x</button>
                    </div>

                    {
                        data.length !== 0 ?
                            <div className='grid gap-2 text-semibold pb-24'>
                                {
                                    data.map(item => <CartItems />)
                                }
                            </div>
                            :
                            <div className='flex justify-center items-center h-full'>
                                <p>Not Data !!!</p>
                            </div>
                    }
                </div>

                <div className='absolute w-full py-4 bottom-0 px-3 bg-white'>
                    <div className='bg-emerald-600 rounded-full relative p-5 text-white font-bold flex justify-between items-center'>
                        <p>Checkout</p>
                        <span className='h-5/6 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center px-6 bg-white rounded-full text-emerald-600'>${data.length ? data.map(item => item.price++) : 0}</span>
                    </div>
                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-screen z-10 bg-black opacity-10 duration-150 xl:hidden' onClick={onclick} style={{ display: toggle ? 'block' : 'none' }}></div>
        </>
    )
}
