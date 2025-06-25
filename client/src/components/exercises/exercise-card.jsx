import { Edit, Trash } from "lucide-react";
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
import { Badge } from "../ui/badge";
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
import { useAuthStore } from "@/store/authStore";
import { useExerciseStore } from "@/store/exerciseStore";
import ReactPlayer from "react-player";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const ExerciseCard = ({ exercise, onEdit }) => {
  const { user } = useAuthStore();
  const { deleteExerciseById } = useExerciseStore();

  const handleDelete = () => {
    deleteExerciseById(exercise._id);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="font-bold text-base sm:text-lg">{exercise.name}</CardTitle>

        {exercise.description && (
          <Popover>
            <PopoverTrigger asChild>
              <p className="text-primary font-medium underline cursor-pointer">
                Açıklama
              </p>
            </PopoverTrigger>
            <PopoverContent className="bg-background">
              <CardDescription className="text-secondary-foreground text-justify text-wrap">
                {exercise.description}
              </CardDescription>
            </PopoverContent>
          </Popover>
        )}

        {user.isAdmin && (
          <CardAction className="flex items-center gap-2">
            <Button
              className="rounded-full size-7 hover:scale-105 transition-transform"
              onClick={() => onEdit(exercise)}
            >
              <Edit className="size-5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger className="bg-destructive/80 text-secondary-foreground p-1 rounded-full hover:bg-destructive hover:scale-105 transition-transform hover:cursor-pointer">
                <Trash className="size-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <span className="capitalize text-secondary-foreground ">
                      {exercise.name}
                    </span>{" "}
                    adlı egzersizi silmek istediğinize emin misiniz?
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
        )}
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video">
          <ReactPlayer
            url={exercise.video?.url}
            controls
            width="100%"
            height="100%"
            className="absolute inset-0"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Badge className="text-xs font-bold">{exercise.muscleGroup}</Badge>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
