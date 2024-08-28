import { Outlet } from "react-router-dom";
import DashboardSidebar from "../../components/layout/DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="lg:flex">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
