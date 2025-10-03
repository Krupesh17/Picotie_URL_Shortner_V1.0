import React from "react";
import { DashboardLinksSection, DashboardStatsCards } from "@/components";

/**
 * First of all add all changes to GitHub Repository with proper comment.
 * Create and work on 'account.jsx' page, in this page use can updated their account related information.
 * Then work on 'Dark Mode'.
 */

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
