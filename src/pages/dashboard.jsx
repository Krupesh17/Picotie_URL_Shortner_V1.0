import React from "react";
import { DashboardStatsCards } from "@/components";
import { PlusIcon } from "lucide-react";
import { UrlShortenerInputForm } from "@/components/forms";

const Dashboard = () => {
  return (
    <div>
      {/* Instead of showing cards when user accessing dashboard from mobile device we can use badge. */}
      <DashboardStatsCards />

      <section className="container p-2.5 sm:p-5 mx-auto mt-10 max-sm:mt-5">
        <div className="flex flex-col sm:gap-10 gap-5">
          <div className="flex items-center sm:gap-5 gap-2.5">
            <div className="sm:size-[60px] size-10 sm:rounded-3xl rounded-2xl shrink-0 bg-linear-to-b from-blueviolet to-mediumblue flex items-center justify-center">
              <PlusIcon className="text-white sm:size-10 size-6" />
            </div>
            <div className="flex flex-col">
              <h4 className="sm:text-3xl text-lg text-copy font-medium">
                Create New Short Link
              </h4>
              <p className="sm:text-sm text-xs text-copy-light">
                Enter a long URL to create a shortened version with QR code and
                analytics tracking.
              </p>
            </div>
          </div>

          <UrlShortenerInputForm />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
