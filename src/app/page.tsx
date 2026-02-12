"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white">
      <Header />

      <main className="flex-1 w-full relative">
        <LeafletMap />
      </main>
    </div>
  );
}
