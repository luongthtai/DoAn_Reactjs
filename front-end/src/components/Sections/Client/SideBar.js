import React, { useEffect, useState } from 'react'
import CategoryItem from '../../Layouts/CategoryItem'
import axios from 'axios'

export default React.memo(function SideBar() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/commoditys')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <aside className='w-72 bg-white py-3 xl:block hidden sticky top-16 left-0'>
      <ul>
        {
          data.length !== 0 ? data.map(item => <CategoryItem key={item.id} category={item.commodity_name} />) : null
        }
      </ul>
    </aside>
  )
})
