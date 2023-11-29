import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

function Slider({images, id}){

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Keyboard, Pagination, Navigation]}
            className="slider-image-border"
        >
            {
                images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={image.url}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}

export default Slider;