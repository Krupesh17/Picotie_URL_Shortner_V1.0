import React from "react";
import { DashboardLinksSection, DashboardStatsCards } from "@/components";

const Dashboard = () => {
  return (
    <div>
      {/* Instead of showing cards when user accessing dashboard from mobile device we can use badge. */}
      <DashboardStatsCards />
      <DashboardLinksSection />
    </div>
  );
};

export default Dashboard;
