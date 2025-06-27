import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { NAVLINKS } from "@/config";
import { ModeToggle } from "../theme/mode-toggle";
import MobileNavbar from "./mobile-navbar";
import EditProfileDialog from "../dialogs/edit-profile-dialog";
import DropdownMenuNav from "../common/dropdown-menu-nav";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleLogout = async () => {
    await logout().then(() => {
      navigate("/auth/login");
    });
  };

  return (
    <nav className="w-full backdrop-blur-sm shadow-md p-4 sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Fitness Tracker
        </Link>

        <div className="flex items-center space-x-6 text-base font-medium">
          {NAVLINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "text-primary" : "hover:text-primary text-foreground"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenuNav
            handleLogout={handleLogout}
            setOpenEditDialog={setOpenEditDialog}
          />

          <ModeToggle />
        </div>
      </div>

      <MobileNavbar
        handleLogout={handleLogout}
        setOpenEditDialog={setOpenEditDialog}
      />
      <EditProfileDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
      />
    </nav>
  );
};

export default Navbar;
