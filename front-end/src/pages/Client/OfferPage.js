import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OfferItem from 'components/Layouts/OfferItem'

export default React.memo(function OfferPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('/sells')
      .then(res => setData(res.data))
      .then(res => setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  return (
    <main className='min-h-screen pt-6 lg:pt-16 px-8 bg-gray-100'>
      <div className='container m-auto grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 py-16'>
        {
          isLoading ? <p>Loading....</p> : data.length !== 0 ? data.map(item => <OfferItem key={item.id} sell={item.sell} code={item.sell_code} />) : <p className='font-bold text-2xl'>Not data !!!</p>
        }
      </div>
    </main>
  )
})
