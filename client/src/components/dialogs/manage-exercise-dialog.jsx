import { Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MANAGE_EXERCISE_CONTROLS, MUSCLE_GROUP_ITEMS } from "@/config";
import { useExerciseStore } from "@/store/exerciseStore";
import CommonForm from "../common/form";
import * as Yup from "yup";

const ManageExerciseDialog = ({
  openManageExerciseDialog,
  setOpenManageExerciseDialog,
  exerciseToEdit,
  setExerciseToEdit,
}) => {
  const { addExercise, updateExercise } = useExerciseStore();

  const isEditMode = Boolean(exerciseToEdit);

  const initialValues = {
    name: exerciseToEdit?.name || "",
    description: exerciseToEdit?.description || "",
    muscleGroup: exerciseToEdit?.muscleGroup || "",
    video: exerciseToEdit?.video?.url || null,
  };

  const addExerciseSchema = Yup.object({
    name: Yup.string().required("Egzersiz adı zorunlu"),
    description: Yup.string(),
    muscleGroup: Yup.string()
      .oneOf(MUSCLE_GROUP_ITEMS)
      .required("Kas grubu zorunlu"),
    video: isEditMode
      ? Yup.mixed()
      : Yup.mixed().required("Egzersiz videosu zorunlu"),
  });

  const handleAddExercise = (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("muscleGroup", values.muscleGroup);
    if (values.video instanceof File) {
      formData.append("video", values.video);
    }

    const action = isEditMode
      ? updateExercise(exerciseToEdit._id, formData)
      : addExercise(formData);

    action.then(() => {
      actions.setSubmitting(false);
      setOpenManageExerciseDialog(false);
      setExerciseToEdit(null);
    });
  };

  return (
    <Dialog
      open={openManageExerciseDialog}
      onOpenChange={() => {
        setOpenManageExerciseDialog(false);
        setExerciseToEdit(null);
      }}
    >
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Egzersizi Güncelle" : "Egzersiz Ekle"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Egzersiz bilgilerini düzenleyin"
              : "Yeni egzersiz ekleyin"}
          </DialogDescription>
        </DialogHeader>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={addExerciseSchema}
          onSubmit={handleAddExercise}
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
            <CommonForm
              formControls={MANAGE_EXERCISE_CONTROLS}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              buttonText={isEditMode ? "Güncelle" : "Egzersiz Ekle"}
              existingVideoUrl={isEditMode ? exerciseToEdit?.video?.url : null}
            />
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ManageExerciseDialog;
