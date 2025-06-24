import { Edit, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";

const DropdownMenuNav = ({
  setOpenEditDialog,
  setOpenMobileNavbar,
  handleLogout,
}) => {
  const { user } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage
            src={user.profileImg?.url}
            className="object-cover w-full h-full"
          />
          <AvatarFallback className="font-medium text-lg uppercase">
            {user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2">
        <DropdownMenuItem
          onClick={() => {
            if (setOpenMobileNavbar) {
              setOpenMobileNavbar(false);
            }
            setOpenEditDialog(true);
          }}
          className="cursor-pointer hover:text-primary font-medium flex items-center"
        >
          Edit Profile
          <DropdownMenuShortcut>
            <Edit className="text-primary" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-secondary-foreground">
          <Button
            size="sm"
            variant="outline"
            className="border-none font-medium"
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
          <DropdownMenuShortcut>
            <LogOut className="text-primary" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuNav;
