import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

export default function Location() {
  const { kakao } = window;
  // 윈도우 객체에 등록된 카카오키를 변수명으로 비구조화 할당
  // 윈도우 객체가 카카오 객체를 사용할 수 있도록 함
  // const kakao = (window).kakao;

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
  // 지도를 담을 영역의 DOM 레퍼런스
  const [ isTraffic, setTraffic ] = useState(false);
  // 트래픽 표시 여부

  const [ location, setLocation ] = useState(null);
  // useEffect에서 생성된 맵 인스턴스 담을 State 생성

  const [ index, setIndex ] = useState(0);
  // 마커 및 지도 위치 변경 위한 인덱스 State 생성

  const option = { 
  // 지도를 생성할 때 필요한 기본 옵션
    center: info[index].latLng, //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };


  const markerPosition = info[index].latLng;
  // 마커 포지션 생성
  const imageSrc = info[index].imgSrc;
  const imageSize = info[index].imgSize;
  const imageOption = info[index].imgPos;
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
  // 마커 이미지 정보 생성

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  })
  // 마커 생성

  useEffect(() => {
    // 최초 마운트 시 지도 그리기
    const mapInstance = new kakao.maps.Map(container.current, option);
    // 지도 생성 및 객체 리턴
    marker.setMap(mapInstance);
    // 지도상에 마커 표시
    setLocation(mapInstance);
    // location State 업데이트
  }, [index])

  useEffect(() => {
    // traffic 버튼으로 표시여부 업데이트 때 마다 지도에 트래픽 그리기
    if (!location) return;
    // location 값 비어있을 시 오류 방지

    isTraffic
    ?location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
    :location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    // 교통 상황 표시 활성화

  }, [isTraffic])

  return (
    <Layout name="location">
      <div id="map" ref={container}></div>
      <button onClick={()=>{setTraffic(!isTraffic)}}>{isTraffic ? 'Traffic Off' : 'Traffic On'}</button>

      <ul className='branch'>
        {info.map((data, i) => {
          return (
            <li key={i} onClick={()=>{setIndex(i)}}>{data.title}</li>
          );
        })}
      </ul>
    </Layout>
  );
  // state 값에 따라 버튼내 텍스트 변경
}