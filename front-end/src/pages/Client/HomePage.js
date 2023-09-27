import React from 'react'
// import axios from 'axios'
import HeroSection from 'components/Sections/Client/HeroSection'
import SlideSection from 'components/Sections/Client/SlideSection'
import SideBar from 'components/Sections/Client/SideBar'
import FilterProduct from 'components/Sections/Client/FilterProduct'
import Products from 'components/Sections/Client/Products'

export default function HomePage() {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   axios.get('/home')
  //     .then(res => setData(res.data))
  //     .catch(err => console.log(err))
  // }, [])

  // console.log(data)

  return (
    <>
      <main className='h-screen'>
        <HeroSection />
        <SlideSection />

        <article className='bg-gray-100 flex flex-col xl:flex-row'>
          <SideBar />
          <FilterProduct />
          <Products />
        </article>
      </main>
    </>
  )
}
