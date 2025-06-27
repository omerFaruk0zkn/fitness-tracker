import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Edit, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useWorkoutStore } from "@/store/workoutStore";
import ManageWorkoutDialog from "@/components/dialogs/manage-workout-dialog";
import WorkoutCard from "@/components/workouts/workout-card";
import WorkoutSkeleton from "@/components/skeletons/workout-skeleton";

const WorkoutPage = () => {
  const { workout, getWorkoutByDate, isFetching } = useWorkoutStore();
  const [openManageWorkoutDialog, setOpenManageWorkoutDialog] = useState(false);
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const today = format(new Date(), "yyyy-MM-dd");

  const totalSets = workout?.exercises.reduce(
    (acc, exercise) => acc + exercise.sets,
    0
  );
  const totalCompletedSets = workout?.exercises.reduce(
    (acc, exercise) => acc + exercise.completedSets,
    0
  );

  const progress = (totalCompletedSets / totalSets) * 100;

  useEffect(() => {
    getWorkoutByDate(today);
  }, [getWorkoutByDate, today]);

  useEffect(() => {
    if (progress === 100) {
      setShowCompletionAlert(true);
    }
  }, [progress]);

  if (isFetching) return <WorkoutSkeleton />;

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <h1 className="font-bold text-base sm:text-xl text-secondary-foreground">
          Günün Antrenman Egzersizleri
        </h1>
        <Button
          onClick={() => setOpenManageWorkoutDialog(true)}
          className="flex items-center gap-1 px-1 py-0.5 sm:px-3 sm:py-1 rounded text-xs sm:text-sm"
        >
          {workout ? (
            <span className="flex items-center gap-2">
              <Edit size={16} /> Antrenman Güncelle
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plus size={16} /> Antrenman Ekle
            </span>
          )}
        </Button>
      </div>

      {workout && (
        <div className="flex items-center gap-2">
          <Progress value={progress} />
          {progress > 0 && (
            <span className="text-secondary-foreground font-semibold">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}

      {workout ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workout?.exercises.map((exercise) => (
            <WorkoutCard
              key={exercise._id}
              exercise={exercise}
              date={today}
              workoutId={workout._id}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Henüz antrenman bilgisi bulunmamaktdır
        </p>
      )}

      <ManageWorkoutDialog
        openManageWorkoutDialog={openManageWorkoutDialog}
        setOpenManageWorkoutDialog={setOpenManageWorkoutDialog}
      />

      <AlertDialog
        open={showCompletionAlert}
        onOpenChange={setShowCompletionAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tebrikler, Günlük Çalışmanızı Tamamladınız
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hedefinize adım adım ilerliyorsunuz. Böyle devam!!!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kapat</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkoutPage;
