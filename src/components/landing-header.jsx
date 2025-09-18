import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDropdown } from ".";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";

const LandingHeader = ({ setRegisterFormActive }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-5 left-0 right-0 sm:h-[100px] h-20 px-2.5 z-30">
      <nav className="h-full container mx-auto px-5 flex items-center justify-between rounded-3xl max-sm:rounded-2xl bg-ebony-clay-black">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/icons/picotie_logo.svg"
            alt="Picotie Logo"
            className="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-2xl sm:rounded-3xl"
          />
          <h2 className="text-xl sm:text-3xl font-medium text-copy-negative">
            Picotie
          </h2>
        </div>

        {user && <ProfileDropdown />}

        {!user && (
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5 text-copy-negative hover:bg-background/10 hover:text-copy-negative max-sm:hidden"
              onClick={() => {
                dispatch(
                  setAuthFormsDialogActive({
                    isAuthDialogActive: true,
                    navigateTo: "/dashboard",
                  })
                );
              }}
            >
              Log In
            </Button>
            <Button
              type="button"
              className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5 max-sm:hidden"
              onClick={() => {
                dispatch(
                  setAuthFormsDialogActive({
                    isAuthDialogActive: true,
                    navigateTo: "/dashboard",
                  })
                );
                setRegisterFormActive(true);
              }}
            >
              Register Now
            </Button>
            <Button
              type="button"
              className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5 sm:hidden"
              onClick={() => {
                dispatch(
                  setAuthFormsDialogActive({
                    isAuthDialogActive: true,
                    navigateTo: "/dashboard",
                  })
                );
              }}
            >
              <span>Get Started</span> <ArrowRight />
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default LandingHeader;
