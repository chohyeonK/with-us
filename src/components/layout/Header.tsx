"use client";

import React from "react";
import { Search, Menu } from "lucide-react"; // Lucide React 아이콘 활용
import { useSearchStore, FilterType } from "@/store/useSearchStore";

export default function Header() {
  const { filter, setFilter, searchKeyword, setSearchKeyword } =
    useSearchStore();
  const filterOptions: { label: string; value: FilterType }[] = [
    { label: "전체", value: "all" },
    { label: "키즈존", value: "kids" },
    { label: "반려동물", value: "pet" },
  ];
  return (
    <header className="w-full bg-white px-4 pt-14 pb-4 flex flex-col gap-3 shadow-sm">
      {/* 1. 로고 및 상단 메뉴 (선택사항) */}
      <div className="flex justify-between items-center px-2">
        <h1 className="text-xl font-bold text-sky-600">with-us</h1>
        <button className="p-1">
          <Menu className="text-gray-600" />
        </button>
      </div>

      {/* 2. 통합 검색바 */}
      <div className="flex h-12 items-center rounded-full bg-white px-5 shadow-lg border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-sky-500">
        <Search className="size-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)} // 검색어 상태 업데이트
          placeholder="시설명 또는 지역명 검색"
          className="w-full bg-transparent outline-none text-sm text-gray-700"
        />
      </div>

      {/* 3. 퀵 필터 칩 영역 (Zustand와 연동될 부분) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)} // 필터 상태 업데이트
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
