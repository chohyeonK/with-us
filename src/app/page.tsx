"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { usePlaces } from "@/hooks/usePlaces";
import PlaceDetail from "@/components/place/PlaceDetail";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

export default function Home() {
  const { data: places, isLoading } = usePlaces(); // 데이터와 로딩 상태 가져오기
  console.log("데이터 가져옴", places);
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      <Header />

      <main className="flex-1 w-full relative">
        <LeafletMap places={places} isLoading={isLoading} />
        <PlaceDetail />
      </main>
    </div>
  );
}
