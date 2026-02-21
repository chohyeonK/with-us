"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { usePlaces } from "@/hooks/usePlaces";
import PlaceDetail from "@/components/place/PlaceDetail";
import { useSearchStore } from "@/store/useSearchStore";
import { SkeletonCard } from "@/components/ui/Skeleton";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

export default function Home() {
  const places = useSearchStore((state) => state.places);
  const isLoading = useSearchStore((state) => state.isLoading);

  // console.log("데이터 가져옴", places);
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      <Header />

      <main className="flex-1 w-full relative">
        {/* 로딩 중일 때 리스트 위에 덮이는 스켈레톤 레이어 */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
        <LeafletMap places={places} isLoading={isLoading} />
        <PlaceDetail />
      </main>
    </div>
  );
}
