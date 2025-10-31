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
import { LogInForm, RegisterForm, ResetPasswordForm } from "./forms";
import { RotateCcwKeyIcon, UserRoundIcon, UserRoundPlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const LoginRegisterDialog = ({ authDialogState, setAuthDialogState }) => {
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
    setAuthDialogState("login");
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
              {authDialogState === "register" && (
                <UserRoundPlusIcon className="ml-0.5" />
              )}
              {authDialogState === "login" && <UserRoundIcon />}
              {authDialogState === "reset-password" && <RotateCcwKeyIcon />}
            </div>
            <DialogTitle className="text-center text-2xl text-copy">
              {authDialogState === "register" && "Let's Get Started"}
              {authDialogState === "login" && "Welcome Back"}
              {authDialogState === "reset-password" && "Reset Your Password"}
            </DialogTitle>
            <DialogDescription className="text-center text-base text-copy-light">
              {authDialogState === "register" &&
                "Join us, register and discover Picotie"}
              {authDialogState === "login" && "Login to your Picotie account"}
              {authDialogState === "reset-password" &&
                "Enter your email to receive password reset instructions"}
            </DialogDescription>
          </DialogHeader>
          {authDialogState === "register" && (
            <RegisterForm setAuthDialogState={setAuthDialogState} />
          )}
          {authDialogState === "login" && (
            <LogInForm setAuthDialogState={setAuthDialogState} />
          )}
          {authDialogState === "reset-password" && (
            <ResetPasswordForm setAuthDialogState={setAuthDialogState} />
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
            {authDialogState === "register" && (
              <UserRoundPlusIcon className="ml-0.5" />
            )}
            {authDialogState === "login" && <UserRoundIcon />}
          </div>
          <DrawerTitle className="text-center text-2xl text-copy">
            {authDialogState === "register" && "Let's Get Started"}
            {authDialogState === "login" && "Welcome Back"}
          </DrawerTitle>
          <DrawerDescription className="text-center text-base text-copy-light">
            {authDialogState === "register" &&
              "Join us, register and discover Picotie"}
            {authDialogState === "login" && "Login to your Picotie account"}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-4">
          {authDialogState === "register" && (
            <RegisterForm setAuthDialogState={setAuthDialogState} />
          )}
          {authDialogState === "login" && (
            <LogInForm setAuthDialogState={setAuthDialogState} />
          )}
          {authDialogState === "reset-password" && (
            <ResetPasswordForm setAuthDialogState={setAuthDialogState} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginRegisterDialog;
