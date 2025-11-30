import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { PlusIcon } from "lucide-react";
import { CreateShortUrlForm } from "./forms";

const CreateNewShortenedUrlDialog = ({
  isDialogOpen,
  setDialogOpen,
  setSearchParams,
  longLink,
}) => {
  const handleOnDialogDrawerOpen = () => {
    setDialogOpen(false);
    setSearchParams({});
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
      <DialogContent
        className="!max-w-[450px] rounded-3xl overflow-y-auto"
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
            Paste your original URL to create a short link. Customize the ending
            to make it your own.
          </DialogDescription>
        </DialogHeader>

        <CreateShortUrlForm
          longLink={longLink}
          closeDialog={handleOnDialogDrawerOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewShortenedUrlDialog;
