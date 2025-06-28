import React from 'react';

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full border border-blue-500/20 rounded-3xl bg-[#28282b] shadow-xl">
        {/* Header Skeleton */}
        <div className="flex bg-[#43434d] rounded-t-3xl">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={`header-${index}`}
              className="flex-1 p-4"
            >
              <div className="h-6 bg-gray-600/50 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
        {/* Rows Skeleton */}
        <div className="bg-[#28282b]">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex border-t border-blue-500/20"
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="flex-1 p-4"
                >
                  <div className="h-6 bg-gray-600/50 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;