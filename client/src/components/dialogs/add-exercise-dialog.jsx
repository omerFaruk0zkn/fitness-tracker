import { Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ADD_EXERCISE_CONTROLS, MUSCLE_GROUP_ITEMS } from "@/config";
import { useExerciseStore } from "@/store/exerciseStore";
import CommonForm from "../common/form";
import * as Yup from "yup";

const initialValues = {
  name: "",
  description: "",
  muscleGroup: "",
  video: null,
};

const addExerciseSchema = Yup.object({
  name: Yup.string().required("Egzersiz adı zorunlu"),
  description: Yup.string(),
  muscleGroup: Yup.string()
    .oneOf(MUSCLE_GROUP_ITEMS)
    .required("Kas grubu zorunlu"),
  video: Yup.mixed().required("Egzersiz videosu zorunlu"),
});

const AddExerciseDialog = ({
  openAddExerciseDialog,
  setOpenAddExerciseDialog,
}) => {
  const { addExercise } = useExerciseStore();

  const handleAddExercise = (values, actions) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("muscleGroup", values.muscleGroup);
    formData.append("video", values.video);

    addExercise(formData).then(() => {
      actions.setSubmitting(false);
      setOpenAddExerciseDialog(false);
    });
  };

  return (
    <Dialog
      open={openAddExerciseDialog}
      onOpenChange={setOpenAddExerciseDialog}
    >
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Egzersiz Ekleme</DialogTitle>
          <DialogDescription>Yeni egzersiz ekleyin</DialogDescription>
        </DialogHeader>

        <Formik
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
              formControls={ADD_EXERCISE_CONTROLS}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              buttonText="Egzersiz Ekle"
            />
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseDialog;
