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
  title?: string;
  operatingTime: string;
  tel: string;
  url: string;
  coords: Coords;
  information?: string[];
  _type?: string; // API 구분을 위한 타입 추가
}

interface SearchState {
  // 검색 상태
  filter: FilterType;
  searchKeyword: string;
  isLoading: boolean; // ⭐ false에서 boolean으로 수정해야 상태 변경이 가능합니다.
  places: any[]; // ⭐ 인터페이스에 places가 빠져있어서 에러가 났던 겁니다.

  // 액션
  setFilter: (filter: FilterType) => void;
  setSearchKeyword: (keyword: string) => void;
  setIsLoading: (isLoading: boolean) => void; // ⭐ 액션 인터페이스 추가
  setPlaces: (places: any[]) => void; // ⭐ 액션 인터페이스 추가

  // 선택된 장소 상태
  selectedPlace: Place | null;
  setSelectedPlace: (place: Place | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // // 초깃값
  filter: "all",
  searchKeyword: "",
  selectedPlace: null,
  places: [],
  isLoading: false, // 초기값 설정

  // // 액션
  setFilter: (filter) => set({ filter }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
  setPlaces: (places) => set({ places }),
  setIsLoading: (isLoading) => set({ isLoading }), // 이제 에러 없이 작동합니다.
}));
