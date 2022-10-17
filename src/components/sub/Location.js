import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';


export default function Location() {
  const { kakao } = window;
  const info = [
    {
      title: '디코드랩',
      latLng: new kakao.maps.LatLng(37.491317,126.751998),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(116, 99)}
    },
    {
      title: '거해 짬뽕 순두부',
      latLng: new kakao.maps.LatLng(37.3917252, 126.4271172),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(116, 99)}
    },
    {
      title: '목동 은행골',
      latLng: new kakao.maps.LatLng(37.5293136, 126.8751264),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: {offset: new kakao.maps.Point(116, 99)}
    }
  ]
  const container = useRef(null);
  const [ isTraffic, setTraffic ] = useState(false);
  const [ location, setLocation ] = useState(null);
  const [ index, setIndex ] = useState(0);
  const option = {
    center: info[index].latLng,
    lever: 3
  };

  const marker = new kakao.maps.Marker({
    position: info[index].latLng,
    image: new kakao.maps.MarkerImage(
      info[index].imgSrc,
      info[index].imgSize,
      info[index].imgPos
      )
  })

  useEffect(() => {
    const mapInstance = new kakao.maps.Map(container.current, option);
    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    marker.setMap(mapInstance);
    setLocation(mapInstance);
  
    return () => {
      container.current.innerHTML = '';
    }
  }, [index])

  useEffect(() => {
    if (!location) return;
    
    isTraffic
      ? location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
      : location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
  }, [isTraffic])
  

  window.addEventListener('resize', ()=>{
    location.setCenter(info[index].latLng);
  })

  return (
    <Layout name="location">
      <div id="map" ref={container}></div>
      <div className="btnSet">
        <button onClick={()=>{
          setTraffic(!isTraffic)
        }}>
          {isTraffic ? 'Traffic Off' : 'Traffic On'}
        </button>
        <ul className="branch">
          {info.map((data, i)=>{
            return (
              <li key={i}
              onClick={()=>{setIndex(i)}}
              className={index === i ? 'on' : null}>
                {data.title}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}