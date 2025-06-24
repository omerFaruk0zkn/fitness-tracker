import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { REGISTER_FORM_CONTROLS } from "@/config";
import { useAuthStore } from "@/store/authStore";
import CommonForm from "@/components/common/form";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  height: "",
};

const registerSchema = Yup.object({
  name: Yup.string().required("İsim zorunlu"),
  email: Yup.string()
    .email("Geçerli bir mail adresi giriniz")
    .required("Email zorunlu"),
  password: Yup.string()
    .min(6, "En az 6 karakterli olmalı")
    .required("Şifre zorunlu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunlu"),
  height: Yup.string().required("Boy bilgisi zorunludur"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const handleRegister = async (values, actions) => {
    await register(values).then(() => {
      navigate("/");
      actions.setSubmitting(false);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl text-primary text-center font-bold mb-4">
        Kayıt Ol
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
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
            formControls={REGISTER_FORM_CONTROLS}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            buttonText="Kayıt Ol"
          />
        )}
      </Formik>

      <div className="mt-2 text-center">
        Zaten bir hesabınız var mı?{" "}
        <Link to="/auth/login" className="font-medium text-primary underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
