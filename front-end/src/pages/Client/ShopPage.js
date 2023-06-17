import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingScreen from 'components/Layouts/LoadingScreen'
import ShopItem from 'components/Layouts/ShopItem'

export default function ShopPage() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('/shops')
            .then(res => setData(res.data))
            .then(res => setIsLoading(false))
            .catch(err => console.log(err))
    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <main className='min-h-screen pt-6 lg:pt-16 px-8'>
            <div className='container m-auto my-16 max-w-screen-xl'>
                <h4 className='text-2xl font-bold mb-6'>All Shop</h4>

                <div className='grid gap-5 xl:grid-cols-3 lg:grid-cols-2'>  
                    {
                        data.length !== 0 ? data.map(item => <ShopItem key={item.id} id={item.id} avatar={item.logo} shopName={item.name_shop} address={item.address + ', ' + item.city} />) : <p>Not data !!!</p>
                    }
                </div>
            </div>
        </main>
    )
}

