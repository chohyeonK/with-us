import { create } from "zustand";

// 필터 타입 정의
export type FilterType = "all" | "kids" | "pet";

interface Coords {
  lat: number;
  lng: number;
}

interface Place {
  address: string;
  placeName: string;
  operatingTime: string;
  tel: string;
  url: string;
  coords: Coords;
  information?: string[];
}

interface SearchState {
  // 검색 상태
  filter: FilterType;
  searchKeyword: string;
  setFilter: (filter: FilterType) => void;
  setSearchKeyword: (keyword: string) => void;

  // 선택된 장소 상태
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // 초깃값
  filter: "all",
  searchKeyword: "",
  selectedPlace: null,

  // 액션
  setFilter: (filter) => set({ filter }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
}));
