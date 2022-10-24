import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Vids() {
  return (
    <main id='vids' className='myScroll'>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        spaceBetween={60}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
      >
        <SwiperSlide>
          <div className="inner">
            1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">
            2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">
            3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">
            4
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="inner">
            5
          </div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}