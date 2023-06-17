import axios from 'axios'
import LoadingScreen from 'components/Layouts/LoadingScreen'
import DataShop from 'components/Sections/Admin/DataShop'
import SideBarShop from 'components/Sections/Admin/SideBarShop'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function InfoShopAdmin() {
  const { id } = useParams()

  const [data, setData] = useState([])
  const [isLoading, setISLoading] = useState(true)

  useEffect(() => {
    axios.get(`/shops/info/${id}`)
      .then(res => setData(res.data))
      .then(res => setISLoading(false))
      .catch(err => console.log(err))
  }, [id])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {
        data.map(item =>
          <section className='grid gap-5' key={item.id}>
            <SideBarShop address={item.address} avatar={item.logo} city={item.city} description={item.description} id={item.id} phone={item.phone} shopName={item.name_shop} coverImg={item.cover_img} sine={item.created_at}/>
            <DataShop sine={item.created_at} totalProduct={item.product_count}/>
          </section>
        )
      }
    </>
  )
}
