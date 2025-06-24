import { Formik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { EDIT_PROFILE_CONTROLS } from "@/config";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useProgressStore } from "@/store/progressStore";
import { toast } from "sonner";
import CommonForm from "../common/form";
import * as Yup from "yup";

const editProfileSchema = Yup.object({
  profileImg: Yup.mixed().nullable(),
  name: Yup.string(),
  email: Yup.string().email("Geçerli bir e-posta adresi giriniz"),
  target_weight: Yup.string().transform((value) => value?.replace(",", ".")),
});

const EditProfileDialog = ({ openEditDialog, setOpenEditDialog }) => {
  const { checkAuth, user } = useAuthStore();
  const { progresses } = useProgressStore();
  const { editProfile } = useUserStore();

  const lastProgress = progresses[progresses.length - 1];

  const initialValues = {
    profileImg: user ? user.profileImg?.url : null,
    name: user ? user.name : "",
    email: user ? user.email : "",
    target_weight: user ? user.target_weight : "",
  };

  const handleEditProfile = (values, actions) => {
    if (
      values.target_weight &&
      (values.target_weight > lastProgress?.weight ||
        values.target_weight > user?.weight)
    ) {
      toast.error(
        "Hedef kilonuz mevcut kilonuzdan veya son girilen kilonuzdan düşük olmalıdır"
      );
      actions.setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("profileImg", values.profileImg);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("target_weight", values.target_weight);

    editProfile(formData).then(() => {
      checkAuth();
      actions.setSubmitting(false);
      setOpenEditDialog(false);
    });
  };

  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profil Güncelleme</DialogTitle>
          <DialogDescription>
            Profil bilgilerinizi güncelleyin
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={editProfileSchema}
          onSubmit={handleEditProfile}
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
              formControls={EDIT_PROFILE_CONTROLS}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              buttonText="Güncelle"
            />
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
