import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { PlusIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { CreateShortUrlForm } from "./forms";

const CreateNewShortenedUrlDialog = ({
  isDialogOpen,
  setDialogOpen,
  setSearchParams,
  longLink,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOnDialogDrawerOpen = () => {
    setDialogOpen(false);
    setSearchParams({});
  };

  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
        <DialogContent
          className="!max-w-[450px] rounded-3xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <div className="flex items-center justify-center size-10 mx-auto text-white bg-linear-to-b from-blueviolet to-mediumblue rounded-2xl">
              <PlusIcon />
            </div>
            <DialogTitle className="text-center text-2xl text-copy">
              Create New Short URL
            </DialogTitle>
            <DialogDescription className="text-center text-base text-copy-light">
              Paste your original URL to create a short link. Customize the
              ending to make it your own.
            </DialogDescription>
          </DialogHeader>
          <CreateShortUrlForm longLink={longLink} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
      <DrawerContent className="!rounded-t-3xl" aria-describedby={undefined}>
        <DrawerHeader>
          <div className="flex items-center justify-center size-10 mx-auto text-white bg-linear-to-b from-blueviolet to-mediumblue rounded-2xl">
            <PlusIcon />
          </div>
          <DrawerTitle className="text-center text-2xl text-copy">
            Create New Short URL
          </DrawerTitle>
          <DrawerDescription className="text-center text-base text-copy-light">
            Paste your original URL to create a short link. Customize the ending
            to make it your own.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4">
          <CreateShortUrlForm longLink={longLink} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateNewShortenedUrlDialog;
