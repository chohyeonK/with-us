"use client";

import { useSearchStore } from "@/store/useSearchStore";

const PlaceDetail = () => {
  const { selectedPlace, setSelectedPlace } = useSearchStore();

  if (!selectedPlace) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] w-full animate-in slide-in-from-bottom-full duration-300">
      <div className="mx-auto w-full max-w-md bg-white shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] rounded-t-[32px] overflow-hidden">
        {/* 모바일 바텀 시트 느낌을 주는 핸들 바 (Handle Bar) */}
        {/* <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div> */}

        <div className="px-6 pb-8 pt-5">
          {/* 타이틀 및 닫기 버튼 */}
          <div className="flex justify-between items-start mb-4">
            <h5 className="text-2xl font-bold text-gray-900 leading-tight">
              {selectedPlace.placeName}
            </h5>
            <button
              onClick={() => setSelectedPlace(null)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
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

          {/* 주소 및 정보 */}
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
            <svg
              className="w-4 h-4"
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
            {selectedPlace.address}
          </p>

          {/* 태그 리스트: 텍스트가 길어질 수 있으므로 flex-wrap 처리 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPlace.information?.map((info, idx) => (
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
              href={selectedPlace.url}
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
