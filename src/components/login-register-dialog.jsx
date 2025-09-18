import React from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { LogInForm, RegisterForm } from "./forms";
import { UserRoundIcon, UserRoundPlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const LoginRegisterDialog = ({
  isRegisterFormActive,
  setRegisterFormActive,
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isAuthFormsDialogActive } = useSelector((state) => state?.ui);
  const dispatch = useDispatch();

  const handleOnDialogDrawerOpen = () => {
    dispatch(
      setAuthFormsDialogActive({
        isAuthDialogActive: false,
        navigateTo: "/dashboard",
      })
    );
    setRegisterFormActive(false);
  };

  
  if (isDesktop) {
    return (
      <Dialog
        open={isAuthFormsDialogActive}
        onOpenChange={handleOnDialogDrawerOpen}
      >
        <DialogContent
          className="!max-w-[450px] rounded-3xl"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <div className="flex items-center justify-center size-10 mx-auto text-white bg-gradient-to-r from-primary to-purply-blue rounded-2xl">
              {isRegisterFormActive ? (
                <UserRoundPlusIcon className="ml-0.5" />
              ) : (
                <UserRoundIcon />
              )}
            </div>
            <DialogTitle className="text-center text-2xl text-copy">
              {isRegisterFormActive ? "Let's Get Started" : "Welcome Back"}
            </DialogTitle>
            <DialogDescription className="text-center text-base text-copy-light">
              {isRegisterFormActive
                ? "Join us, register and discover Picotie"
                : "Login to your Picotie account"}
            </DialogDescription>
          </DialogHeader>
          {isRegisterFormActive ? (
            <RegisterForm setRegisterFormActive={setRegisterFormActive} />
          ) : (
            <LogInForm setRegisterFormActive={setRegisterFormActive} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isAuthFormsDialogActive}
      onOpenChange={handleOnDialogDrawerOpen}
    >
      <DrawerContent className="!rounded-t-3xl" aria-describedby={undefined}>
        <DrawerHeader>
          <div className="flex items-center justify-center size-10 mx-auto text-white bg-gradient-to-r from-primary to-purply-blue rounded-2xl">
            {isRegisterFormActive ? (
              <UserRoundPlusIcon className="ml-0.5" />
            ) : (
              <UserRoundIcon />
            )}
          </div>
          <DrawerTitle className="text-center text-2xl text-copy">
            {isRegisterFormActive ? "Let's Get Started" : "Welcome Back"}
          </DrawerTitle>
          <DrawerDescription className="text-center text-base text-copy-light">
            {isRegisterFormActive
              ? "Join us, register and discover Picotie"
              : "Login to your Picotie account"}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4">
          {isRegisterFormActive ? (
            <RegisterForm setRegisterFormActive={setRegisterFormActive} />
          ) : (
            <LogInForm setRegisterFormActive={setRegisterFormActive} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginRegisterDialog;
