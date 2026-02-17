"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSearchStore } from "@/store/useSearchStore"; // Zustand 스토어
import { useEffect } from "react";

interface LeafletMapProps {
  places?: any[];
  isLoading: boolean;
}

// 마커 아이콘 깨짐 방지 설정 (컴포넌트 밖에서 한 번만 수행)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMap({ places, isLoading }: LeafletMapProps) {
  // 1. Zustand에서 상태 변경 함수를 가져옵니다.
  const { setSelectedPlace } = useSearchStore();

  const position: [number, number] = [37.394, 126.627]; // 인하대 기준

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 2. 로딩 중이 아닐 때만 마커 렌더링 */}
      {!isLoading &&
        places?.map((place, index) => {
          // // 2. 문자열 분리 및 특수문자 제거 (정규식 활용으로 더 안전하게)
          // const [rawLat, rawLng] = place.coordinates.split(",");

          // // 'N', 'E' 문자열 제거 및 앞뒤 공백 제거 후 숫자로 변환
          // const lat = Number(rawLat.replace(/[NE\s]/g, ""));
          // const lng = Number(rawLng.replace(/[NE\s]/g, ""));

          // // 3. 변환 결과가 유효한 숫자인지 최종 검증
          // if (isNaN(lat) || isNaN(lng)) {
          //   console.warn(`좌표 변환 실패: ${place.title}`, place.coordinates);
          //   return null;
          // }
          return (
            <Marker
              key={place.id || index}
              position={[place.lat, place.lng]}
              eventHandlers={{
                click: (e) => {
                  console.log("선택된 장소:", place); // 디버깅용
                  setSelectedPlace({
                    placeName: place.title,
                    address: place.address,
                    operatingTime: place.operatingTime,
                    tel: place.tel,
                    url: place.url,
                    coords: { lat: place.lat, lng: place.lng },
                    information: place.infoList,
                  });
                  const map = e.target._map;
                  map.flyTo([place.lat, place.lng], 16, {
                    animate: true,
                    duration: 1.5, // 이동 속도 (초)
                  });
                },
              }}
            >
              <Popup>{place.facltNm || place.title || "장소명 없음"}</Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
