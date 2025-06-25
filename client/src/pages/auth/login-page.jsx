import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useAuthStore } from "@/store/authStore";
import { LOGIN_FORM_CONTROLS } from "@/config";
import CommonForm from "@/components/common/form";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir mail adresi giriniz")
    .required("Email zorunlu"),
  password: Yup.string()
    .min(6, "En az 6 karakterli olmalı")
    .required("Şifre zorunlu"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (values, actions) => {
    login(values).then(() => {
      navigate("/");
      actions.setSubmitting(false);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-xl sm:text-2xl text-primary text-center font-bold mb-4">
        Giriş Yap
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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
            formControls={LOGIN_FORM_CONTROLS}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            buttonText="Giriş Yap"
          />
        )}
      </Formik>

      <div className="mt-2 text-center">
        Henüz hesabınız yok mu?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-primary underline"
        >
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
