import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Vids() {

  const Vids = useSelector((store)=>{
  return (store.youtubeReducer.youtube);
});

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
        slidesPerView={3}
        centeredSlides={true}
      >
        {Vids?.map((data, idx)=>{
          if (idx > 4) return;
          // 5개만 출력

          let title = data.snippet.title;
          let description = data.snippet.description;
          let date = data.snippet.publishedAt;

          if(title.length > 30) title = title.substring(0, 30) + '...';
          if(description.length > 100) description = description.substring(0, 100) + '...';
          date = date.split('T')[0];

          return (
            <SwiperSlide key={idx}>
              <div className="inner">
                <div className="pic">
                  <img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
                </div>
                <div className="txt">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>{date}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}