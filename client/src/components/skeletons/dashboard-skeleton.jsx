import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="p-4 space-y-10">
      <div className="space-y-6">
        <Skeleton className="w-[150px] sm:w-[250px] h-7" />

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-2/5 h-4" />
            </div>

            <Skeleton className="size-18 md:size-20 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Skeleton className="p-4 h-22" />
            <Skeleton className="p-4 h-22" />
            <Skeleton className="p-4 h-22" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="w-[150px] sm:w-[250px] h-7" />

        <Skeleton className="w-full h-4" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
          <Skeleton className="w-[250px] h-7" />
          <Skeleton className="w-[150px] h-7" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <Skeleton className="p-4 h-22" />
          <Skeleton className="p-4 h-22" />
          <Skeleton className="p-4 h-22" />
          <Skeleton className="p-4 h-22" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
