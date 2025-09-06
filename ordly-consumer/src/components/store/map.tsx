'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    const kakaoMapScript = document.querySelector(
      'script[src*="//dapi.kakao.com/v2/maps/sdk.js"]'
    );

    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        }
      });
    };

    // 스크립트가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else if (kakaoMapScript) {
      kakaoMapScript.addEventListener('load', initMap);

      return () => {
        kakaoMapScript.removeEventListener('load', initMap);
      };
    }
  }, []);

  return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
