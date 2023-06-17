import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import avatarImg from '../../../assets/image/shopItem.webp'

export default function SideBarShop({ shopName, description, avatar, address, city, website, phone }) {
    const [read, setRead] = useState(true)
    const [offcanvas, setOffcanvas] = useState(false)

    const handleClick = () => {
        setOffcanvas(!offcanvas)
    }

    return (
        <>
            <aside className='max-w-xs bg-white py-6 rounded-lg sticky top-24 left-0 h-full lg:block hidden'>
                <div className='grid justify-items-center text-center gap-4 border-b pb-6 px-6'>
                    <img
                        src={avatar ? avatar : avatarImg}
                        alt=''
                        className='rounded-lg w-40 h-40' />

                    <h3 className='text-xl font-semibold'>{shopName || 'Grocery Shop'}</h3>

                    <div>
                        <p className={`${read ? 'line-clamp-2' : null} text-slate-500 text-sm`}>{description || 'The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.'}</p>
                        <button onClick={() => setRead(!read)} className='text-emerald-500 font-bold'>{read ? "Read more" : "Less"}</button>
                    </div>

                    <div className='flex gap-4 text-slate-500 text-2xl'>
                        <AiFillFacebook />
                        <AiOutlineInstagram />
                        <AiOutlineTwitter />
                    </div>
                </div>

                <div className='grid gap-4 pt-6 px-6'>
                    <div>
                        <h5 className='font-semibold mb-1'>Address</h5>
                        <p className='text-sm text-slate-400'>{address + ', ' + city || '1986 Spinnaker Lane, Illinois, Freeport, 61032, USA'}</p>
                    </div>

                    <div>
                        <h5 className='font-semibold mb-1'>Phone</h5>
                        <p className='text-sm text-slate-400'>{phone || '018927525111'}</p>
                    </div>

                    <div>
                        <h5 className='font-semibold mb-1'>Website</h5>

                        <div className='flex justify-between text-slate-400 items-center flex-wrap'>
                            <p>{website || 'https://redq.io/'}</p>
                            <Link target='_blank' to={website} className='text-emerald-500 font-semibold text-sm'>Visit This Site</Link>
                        </div>
                    </div>
                </div>
            </aside>

            <aside className='lg:hidden sticky top-14 left-0 z-10 w-screen bg-white py-2 px-8 shadow flex gap-3 items-center'>
                <img src={avatar ? avatar : avatarImg} alt='' className='w-16 h-16 rounded' />

                <div>
                    <h5 className='font-semibold'>{shopName || 'Grocery Shop'}</h5>
                    <button type='button' className='text-emerald-500 text-sm' onClick={handleClick}>More Info</button>
                </div>
            </aside>

            <div className='fixed top-0 left-0 w-full h-full z-10 justify-center items-center' style={{ display: offcanvas ? 'flex' : 'none' }}>
                <div className='bg-white w-2/3 h-4/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col justify-center'>
                    <div className='grid justify-items-center text-center gap-4 border-b pb-6 px-6'>
                        <img src={avatar ? avatar : avatarImg} alt='' className='rounded-lg' />

                        <h3 className='text-xl font-semibold'>{shopName || 'Grocery Shop'}</h3>

                        <div>
                            <p className={`${read ? 'line-clamp-2' : null} text-slate-500 text-sm`}>{description || 'The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.'}</p>
                            <button onClick={() => setRead(!read)} className='text-emerald-500 font-bold'>{read ? "Read more" : "Less"}</button>
                        </div>

                        <div className='flex gap-4 text-slate-500 text-2xl'>
                            <AiFillFacebook />
                            <AiOutlineInstagram />
                            <AiOutlineTwitter />
                        </div>
                    </div>

                    <div className='grid gap-4 pt-6 px-6'>
                        <div>
                            <h5 className='font-semibold mb-1'>Address</h5>
                            <p className='text-sm text-slate-400'>1986 Spinnaker Lane, Illinois, Freeport, 61032, USA</p>
                        </div>

                        <div>
                            <h5 className='font-semibold mb-1'>Phone</h5>
                            <p className='text-sm text-slate-400'>{phone || '018927525111'}</p>
                        </div>

                        <div>
                            <h5 className='font-semibold mb-1'>Website</h5>

                            <div className='flex justify-between text-slate-400 items-center flex-wrap'>
                                <p>{website || 'https://redq.io/'}</p>
                                <Link className='text-emerald-500 font-semibold text-sm'>Visit This Site</Link>
                            </div>
                        </div>
                    </div>

                    <button className='w-6 h-6 bg-gray-100 rounded-full font-bold flex items-center justify-center absolute top-4 right-4' onClick={handleClick}>x</button>
                </div>

                <div className='absolute top-0 left-0 h-full w-full bg-black opacity-20' onClick={handleClick}></div>
            </div>
        </>
    )
}
