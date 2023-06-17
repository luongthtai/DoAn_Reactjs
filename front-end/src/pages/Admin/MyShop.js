import axios from 'axios'
import LoadingScreen from 'components/Layouts/LoadingScreen'
import DataShop from 'components/Sections/Admin/DataShop'
import SideBarShop from 'components/Sections/Admin/SideBarShop'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function MyShop() {
    const id = useSelector(state => state.auth.user[0].id)
    
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
            axios.get(`/shops/user/${id}`)
                .then(res => setData(res.data))
                .then(res => setIsLoading(false))
                .catch(err => console.log(err))
        }
    }, [id])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            {
                data.length !== 0 ?
                    data.map(item =>
                        <section className='grid gap-5' key={item.id} >
                            <SideBarShop sine={item.created_at} edit={true} address={item.address} avatar={item.logo} city={item.city} description={item.description} id={item.id} phone={item.phone} shopName={item.name_shop} coverImg={item.cover_img} />
                            <DataShop sine={item.created_at} totalProduct={item.product_count} />
                        </section>
                    )
                    : <>
                        <h3 className='border-dashed border-b-2 py-8 font-semibold text-xl'>My Shop</h3>

                        <p className='text-center font-bold text-xl mt-20'>Not Shop Found !!!</p>
                    </>
            }
        </>
    )
}
