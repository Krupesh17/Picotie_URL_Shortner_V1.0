import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { LoaderIcon, PencilIcon, Trash2Icon, UploadIcon } from "lucide-react";
import { useSelector } from "react-redux";

const ProfilePicturePopoverMenu = ({
  fileInputRef,
  removeCurrentPicture,
  isLoading,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleUploadPicture = () => {
    if (!isLoading) {
      fileInputRef?.current?.click();
      setOpen(false);
    }
  };

  const handleRemoveCurrentPicture = () => {
    if (!isLoading) {
      removeCurrentPicture();
      setOpen(false);
    }
  };

  return (
    <>
      {!user?.user_metadata?.profile_pic ? (
        <Button
          type="button"
          size="icon"
          className="size-10 rounded-full absolute right-0 bottom-0"
          onClick={handleUploadPicture}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderIcon className="size-5 animate-spin" />
          ) : (
            <PencilIcon className="size-5" />
          )}
        </Button>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="size-10 rounded-full absolute right-0 bottom-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderIcon className="size-5 animate-spin" />
              ) : (
                <PencilIcon className="size-5" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-54 p-0 overflow-hidden">
            <ul className="w-full flex flex-col">
              <li
                className={`h-10 text-sm flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-accent ${
                  isLoading && "text-current/40"
                }`}
                onClick={handleUploadPicture}
              >
                <UploadIcon className="size-5" />
                <span>Upload Picture</span>
              </li>
              <li
                className={`h-10 text-sm flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-accent ${
                  isLoading && "text-current/40"
                }`}
                onClick={handleRemoveCurrentPicture}
              >
                <Trash2Icon className="size-5" />
                <span>Remove Current Picture</span>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default ProfilePicturePopoverMenu;
