import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, MoonIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDropdown } from ".";
import { setAuthFormsDialogActive } from "@/redux/slices/ui_slice";
import { useTheme } from "./theme-provider";

const LandingHeader = ({ setAuthDialogState }) => {
  const { user } = useSelector((state) => state.auth);
  const { theme, setTheme } = useTheme();

  const dispatch = useDispatch();

  return (
    <header className="sticky top-5 left-0 right-0 sm:h-[100px] h-20 max-sm:h-[60px] px-2.5 z-30">
      <nav className="h-full container mx-auto max-sm:px-2.5 px-5 flex items-center justify-between rounded-3xl max-sm:rounded-2xl bg-ebony-clay-black">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/icons/picotie_logo.svg"
            alt="Picotie Logo"
            className="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-2xl sm:rounded-3xl"
          />
          <h2 className="text-xl sm:text-3xl font-medium text-[#f2f2f2] max-sm:hidden">
            Picotie
          </h2>
        </div>

        {user && <ProfileDropdown />}

        {!user && (
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="ghost"
              className="sm:h-[60px] h-10 sm:rounded-3xl rounded-xl px-5 text-[#f2f2f2] hover:bg-background/10 hover:text-[#f2f2f2] max-sm:hidden"
              onClick={() => {
                dispatch(
                  setAuthFormsDialogActive({
                    isAuthDialogActive: true,
                    navigateTo: "/dashboard",
                  })
                );
                setAuthDialogState("login");
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
                setAuthDialogState("register");
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
                setAuthDialogState("login");
              }}
            >
              <span>Get Started</span> <ArrowRight />
            </Button>

            <Button
              type="button"
              className="sm:size-[60px] size-10 shrink-0 sm:rounded-3xl rounded-xl bg-purply-blue hover:bg-purply-blue/80 text-[#f2f2f2]"
              onClick={() => {
                if (theme === "dark") {
                  setTheme("light");
                } else if (theme === "light") {
                  setTheme("dark");
                }
              }}
            >
              {theme === "dark" && <SunIcon className="size-6" />}
              {theme === "light" && <MoonIcon className="size-6" />}
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default LandingHeader;
