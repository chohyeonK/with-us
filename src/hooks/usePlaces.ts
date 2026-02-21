import { useQuery } from "@tanstack/react-query";

const serviceKidsKey = process.env.NEXT_PUBLIC_DATA_KIDS_KEY;

export const usePlaces = () => {
  return useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      // 키가 없을 경우를 대비한 얼리 리턴
      if (!serviceKidsKey) {
        // console.log("API Key가 설정되지 않았습니다.");
        return [];
      }
      const response = await fetch(
        `https://api.kcisa.kr/openapi/API_CIA_085/request?serviceKey=${serviceKidsKey}&numOfRows=10&pageNo=1&keyword=%EC%9D%B8%EC%B2%9C`,
        { headers: { accept: "application/json" } },
      );

      if (!response.ok) throw new Error("네트워크 응답에 문제가 있습니다.");

      const data = await response.json();
      // console.log("전체 API 응답:", data);

      // API 응답 구조가 'data.response.body.items.item'일 확률이 높으니 확인 필요
      const items = data?.response.body?.items?.item || [];
      return Array.isArray(items) ? items : [items]; // 단일 객체일 경우 배열로 변환
    },
    select: (data) => {
      return data.map((item: any) => ({
        ...item,
        lat: Number(item.coordinates.split(", ")[0].replace("N", "")),
        lng: Number(item.coordinates.split(", ")[1].replace("E", "")),
        infoList: item.information
          ?.split("|")
          .map((s: string) => s.trim() || []),
      }));
    },
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 신선하게 유지(성능 최적화)
  });
};
