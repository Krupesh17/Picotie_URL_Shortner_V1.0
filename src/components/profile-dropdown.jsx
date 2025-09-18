import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { ProfileAvatar } from ".";
import {
  AlertCircleIcon,
  LinkIcon,
  LoaderIcon,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogOut } from "@/tanstack-query/queries";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profileDropdownMenuList = [
    {
      label: "Account",
      icon: <User2Icon className="text-copy" />,
      onClick: () => {
        console.log("Account");
      },
    },
    {
      label: "Links",
      icon: <LinkIcon className="text-copy" />,
      onClick: () => navigate("/dashboard", { replace: true }),
    },
  ];

  const { mutateAsync: logOut, isPending: isLoggingOut } = useLogOut();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/", { replace: true });
    } catch (error) {
      toast("Logout Failed", {
        className: "!gap-5",
        position: "top-center",
        icon: <AlertCircleIcon className="text-red-500" />,
        description: (
          <span className="font-medium text-copy-light">
            We ran into an issue while logging you out. Please retry in a moment
            or refresh the page.
          </span>
        ),
      });
      console.error(error?.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          className="sm:size-[60px] size-10 shrink-0 sm:rounded-3xl rounded-xl overflow-hidden"
        >
          <ProfileAvatar
            name={user?.user_metadata?.name}
            profile_pic_url={user?.user_metadata?.profile_pic}
            className="sm:size-[60px] size-10 shrink-0 sm:rounded-3xl rounded-2xl text-copy bg-blue-300"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex items-center gap-2.5 p-1">
          <ProfileAvatar
            name={user?.user_metadata?.name}
            profile_pic_url={user?.user_metadata?.profile_pic}
            className="rounded-2xl size-10 shrink-0 bg-blue-300"
          />
          <h4 className="text-copy text-base font-medium">
            {user?.user_metadata?.name}
          </h4>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profileDropdownMenuList?.map((item, index) => {
            if (pathname === "/dashboard" && item?.label === "Links") return;
            return (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer h-10"
                onClick={item?.onClick}
              >
                {item?.icon} {item?.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer h-10"
          onClick={handleLogOut}
        >
          {isLoggingOut ? (
            <LoaderIcon className="text-copy animate-spin" />
          ) : (
            <LogOutIcon className="text-copy" />
          )}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
