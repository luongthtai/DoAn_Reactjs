import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slides1 from 'assets/image/offer-1.webp'
import slides2 from 'assets/image/offer-2.webp'
import slides3 from 'assets/image/offer-3.webp'
import slides4 from 'assets/image/offer-4.webp'
import slides5 from 'assets/image/offer-5.webp'

import { Autoplay, Pagination, Navigation } from "swiper";

export default function SlideSection() {
    return (
        <div className='px-10 pb-8 border-b pt-16 lg:pt-8'>
            <Swiper
                navigation={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                spaceBetween={20}
                modules={[Pagination, Navigation, Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    580: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                    1440: {
                        slidesPerView: 4
                    }
                }}
                className='mySlider'
            >
                <SwiperSlide>
                    <img
                        src={slides1}
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slides2}
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slides3}
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slides4}
                        alt=''
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slides5}
                        alt=''
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
