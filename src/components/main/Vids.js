import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Popup from '../common/Popup';

export default function Vids() {

  const pop = useRef(null);
  const sw = useRef(null);
  const [ Index, setIndex ] = useState(0);
  const Vids = useSelector((store)=>{
    return (store.youtubeReducer.youtube);
  });

  return (
    <>
      <main id='vids' className='myScroll'>
        {Vids.length &&
          <Swiper
            ref={sw}
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{
              clickable: true,
            }}
            navigation={true} 
            spaceBetween={30}
            loop={true}
            slidesPerView='auto'
            centeredSlides={true}
            breakpoints={{
              320:{
                slidesPerView: 1
              },
              580:{
                slidesPerView: 'auto'
              }
            }}
            autoplay={{
              delay:2500,
              disableOnInteraction: true
            }}
          >
            {Vids.map((data, idx)=>{
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
                    <div className="pic" onClick={()=>{pop.current.setOpen();
                    setIndex(idx);
                    sw.current.swiper.autoplay.stop();}}>
                      <img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
                    </div>
                    <div className="txt">
                      <h3>{title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        }
      </main>

      <Popup ref={pop}>
        {Vids.length &&
          <iframe title={Vids[Index].snippet.title} src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder="0"></iframe>
        }
      </Popup>
    </>
  );
}