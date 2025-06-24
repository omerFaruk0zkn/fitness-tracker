import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-secondary-foreground">
      <Navbar />
      <main className="p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
