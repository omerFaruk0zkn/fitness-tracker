import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { NAVLINKS } from "@/config";
import { ModeToggle } from "../theme/mode-toggle";
import DropdownMenuNav from "../common/dropdown-menu-nav";

const MobileNavbar = ({ handleLogout, setOpenEditDialog }) => {
  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={openMobileNavbar} onOpenChange={setOpenMobileNavbar}>
        <SheetTrigger>
          <Menu className="size-6 hover:cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="max-w-[250px]">
          <SheetHeader>
            <SheetTitle className="text-secondary-foreground">
              <Link
                to="/"
                className="text-xl font-bold"
                onClick={() => setOpenMobileNavbar(false)}
              >
                Fitness Tracker
              </Link>
            </SheetTitle>
            <SheetDescription>Uygulamayı keşfedin</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col space-y-4 p-4 text-lg font-medium">
            {NAVLINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary underline"
                    : "hover:underline text-secondary-foreground hover:text-primary"
                }
                onClick={() => setOpenMobileNavbar(false)}
              >
                <div className="flex items-center gap-2">
                  <link.icon className="size-6" />
                  {link.label}
                </div>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto ml-4 mb-5 flex items-center gap-2">
            <DropdownMenuNav
              handleLogout={handleLogout}
              setOpenEditDialog={setOpenEditDialog}
              setOpenMobileNavbar={setOpenMobileNavbar}
            />

            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
