import React, { useEffect } from "react";
import { DashboardLinksSection, DashboardStatsCards } from "@/components";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Picotie";
  }, []);

  return (
    <div>
      <DashboardStatsCards />
      <DashboardLinksSection />
    </div>
  );
};

export default Dashboard;
