import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatarImg from '../../../assets/image/shopItem.webp'
import { MdLocationOn } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import coverImgDefault from '../../../assets/image/bgShop.webp'
import * as moment from 'moment'
import { FiEdit } from 'react-icons/fi'

export default function SideBarShop({ shopName, avatar, description, address, city, phone, id, coverImg, sine, edit }) {
    const [read, setRead] = useState(true)

    return (
        <>
            <section className='flex gap-5 w-full'>
                <aside className='max-w-xs bg-white p-6 py-8 gap-3 rounded-lg xl:grid hidden'>
                    <div className='grid justify-items-center text-center gap-4'>
                        <img
                            src={avatar ? avatar : avatarImg}
                            alt=''
                            className='rounded-full w-36 h-36' />

                        <h3 className='text-xl font-semibold'>{shopName || 'Grocery Shop'}</h3>

                        <div>
                            <p className={`${read ? 'line-clamp-2' : null} text-slate-500 text-sm`}>{description || 'The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.'}</p>
                            <button onClick={() => setRead(!read)} className='text-emerald-500 font-bold'>{read ? "Read more" : "Less"}</button>
                        </div>
                    </div>

                    <div className='grid gap-4 text-slate-400'>
                        <div className='flex gap-2'>
                            <MdLocationOn />
                            <p>{address ? (address + ', ' + city) : '1986 Spinnaker Lane, Illinois, Freeport, 61032, USA'}</p>
                        </div>

                        <div className='flex gap-2'>
                            <BsTelephoneFill />
                            <p>{phone || '018927525111'}</p>
                        </div>
                    </div>

                    <Link to={`/shops/${id || 4}`} className='w-full bg-slate-100 py-2 rounded hover:bg-emerald-600 hover:text-white duration-200 text-center'>Visit Shop</Link>
                </aside>

                <section className='grid bg-white rounded-lg items-center w-full relative' style={{ minHeight: '400px' }}>
                    {
                        edit ? <Link to={`/seller/shop/update/${id}`} className='bg-blue-500 rounded flex gap-2 items-center text-white absolute right-3 top-3 px-2 py-1'><FiEdit /> Edit Shop</Link> : null
                    }

                    <img
                        src={coverImg ? coverImg : coverImgDefault}
                        alt=''
                        className='object-contain'
                    />
                </section>
            </section>

            <section className='grid xl:hidden sm:grid-cols-2 grid-cols-1 gap-5'>
                <div className='bg-white p-6 gap-3 rounded-lg grid'>
                    <div className='grid justify-items-center text-center gap-4'>
                        <img
                            src={avatar ? avatar : avatarImg}
                            alt=''
                            className='rounded-full w-28 h-28' />

                        <h3 className='text-xl font-semibold'>{shopName || 'Grocery Shop'}</h3>

                        <div>
                            <p className={`${read ? 'line-clamp-2' : null} text-slate-500 text-sm`}>{description || 'The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.'}</p>
                            <button onClick={() => setRead(!read)} className='text-emerald-500 font-bold'>{read ? "Read more" : "Less"}</button>
                        </div>
                    </div>

                    <div className='grid gap-4 text-slate-400'>
                        <div className='flex gap-2'>
                            <MdLocationOn className='text-3xl' />
                            <p>{address ? (address + ', ' + city) : '1986 Spinnaker Lane, Illinois, Freeport, 61032, USA'}</p>
                        </div>

                        <div className='flex gap-2'>
                            <BsTelephoneFill />
                            <p>{phone || '018927525111'}</p>
                        </div>
                    </div>

                    <Link to={`/shops/${id || 4}`} className='w-full bg-slate-100 py-2 rounded hover:bg-emerald-600 hover:text-white duration-200 text-center'>Visit Shop</Link>
                </div>

                <div className='bg-white rounded-lg block'>
                    <div className='p-6 border-b'>
                        <h5 className='text-gray-400'>Registered since</h5>
                        <p className='font-semibold text-sm'>{sine ? moment(sine).format("DD/MM/YYYY") : 'June 27, 2021'}</p>
                    </div>

                    <div className='p-6'>
                        <h5 className='text-lg font-semibold mb-2'>Payment Infomation</h5>

                        <ul className='text-gray-400 grid gap-2'>
                            <li>
                                Name:
                            </li>

                            <li>
                                Email:
                            </li>

                            <li>
                                Bank:
                            </li>

                            <li>
                                Account No:
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
