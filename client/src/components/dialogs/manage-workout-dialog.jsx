import { useEffect, useMemo } from "react";
import { FieldArray, Formik } from "formik";
import { Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useExerciseStore } from "@/store/exerciseStore";
import { useWorkoutStore } from "@/store/workoutStore";
import CommonForm from "../common/form";
import * as Yup from "yup";

const addWorkoutSchema = Yup.object({
  date: Yup.string().required("Tarih zorunludur"),
  exercises: Yup.array()
    .of(
      Yup.object({
        exerciseId: Yup.string().required("Egzersiz seçilmeli"),
        sets: Yup.number().required("Set sayısı").min(1),
        reps: Yup.number().required("Tekrar sayısı").min(1),
      })
    )
    .min(1, "En az 1 egzersiz ekleyin"),
});

const ManageWorkoutDialog = ({
  openManageWorkoutDialog,
  setOpenManageWorkoutDialog,
}) => {
  const { workout, addWorkout, updateWorkout, getWorkoutByDate } =
    useWorkoutStore();
  const { exercises, getAllExercise } = useExerciseStore();
  const today = format(new Date(), "yyyy-MM-dd");
  const isEdit = Boolean(workout);

  const initialValues = workout
    ? {
        date: workout.date || today,
        exercises: workout.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId._id,
          sets: exercise.sets,
          reps: exercise.reps,
        })),
      }
    : {
        date: "",
        exercises: [
          {
            exerciseId: "",
            sets: 0,
            reps: 0,
          },
        ],
      };

  useEffect(() => {
    getAllExercise();
  }, [getAllExercise]);

  const handleManageWorkout = (values, actions) => {
    if (isEdit) {
      updateWorkout(values).then(() => {
        getWorkoutByDate(today);
        actions.setSubmitting(false);
        setOpenManageWorkoutDialog(false);
      });
    } else {
      addWorkout(values).then(async () => {
        await getWorkoutByDate(today);
        actions.setSubmitting(false);
        actions.resetForm();
        setOpenManageWorkoutDialog(false);
      });
    }
  };

  const buildFormControls = (exerciseOptions, exerciseValues) => {
    const controls = [
      {
        name: "date",
        label: "Tarih",
        componentType: "date",
      },
    ];

    exerciseValues.forEach((_, index) => {
      controls.push(
        {
          name: `exercises[${index}].exerciseId`,
          label: "Egzersiz",
          componentType: "select",
          placeholder: "Egzersiz seç",
          options: exerciseOptions,
        },
        {
          name: `exercises[${index}].sets`,
          label: "Set",
          componentType: "input",
          type: "number",
          placeholder: "Set sayısını giriniz",
        },
        {
          name: `exercises[${index}].reps`,
          label: "Tekrar",
          componentType: "input",
          type: "number",
          placeholder: "Tekrar sayısını giriniz",
        }
      );
    });

    return controls;
  };

  const exerciseOptions = useMemo(
    () =>
      exercises.map((e) => ({
        id: e._id,
        label: e.name,
      })),
    [exercises]
  );

  return (
    <Dialog
      open={openManageWorkoutDialog}
      onOpenChange={setOpenManageWorkoutDialog}
    >
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Antrenmanı Güncelle" : "Yeni Antrenman Ekle"}
          </DialogTitle>
          <DialogDescription>
            Tarih seçin ve egzersizleri girin
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={addWorkoutSchema}
          onSubmit={handleManageWorkout}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <CommonForm
                formControls={buildFormControls(
                  exerciseOptions,
                  values.exercises
                )}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                buttonText={
                  isEdit ? "Antrenmanı Güncelle" : "Antrenmanı Kaydet"
                }
              />

              <FieldArray name="exercises">
                {({ push, remove }) => (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2">
                      {values.exercises.map((_, index) => (
                        <div key={index} className="flex justify-end">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => remove(index)}
                            disabled={values.exercises.length === 1}
                          >
                            <Trash className="size-4 mr-2" />
                            {index + 1}. Egzersizi Kaldır
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex bg-secondary text-secondary-foreground items-center gap-2"
                      onClick={() =>
                        push({ exerciseId: "", sets: "", reps: "" })
                      }
                    >
                      <Plus size={16} />
                      Egzersiz Ekle
                    </Button>
                  </div>
                )}
              </FieldArray>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ManageWorkoutDialog;
