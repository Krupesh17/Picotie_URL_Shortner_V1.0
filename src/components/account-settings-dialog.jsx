import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { User2Icon } from "lucide-react";
import { AccountSettingsForm } from "./forms";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

const AccountSettingsDialog = ({ isDialogOpen, setDialogOpen }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOnDialogDrawerOpen = () => {
    setDialogOpen(false);
  };
  if (isDesktop) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
        <DialogContent
          className="!max-w-[450px] rounded-3xl overflow-y-auto"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <div className="flex items-center justify-center size-10 mx-auto text-white bg-gradient-to-r from-primary to-purply-blue rounded-2xl">
              <User2Icon />
            </div>
            <DialogTitle className="text-center text-2xl text-copy">
              Account
            </DialogTitle>
            <DialogDescription className="text-center text-base text-copy-light">
              Securely manage your personal info, login details, and account
              settings in one place.
            </DialogDescription>
          </DialogHeader>
          <AccountSettingsForm
            handleOnDialogDrawerOpen={handleOnDialogDrawerOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDialogOpen} onOpenChange={handleOnDialogDrawerOpen}>
      <DrawerContent className="!rounded-t-3xl" aria-describedby={undefined}>
        <DrawerHeader>
          <div className="flex items-center justify-center size-10 mx-auto text-white bg-gradient-to-r from-primary to-purply-blue rounded-2xl">
            <User2Icon />
          </div>
          <DrawerTitle className="text-center text-2xl text-copy">
            Account
          </DrawerTitle>
          <DrawerDescription className="text-center text-base text-copy-light">
            Securely manage your personal info, login details, and account
            settings in one place.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4">
          <AccountSettingsForm
            handleOnDialogDrawerOpen={handleOnDialogDrawerOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountSettingsDialog;
