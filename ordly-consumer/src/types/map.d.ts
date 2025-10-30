export interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

export interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

export interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
}

export interface KakaoMarkerOptions {
  map: KakaoMap;
  position: KakaoLatLng;
}

export interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
}

export interface GeocoderResult {
  x: string;
  y: string;
}

export type GeocoderStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

export interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: GeocoderResult[], status: GeocoderStatus) => void,
  ) => void;
}

export interface KakaoServices {
  Geocoder: new () => KakaoGeocoder;
  Status: {
    OK: 'OK';
    ZERO_RESULT: 'ZERO_RESULT';
    ERROR: 'ERROR';
  };
}

export interface KakaoMaps {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
  services: KakaoServices;
}

declare global {
  interface Window {
    kakao: {
      maps: KakaoMaps;
    };
  }
}