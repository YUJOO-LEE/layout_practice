import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

export default function Location() {
  const { kakao } = window;
  // 윈도우 객체에 등록된 카카오키를 변수명으로 비구조화 할당
  // 윈도우 객체가 카카오 객체를 사용할 수 있도록 함
  // const kakao = (window).kakao;

  const container = useRef(null);
  // 지도를 담을 영역의 DOM 레퍼런스
  const option = { 
  // 지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };


  const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  // 마커 포지션 생성
  const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
  const imageSize = new kakao.maps.Size(232,99);
  const imageOption = {offset: new kakao.maps.Point(116,99)};
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
  // 마커 이미지 정보 생성

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  })
  // 마커 생성

  useEffect(() => {
    const mapInstance = new kakao.maps.Map(container.current, option);
    // 지도 생성 및 객체 리턴
    marker.setMap(mapInstance);
    // 지도상에 마커 표시
  }, [])

  return (
    <Layout name='location'>
      <div id="map" ref={container}></div>
    </Layout>
  );
}