import { ArrowBigRightDash, Trash, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { useWorkoutStore } from "@/store/workoutStore";
import ReactPlayer from "react-player";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const WorkoutCard = ({ exercise, date, workoutId }) => {
  const { deleteWokoutItem, updateProgress } = useWorkoutStore();

  const handleDelete = () => {
    deleteWokoutItem(date, exercise.exerciseId._id);
  };

  const handleProgress = () => {
    updateProgress(workoutId, exercise.exerciseId._id);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="font-bold">{exercise.exerciseId.name}</CardTitle>

        {exercise.exerciseId.description && (
          <Popover>
            <PopoverTrigger asChild>
              <p className="text-primary font-medium underline cursor-pointer">
                Açıklama
              </p>
            </PopoverTrigger>
            <PopoverContent className="bg-background">
              <CardDescription className="text-secondary-foreground text-justify text-wrap">
                {exercise.exerciseId.description}
              </CardDescription>
            </PopoverContent>
          </Popover>
        )}

        <CardAction>
          <AlertDialog>
            <AlertDialogTrigger className="bg-destructive/80 text-secondary-foreground p-1 rounded-full hover:bg-destructive hover:scale-105 transition-transform hover:cursor-pointer">
              <Trash className="size-5" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <span className="capitalize text-secondary-foreground">
                    {exercise.exerciseId.name}
                  </span>{" "}
                  adlı egzersizi antrenman dan çıkarmak istediğinize emin
                  misiniz?
                </AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hayır</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Evet
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video">
          <ReactPlayer
            url={exercise.exerciseId.video?.url}
            controls
            width="100%"
            height="100%"
            className="absolute inset-0"
            light={exercise.exerciseId.image?.url || true}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 items-start">
        <div className="flex items-center justify-between w-full">
          <Badge className="bg-secondary-foreground text-secondary">
            {exercise.exerciseId.muscleGroup}
          </Badge>
          <Badge className="flex items-center bg-secondary-foreground text-secondary">
            {exercise.sets} {<X />} {exercise.reps}
          </Badge>
        </div>

        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-sm sm:text-base">
            Tamamlanan Set Sayısı: {exercise.completedSets}
          </span>
          <Button
            onClick={handleProgress}
            className="flex items-center p-1"
            size="small"
          >
            <span className="hidden md:inline">İlerle</span>
            <ArrowBigRightDash className="size-5 md:size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutCard;
