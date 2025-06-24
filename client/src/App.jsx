import { lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

import MainLayout from "@/layout/main-layout";
import AuthLayout from "./layout/auth-layout";
import ProtectedRoute from "@/components/common/protected-route";

const LoginPage = lazy(() => import("@/pages/auth/login-page"));
const RegisterPage = lazy(() => import("@/pages/auth/register-page"));
const DashboardPage = lazy(() => import("@/pages/home/dashboard-page"));
const ProgressPage = lazy(() => import("@/pages/progress/progress-page"));
const ExercisePage = lazy(() => import("@/pages/exercise/exercise-page"));
const WorkoutPage = lazy(() => import("@/pages/workout/workout-page"));
const ChartsPage = lazy(() => import("@/pages/charts/charts-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found/not-found-page"));

const App = () => {
  const { user, checkAuth, isChecking } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
        <div className="size-16 rounded-full bg-primary animate-pulse" />
        <p className="text-lg font-medium text-muted-foreground">
          Yükleniyor...
        </p>
      </div>
    );

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/auth/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
