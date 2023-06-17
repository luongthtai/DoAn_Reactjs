import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingScreen from 'components/Layouts/LoadingScreen'
import SideBarShop from 'components/Sections/Client/SideBarShop'
import ProductShop from 'components/Sections/Client/ProductShop'

export default function InfoShop() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`/shops/info/${id}`)
      .then(res => setData(res.data))
      .then(res => setIsLoading(false))
      .catch(err => console.log(err))
  }, [id])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className='bg-gray-50 pt-16 lg:pt-24 pb-16 min-h-screen px-0 lg:px-8 lg:pb-6 flex items-start flex-col lg:flex-row gap-8 relative'>
      {
        data.map(item => <SideBarShop key={item.id} avatar={item.logo} description={item.description} shopName={item.name_shop} address={item.address} city={item.city} phone={item.phone} website={item.website} />)
      }
      
      {
        data.map(item => <ProductShop key={item.id} bgShop={item.cover_img} idShop={item.id}/>)
      }
    </main>
  )
}
