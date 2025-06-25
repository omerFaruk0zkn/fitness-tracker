import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useExerciseStore } from "@/store/exerciseStore";
import ExerciseCard from "@/components/exercises/exercise-card";
import ExerciseFilter from "@/components/exercises/exercise-filter";
import ManageExerciseDialog from "@/components/dialogs/manage-exercise-dialog";
import ExerciseSkeleton from "@/components/skeletons/exercise-skeleton";

const ExercisePage = () => {
  const { user } = useAuthStore();
  const { getAllExercise, exercises, loading } = useExerciseStore();
  const [openManageExerciseDialog, setOpenManageExerciseDialog] =
    useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Tümü");

  useEffect(() => {
    getAllExercise();
  }, [getAllExercise]);

  useEffect(() => {
    if (selectedGroup === "Tümü") {
      setFiltered(exercises);
    } else {
      setFiltered(exercises.filter((ex) => ex.muscleGroup === selectedGroup));
    }
  }, [selectedGroup, exercises]);

  const handleEditExercise = (exercise) => {
    setExerciseToEdit(exercise);
    setOpenManageExerciseDialog(true);
  };

  if (loading) return <ExerciseSkeleton />;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-secondary-foreground">
          Egzersizler
        </h1>

        {user?.isAdmin && (
          <Button
            onClick={() => setOpenManageExerciseDialog(true)}
            className="flex items-center gap-1 px-3 py-1 rounded text-sm"
          >
            <Plus size={16} /> Ekle
          </Button>
        )}
      </div>

      {exercises && exercises.length > 0 && (
        <ExerciseFilter
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      )}

      {exercises && exercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exercise={exercise}
              onEdit={handleEditExercise}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Henüz egzersiz bilgisi bulunmamaktadır
        </p>
      )}

      <ManageExerciseDialog
        openManageExerciseDialog={openManageExerciseDialog}
        setOpenManageExerciseDialog={setOpenManageExerciseDialog}
        exerciseToEdit={exerciseToEdit}
        setExerciseToEdit={setExerciseToEdit}
      />
    </div>
  );
};

export default ExercisePage;
