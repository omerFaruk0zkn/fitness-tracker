import { Skeleton } from "../ui/skeleton";

const ProgressSkeleton = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[150px] sm:w-[250px] h-7" />

        <Skeleton className="w-[60px] sm:w-[120px] h-7" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid w-full gap-1.5">
            <Skeleton className="w-[50px] h-4" />
            <Skeleton className="w-full h-8" />
          </div>
        ))}
        <Skeleton className="w-full h-8" />
      </div>

      <div className="border-t pt-4 space-y-4">
        <Skeleton className="w-[150px] sm:w-[250px] h-7" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-full h-7" />
            <Skeleton className="w-full h-7" />
          </div>

          <Skeleton className="w-[150px] h-7" />
        </div>
        
        <div className="h-[250px]">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ProgressSkeleton;
