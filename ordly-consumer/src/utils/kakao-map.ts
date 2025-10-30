import { KakaoLatLng, GeocoderResult, GeocoderStatus } from '@/types/map';

export const getCoordsFromAddress = (address: string): Promise<KakaoLatLng> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      return reject(new Error('카카오맵 스크립트가 로드되지 않았습니다.'));
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const { OK, ZERO_RESULT } = window.kakao.maps.services.Status;

    geocoder.addressSearch(address, (result: GeocoderResult[], status: GeocoderStatus) => {
      if (status === OK && result.length > 0) {
        const coords = new window.kakao.maps.LatLng(
          Number(result[0].y),
          Number(result[0].x),
        );
        resolve(coords);
      } else if (status === ZERO_RESULT) {
        reject(new Error('주소를 찾을 수 없습니다.'));
      } else {
        reject(new Error('주소 변환 중 오류가 발생했습니다.'));
      }
    });
  });
};
