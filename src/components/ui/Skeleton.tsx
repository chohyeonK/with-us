// components/ui/Skeleton.tsx
export const SkeletonCard = () => (
  <div className="w-full p-4 border-b border-gray-100 animate-pulse">
    <div className="flex justify-between items-start mb-2">
      <div className="h-6 w-3/4 bg-gray-200 rounded-md" /> {/* 제목 */}
      <div className="h-4 w-10 bg-gray-200 rounded-md" /> {/* 뱃지 */}
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-gray-100 rounded" /> {/* 주소 */}
      <div className="h-3 w-1/2 bg-gray-100 rounded" /> {/* 시간 */}
    </div>
  </div>
);
