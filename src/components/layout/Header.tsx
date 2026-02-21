"use client";

import React, { useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { useSearchStore, FilterType } from "@/store/useSearchStore";

export default function Header() {
  const {
    filter,
    setFilter,
    searchKeyword,
    setSearchKeyword,
    setPlaces,
    setIsLoading,
    setSelectedPlace,
  } = useSearchStore();

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: "전체", value: "all" },
    { label: "키즈존", value: "kids" },
    { label: "반려동물", value: "pet" },
  ];

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;

    const commonParams = `keyword=${encodeURIComponent(searchKeyword)}&numOfRows=5&pageNo=1&_t=${Date.now()}`;

    setIsLoading(true);
    setSelectedPlace(null);

    try {
      let finalItems = [];

      if (filter === "all") {
        const [kidsRes, petRes] = await Promise.allSettled([
          fetch(
            `/api/public/kids?serviceKey=${process.env.NEXT_PUBLIC_DATA_KIDS_KEY}&${commonParams}`,
            { headers: { accept: "application/json" } },
          ),
          fetch(
            `/api/public/pet?serviceKey=${process.env.NEXT_PUBLIC_DATA_PETS_KEY}&${commonParams}`,
            { headers: { accept: "application/json" } },
          ),
        ]);

        if (kidsRes.status === "fulfilled" && kidsRes.value.ok) {
          const kidsData = await kidsRes.value.json();
          const items = kidsData.response?.body?.items?.item || [];
          finalItems.push(
            ...items.map((item: any) => ({ ...item, _type: "kids" })),
          );
        }

        if (petRes.status === "fulfilled" && petRes.value.ok) {
          const petData = await petRes.value.json();
          const items = petData.response?.body?.items?.item || [];
          finalItems.push(
            ...items.map((item: any) => ({ ...item, _type: "pet" })),
          );
        }
      } else {
        const endpoint =
          filter === "pet" ? "/api/public/pet" : "/api/public/kids";
        const serviceKey =
          filter === "pet"
            ? process.env.NEXT_PUBLIC_DATA_PETS_KEY
            : process.env.NEXT_PUBLIC_DATA_KIDS_KEY;
        const response = await fetch(
          `${endpoint}?serviceKey=${serviceKey}&${commonParams}`,
          { headers: { accept: "application/json" } },
        );

        if (response.ok) {
          const data = await response.json();
          const items = data.response?.body?.items?.item || [];
          finalItems = items.map((item: any) => ({ ...item, _type: filter }));
        }
      }

      setPlaces(finalItems);
    } catch (error) {
      console.error("검색 중 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 클릭 시 자동 검색
  useEffect(() => {
    if (searchKeyword.trim()) handleSearch();
  }, [filter]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="w-full bg-white px-4 pt-14 pb-4 flex flex-col gap-3 shadow-sm">
      <div className="flex justify-between items-center px-2">
        <a href="/">
          <h1 className="text-xl font-bold text-sky-600">with-us</h1>
        </a>
        {/* <button className="p-1">
          <Menu className="text-gray-600" />
        </button> */}
      </div>

      <div className="flex h-12 items-center rounded-full bg-white px-5 shadow-lg border border-gray-100 focus-within:ring-2 focus-within:ring-sky-500">
        <Search className="size-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="시설명 또는 지역명 검색"
          className="w-full bg-transparent outline-none text-sm text-gray-700"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold shadow-md transition-colors
              ${filter === option.value ? "bg-sky-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </header>
  );
}
