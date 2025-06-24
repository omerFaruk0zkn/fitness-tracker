import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";

const UserInfoCard = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-background shadow rounded-xl p-4 text-sm sm:text-base flex items-center justify-between gap-2">
      <div className="flex-1">
        <p>
          <strong>Ad:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      {user && (
        <div className="size-18 md:size-20 rounded-full overflow-hidden shrink-0">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={user.profileImg?.url}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="uppercase font-bold text-2xl">
              {user?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
