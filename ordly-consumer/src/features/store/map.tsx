'use client';

import { useEffect, useRef } from 'react';

interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
}

interface KakaoMarkerOptions {
  map: KakaoMap;
  position: KakaoLatLng;
}

interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
}

interface GeocoderResult {
  x: string;
  y: string;
}

type GeocoderStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: GeocoderResult[], status: GeocoderStatus) => void,
  ) => void;
}

interface KakaoServices {
  Geocoder: new () => KakaoGeocoder;
  Status: {
    OK: 'OK';
    ZERO_RESULT: 'ZERO_RESULT';
    ERROR: 'ERROR';
  };
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
        services: KakaoServices;
      };
    };
  }
}

interface Props {
  address: string;
}

export default function KakaoMap({ address }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('카카오맵 SDK가 로드되지 않았습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      if (!mapContainerRef.current) return;

      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status !== window.kakao.maps.services.Status.OK || result.length === 0) {
          console.error(`주소 검색 실패: ${address}, 상태: ${status}`);
          const defaultCoords = new window.kakao.maps.LatLng(37.5665, 126.9780);
          displayMap(defaultCoords, '주소를 찾을 수 없어 기본 위치를 표시합니다.');
          return;
        }

        if (!mapContainerRef.current) return;

        const coords = new window.kakao.maps.LatLng(
          Number(result[0].y),
          Number(result[0].x),
        );

        displayMap(coords);
      });
    });

    const displayMap = (coords: KakaoLatLng, errorMessage?: string) => {
      if (!mapContainerRef.current) return;

      const options = {
        center: coords,
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainerRef.current, options);
      mapInstanceRef.current = map;

      new window.kakao.maps.Marker({
        map: map,
        position: coords,
      });

      map.setCenter(coords);

      if (errorMessage) {
          console.warn(errorMessage);
      }
    };

  }, [address]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100%' }}
      id="kakao-map"
    >
    </div>
  );
}