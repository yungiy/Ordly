'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        services: {
          Geocoder: new () => any;
          Status: {
            OK: string;
          };
        };
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
      };
    };
  }
}

interface Props {
  address: string;
}

export default function KakaoMap({ address }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('카카오맵 SDK가 로드되지 않았습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      if (!mapContainerRef.current) return;
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status !== window.kakao.maps.services.Status.OK) {
          console.error(`주소 검색에 실패했습니다: ${address}`);
          return;
        }
        if (!mapContainerRef.current) return;
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const options = {
          center: coords,
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainerRef.current, options);
        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
        map.setCenter(coords);
      });
    });
  }, [address]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
  );
}
