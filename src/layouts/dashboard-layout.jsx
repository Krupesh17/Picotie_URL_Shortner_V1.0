import React from "react";
import { DashboardHeader } from "@/components";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-dvh w-full bg-background">
      <DashboardHeader />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
