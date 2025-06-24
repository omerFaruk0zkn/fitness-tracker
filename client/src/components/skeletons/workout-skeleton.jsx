import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const WorkoutSkeleton = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[130px] sm:w-[250px] h-7" />
        <Skeleton className="w-[80px] sm:w-[120px] h-7" />
      </div>

      <Skeleton className="w-full h-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="max-w-sm">
            <CardHeader>
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-2/3 h-4" />

              <CardAction>
                <Skeleton className="size-8 rounded-full" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video">
                <Skeleton className="w-full h-full absolute inset-0" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-5 items-start">
              <div className="flex items-center justify-between w-full">
                <Skeleton className="w-10 h-8" />
                <Skeleton className="w-16 h-8" />
              </div>

              <div className="flex items-center justify-between w-full">
                <Skeleton className="w-7/12 h-4" />
                <Skeleton className="w-10 h-6" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSkeleton;
