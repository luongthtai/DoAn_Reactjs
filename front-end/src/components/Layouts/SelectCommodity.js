import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { MdClear } from 'react-icons/md'

export default function SelectCommodity({ data }) {
    const [toggleHide, setToggleHide] = useState(false)
    const [clear, setClear] = useState(false)
    const [select, setSelect] = useState('Select...')

    const handleToggle = () => {
        setToggleHide(!toggleHide)
    }

    const handleClear = () => {
        setClear(false)
        setSelect('Select...')
        setToggleHide(false)
    }

    const handleSelect = (value) => {
        setSelect(<i className={value} ></i>)
        setClear(true)
        setToggleHide(false)
    }

    return (
        <div className='border rounded w-full focus:border-emerald-500 px-3 relative z-0' >
            <div className='cursor-pointer flex justify-between items-center'>
                <p onClick={handleToggle} className='w-full py-2'>{select}</p>

                <div className='flex items-center gap-3'>
                    {
                        clear ? <MdClear className='text-sm relative z-10' onClick={handleClear} /> : null
                    }
                    <BiChevronDown className='text-xl' onClick={handleToggle} />
                </div>
            </div>

            <div className={toggleHide ? 'absolute top-full left-0 bg-white border rounded mt-2 grid w-full' : 'hidden'}>
                {
                    data.map(item =>
                    (
                        <div onClick={() => handleSelect(item.url_icon)} key={item.id} className='p-4 cursor-pointers border-b last:border-none hover:bg-gray-100'><i className={item.url_icon} ></i></div>
                    ))
                }
            </div>
        </div>
    )
}

