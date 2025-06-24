import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";

const ExerciseSkeleton = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="w-[150px] sm:w-[250px] h-7" />

        {user?.isAdmin && <Skeleton className="w-[50px] h-7" />}
      </div>

      <div className="flex w-full overflow-x-auto gap-2 pb-2">
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
        <Skeleton className="w-[70px] h-10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="max-w-sm">
            <CardHeader>
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-2/3 h-4" />

              {user.isAdmin && (
                <CardAction>
                  <Skeleton className="size-8 rounded-full" />
                </CardAction>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video">
                <Skeleton className="w-full h-full absolute inset-0" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="w-[20px] h-4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExerciseSkeleton;
