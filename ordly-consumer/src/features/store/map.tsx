'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  useEffect(() => {
    const kakaoMapScript = document.querySelector(
      'script[src*="//dapi.kakao.com/v2/maps/sdk.js"]'
    );

    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (container) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              const options = {
                center: coords,
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              map.setCenter(coords);
            }
          });
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
  }, [address]);

  return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}
