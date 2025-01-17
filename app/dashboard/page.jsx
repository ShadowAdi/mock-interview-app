import AddnewInterview from "../../components/shared/AddnewInterview";
import React from "react";
import { DashboardListComponent } from "../../components/shared/DashboardListComponent";

const DashboardPage = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid my-5 grid-cols-1 md:grid-cols-3">
        <AddnewInterview />
      </div>

      <DashboardListComponent />
    </div>
  );
};

export default DashboardPage;
