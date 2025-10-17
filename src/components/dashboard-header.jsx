import React from "react";
import { useSelector } from "react-redux";
import { ProfileDropdown } from ".";
import { Link } from "react-router-dom";

const DashboardHeader = ({ setAccountSettingsDialogOpen }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-5 left-0 right-0 sm:h-[100px] h-20 px-2.5 z-30">
      <nav className="h-full container mx-auto px-5 flex items-center justify-between rounded-3xl max-sm:rounded-2xl bg-ebony-clay-black">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/assets/icons/picotie_logo.svg"
            alt="Picotie Logo"
            className="sm:w-[60px] sm:h-[60px] w-10 h-10 rounded-2xl sm:rounded-3xl"
          />
          <h2 className="text-xl sm:text-3xl font-medium text-copy-negative">
            Picotie
          </h2>
        </Link>

        {user && (
          <ProfileDropdown
            setAccountSettingsDialogOpen={setAccountSettingsDialogOpen}
          />
        )}
      </nav>
    </header>
  );
};

export default DashboardHeader;
