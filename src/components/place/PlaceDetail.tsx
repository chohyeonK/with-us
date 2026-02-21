"use client";

import { useSearchStore } from "@/store/useSearchStore";

const PlaceDetail = () => {
  const { selectedPlace, setSelectedPlace } = useSearchStore();

  if (!selectedPlace) return null;

  // 1. API별로 다른 컬럼명을 하나의 변수로 통합 (Normalization)
  const displayData = {
    title: selectedPlace.placeName || selectedPlace.title, // 이름 통합
    // 운영시간 또는 등록일자 중 있는 데이터를 사용
    time:
      selectedPlace.operatingTime || selectedPlace.issuedDate || "정보 없음",
    address: selectedPlace.address,
    phone: selectedPlace.tel,
    link: selectedPlace.url,
    // 설명 또는 정보 리스트 통합
    // info: selectedPlace.information || selectedPlace.infoList || [],
    // ⭐ 핵심: info를 무조건 배열 형태로 정규화
    info: (() => {
      const rawInfo = selectedPlace.information || selectedPlace.description;
      if (!rawInfo) return [];

      // 이미 배열이면 그대로 반환
      if (Array.isArray(rawInfo)) return rawInfo;

      // 문자열이라면? 공공데이터 특유의 구분자(|)가 있다면 자르고, 없으면 통째로 배열에 넣음
      return rawInfo.includes("|")
        ? rawInfo.split("|").map((s: string) => s.trim())
        : [rawInfo.trim()];
    })(),
    type: selectedPlace._type === "kids" ? "키즈존" : "반려동물",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] w-full animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto w-full max-w-md bg-white shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] rounded-t-[32px] overflow-hidden">
        <div className="px-6 pb-8 pt-5">
          {/* 타이틀 및 닫기 버튼 */}
          <div className="flex justify-between items-start mb-4">
            <h5 className="text-2xl font-bold text-gray-900 leading-tight items-center h-full">
              <span className="leading-none">{displayData.title}</span>
            </h5>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedPlace.placeName,
                      url: window.location.href,
                    });
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="공유하기"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>

              <button
                onClick={() => setSelectedPlace(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 주소 및 정보 */}
          <div className="space-y-2 mb-6">
            {/* 주소 */}
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {displayData.address}
            </p>

            {/* 운영시간 */}
            {displayData.time && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {displayData.time}
              </p>
            )}

            {/* 전화번호 */}
            {displayData.phone && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <svg
                  className="w-4 h-4 shrink-0 text-sky-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                전화번호: {displayData.phone}
              </p>
            )}
          </div>

          {/* 태그 리스트: 텍스트가 길어질 수 있으므로 flex-wrap 처리 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* {displayData.info} */}
            {displayData.info?.map((info, idx) => (
              <span
                key={idx}
                className="bg-sky-50 text-sky-600 text-[11px] font-semibold px-3 py-1 rounded-lg border border-sky-100"
              >
                {info}
              </span>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-2">
            <a
              href={displayData.link}
              target="_blank"
              className="flex-1 inline-flex justify-center items-center text-white bg-sky-500 hover:bg-sky-600 font-bold rounded-2xl text-sm px-5 py-4 transition-all active:scale-[0.98]"
            >
              상세보기
              <svg
                className="w-4 h-4 ms-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
