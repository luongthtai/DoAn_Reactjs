import React, { useEffect, useState } from 'react'
import apple from '../../assets/image/products/Apples.webp'
import AddProductButton from './AddProductButton'
import { AiFillHeart, AiOutlineClose, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function ProductItem({ name, price, img, sell, descripe, id, notify, nameShop, shopId, category }) {
    const [show, setShow] = useState(false)
    const [read, setRead] = useState(false)

    const [wishlist, setWishlist] = useState(false)

    const idUser = useSelector(state => state.auth.user[0].id)

    const handleClick = () => {
        setShow(!show)
    }

    const handleRead = () => {
        setRead(!read)
    }

    const toggleWishList = (value) => {
        if (idUser) {
            if (!wishlist) {
                axios.post(`/wishlist/create/${idUser}`, {
                    idProduct: value
                })
                    .then(res => {
                        setWishlist(true)
                        notify('Add to wishlist !!!')
                    })
                    .catch(err => console.log(err))
            } else {
                axios.delete(`/wishlist/deleteToProduct/${id}`)
                    .then(res => {
                        setWishlist(false)
                        notify('Delete to wishlist')
                    })
                    .catch(err => console.log(err))
            }
        } else {
            alert("You haven't logged in yet !!!")
        }
    }

    useEffect(() => {
        if (idUser) {
            axios.get(`/wishlist/check/${id}/${idUser}`)
                .then(res => setWishlist(res.data))
                .catch(err => console.log(err))
        } else {
            setWishlist(false)
        }
    }, [id, idUser])

    return (
        <>
            <div className='border rounded bg-white grid justify-center hover:-translate-y-1 duration-200 relative w-full' style={{ boxShadow: 'rgba(0,0,0,.08) 0px 2px 16px' }}>
                {
                    sell ? <p className='py-1 px-2 bg-emerald-500 rounded-sm absolute top-2 right-3 text-xs text-white'>{sell || '17%'}%</p> : null
                }

                <img
                    src={img ? img : apple}
                    alt='product_name'
                    className='rounded-t'
                    onClick={handleClick}
                />

                <div className='p-3 grid gap-2'>
                    <div className='flex gap-3 items-center'>
                        <p className='font-semibold text-sm'>${price || '2.00'}</p>
                        {
                            sell ? <p className='text-xs text-gray-400 line-through'>${sell ? 2 - (2 * sell / 100) : '2.00'}</p> : null
                        }
                    </div>

                    <h6 className='text-xs text-gray-400 capitalize'>{name || 'Apples'}</h6>

                    <AddProductButton idProduct={id} />
                </div>
            </div>

            {
                show ?
                    <>
                        <div className='fixed top-0 left-0 w-full h-full bg-black opacity-20 z-30' onClick={handleClick}></div>
                        <section className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40 bg-white rounded-lg w-full h-full 2xl:h-fit overflow-auto' style={{ maxWidth: '1280px' }}>
                            <div className='py-8 border-b grid md:grid-cols-2 gap-5 p-8 relative'>
                                <button className='absolute top-3 right-3 2xl:hidden' onClick={() => handleClick(id)}><AiOutlineClose /></button>
                                <img
                                    src={img}
                                    alt={name}
                                    className='w-full p-5'
                                />

                                <div>
                                    <div className='grid gap-4 py-5 border-b'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='capitalize text-xl font-bold'>{name}</h3>
                                            <button className='w-10 h-10 flex justify-center items-center rounded-full border' onClick={() => toggleWishList(id)}>
                                                {
                                                    wishlist ? <AiFillHeart className='text-2xl text-emerald-500' /> : <AiOutlineHeart className='text-2xl text-emerald-500' />
                                                }
                                            </button>
                                        </div>

                                        <div>
                                            <p className={`${read ? null : 'md:line-clamp-3 line-clamp-2'} text-gray-500 `} onClick={handleRead}>{descripe}</p>
                                            <button type='button' onClick={handleRead} className='text-emerald-500 text-sm font-bold'>{read ? 'Less' : 'Read More'}</button>
                                        </div>

                                        <p className='text-4xl py-2 font-semibold text-emerald-500'>${price}</p>

                                        <div className='md:flex gap-2 items-center grid text-center'>
                                            <button className='text-white bg-emerald-600 rounded py-4 px-8'>Add To Shopping Cart</button>
                                            <span className='text-gray-500 py-4'>10 pieces available</span>
                                        </div>
                                    </div>

                                    <div className='pt-5 grid gap-4'>
                                        <div className='flex gap-5 items-center'>
                                            <h5>Categories</h5>

                                            <div className='flex gap-2 flex-wrap'>
                                                <p className='px-4 py-1 border rounded capitalize'>{category}</p>
                                            </div>
                                        </div>

                                        <div className='flex gap-5 items-center'>
                                            <h5>Sellers</h5>
                                            <Link to={`/shops/${shopId}`} className='text-emerald-500 underline underline-offset-2'>{nameShop}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='p-8 grid gap-2'>
                                <h4 className='text-lg font-bold'>Details</h4>

                                <p className='text-gray-500 text-sm'>{descripe}</p>
                            </div>
                        </section>
                    </>
                    :
                    null
            }
        </>
    )
}
