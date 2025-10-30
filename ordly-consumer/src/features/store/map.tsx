'use client';

import { useEffect, useRef } from 'react';
import type { KakaoLatLng, KakaoMap, KakaoMarker } from '@/types/map.d.ts';

export default function KakaoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const markerInstanceRef = useRef<KakaoMarker | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      return;
    }

    const kakaoMaps = window.kakao.maps;

    const loadAndDisplayMap = () => {
      const defaultCoords = new kakaoMaps.LatLng(35.86307882929836, 129.19659755424922);
      displayMap(defaultCoords);
    };

    const displayMap = (coords: KakaoLatLng) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const options = { center: coords, level: 2 };
      const map = new kakaoMaps.Map(mapContainerRef.current, options);
      const marker = new kakaoMaps.Marker({ position: coords, map: map });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
    };

    kakaoMaps.load(loadAndDisplayMap);

    return () => {
      mapInstanceRef.current = null;
      markerInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100%' }}
      id="kakao-map"
    />
  );
}