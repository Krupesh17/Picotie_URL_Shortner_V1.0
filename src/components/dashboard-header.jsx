import React from "react";
import { useSelector } from "react-redux";
import { ProfileDropdown } from ".";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { MoonIcon, SunIcon } from "lucide-react";

const DashboardHeader = ({ setAccountSettingsDialogOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-5 left-0 right-0 sm:h-[100px] h-20 px-2.5 z-30">
      <nav className="h-full container mx-auto px-5 flex items-center justify-between rounded-3xl max-sm:rounded-2xl bg-ebony-clay-black">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/assets/icons/picotie_logo.svg"
            alt="Picotie Logo"
            className="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-2xl sm:rounded-3xl"
          />
          <h2 className="text-xl sm:text-3xl font-medium text-[#f2f2f2]">
            Picotie
          </h2>
        </Link>

        {user && (
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              className="sm:size-[60px] size-10 shrink-0 sm:rounded-3xl rounded-xl"
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

            <ProfileDropdown
              setAccountSettingsDialogOpen={setAccountSettingsDialogOpen}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default DashboardHeader;
