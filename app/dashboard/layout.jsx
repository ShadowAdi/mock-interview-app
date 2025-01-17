import { Header } from "../../components/shared/Header";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </main>
  );
};

export default DashboardLayout;
