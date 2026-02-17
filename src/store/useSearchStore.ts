import { create } from "zustand";

// 필터 타입 정의
export type FilterType = "all" | "kids" | "pet";

interface SearchState {
  filter: FilterType;
  searchKeyword: string;
  setFilter: (filter: FilterType) => void;
  setSearchKeyword: (keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  filter: "all",
  searchKeyword: "",
  setFilter: (filter) => set({ filter }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
}));
