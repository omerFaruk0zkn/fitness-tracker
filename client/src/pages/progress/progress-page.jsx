import { useEffect, useState } from "react";
import { Formik } from "formik";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/progressStore";
import { CREATE_PROGRESS_CONTROLS } from "@/config";
import ProgressDataTable from "@/components/data-table/progress-data-table";
import CommonForm from "@/components/common/form";
import ProgressSkeleton from "@/components/skeletons/progress-skeleton";
import * as Yup from "yup";

const createProgressSchema = Yup.object({
  date: Yup.string().required("Tarih zorunludur"),
  weight: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Kilo zorunlu"),
  shoulder: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Omuz ölçüsü zorunlu"),
  chest: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Göğüs ölçüsü zorunlu"),
  waist: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Bel ölçüsü zorunlu"),
  hip: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Kalça ölçüsü zorunlu"),
  arm_right: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Sağ kol ölçüsü zorunlu"),
  arm_left: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Sol kol ölçüsü zorunlu"),
  leg: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Bacak ölçüsü zorunlu"),
  abdominal: Yup.string()
    .transform((value) => value?.replace(",", "."))
    .required("Karın ölçüsü zorunlu"),
});

const ProgressPage = () => {
  const {
    progresses,
    createProgress,
    getProgressData,
    updateProgress,
    deleteProgress,
    exportProgressToPDF,
    isFetching,
    loading,
  } = useProgressStore();
  const [deleteId, setDeleteId] = useState(null);
  const [editingProgress, setEditingProgress] = useState(null);

  const initialValues = editingProgress
    ? {
        date: editingProgress.date,
        weight: editingProgress.weight.toString(),
        shoulder: editingProgress.shoulder.toString(),
        chest: editingProgress.chest.toString(),
        waist: editingProgress.waist.toString(),
        hip: editingProgress.hip.toString(),
        arm_right: editingProgress.arm_right.toString(),
        arm_left: editingProgress.arm_left.toString(),
        leg: editingProgress?.leg?.toString(),
        abdominal: editingProgress?.abdominal?.toString(),
      }
    : {
        date: null,
        weight: "",
        shoulder: "",
        chest: "",
        waist: "",
        hip: "",
        arm_right: "",
        arm_left: "",
      };

  useEffect(() => {
    getProgressData();
  }, [getProgressData]);

  const handleCreateOrUpdateProgress = (values, actions) => {
    if (editingProgress) {
      updateProgress(editingProgress._id, values).then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        setEditingProgress(null);
      });
    } else {
      createProgress(values).then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
    }
  };

  const onEdit = (progress) => {
    setEditingProgress(progress);
  };

  const onDelete = (id) => {
    setDeleteId(id);
  };

  const exportPDF = async () => {
    const data = await exportProgressToPDF();
    const blob = new Blob([data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "progress.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (isFetching) return <ProgressSkeleton />;

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-secondary-foreground">
          Gelişim Takibi
        </h1>

        {progresses && progresses.length > 0 && (
          <Button
            onClick={exportPDF}
            className="bg-destructive hover:bg-destructive/80 text-secondary-foreground rounded"
            disabled={loading}
          >
            {loading && <Loader size={16} className="animate-spin" />} PDF Dışa
            Aktar
          </Button>
        )}
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createProgressSchema}
        onSubmit={handleCreateOrUpdateProgress}
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
            formControls={CREATE_PROGRESS_CONTROLS}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            customClass="grid grid-cols-2 gap-5"
            buttonText={editingProgress ? "Güncelle" : "Ekle"}
          />
        )}
      </Formik>

      <div className="border-t pt-4 space-y-4">
        <h2 className="font-semibold text-secondary-foreground">
          Geçmiş Veriler
        </h2>

        {progresses && progresses.length > 0 ? (
          <ProgressDataTable
            progresses={progresses}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ) : (
          <p className="text-muted-foreground">
            Henüz gelişim bilgisi bulunmamaktadır
          </p>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Veriyi silmek istiyor musun?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              onClick={() => {
                deleteProgress(deleteId);
                setDeleteId(null);
              }}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProgressPage;
