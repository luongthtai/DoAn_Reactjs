import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import shopItem from '../../assets/image/shopItem.webp'

export default function ShopItem({ avatar, shopName, address, id }) {
    return (
        <Link to={`/shops/${id}`} className='p-4 border rounded flex items-center gap-5'>
            <img
                src={avatar ? avatar : shopItem}
                alt=''
                className='rounded-full w-20 h-20'
            />

            <div className='grid gap-2'>
                <h5 className='text-lg font-semibold'>{shopName || 'Furniture Shop'}</h5>
                <div className='flex gap-1 text-gray-400'>
                    <MdLocationOn className='text-3xl' />
                    <span className='text-sm'>{address || '599 Finwood Road, New Jersey, Eart Dover, 08753, USA'}</span>
                </div>
            </div>
        </Link>
    )
}
