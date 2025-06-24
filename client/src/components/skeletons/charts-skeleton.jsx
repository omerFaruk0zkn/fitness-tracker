import { Skeleton } from "../ui/skeleton";

const ChartsSkeleton = () => {
  return (
    <div className="p-4 space-y-6">
      <Skeleton className="w-[150px] sm:w-[250px] h-7" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-full relative overflow-x-hidden rounded-md"
          >
            <Skeleton className="w-1/2 h-7 absolute top-2 left-2" />

            <div className="min-w-sm h-[300px]">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="w-8/12 h-8/12 flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsSkeleton;
