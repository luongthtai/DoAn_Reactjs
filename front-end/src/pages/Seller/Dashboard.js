import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from 'components/Layouts/LoadingScreen'
import SideBarShop from 'components/Sections/Admin/SideBarShop'
import DataShop from 'components/Sections/Admin/DataShop'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const idUser = useSelector(state => state.auth.user[0].id)
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`/shops/info/${idUser}`)
      .then(res => {
        setData(res.data)
        return res.data
      })
      .then(res => setIsLoading(false))
      .catch(err => console.log(err))
  }, [idUser, dispatch])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      {
        data.map(item =>
          <section className='grid gap-5' key={item.id}>
            <SideBarShop sine={item.created_at} address={item.address} avatar={item.logo} city={item.city} description={item.description} id={item.id} phone={item.phone} shopName={item.name_shop} coverImg={item.cover_img} />
            <DataShop sine={item.created_at} totalProduct={item.product_count}/>
          </section>
        )
      }
    </>
  )
}
