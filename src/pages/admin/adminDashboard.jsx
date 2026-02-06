import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../logoutPage";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/exams"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Manage Exams
          </Link>
          <Link
            to="/admin/users"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/proctoring"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Proctoring Management
          </Link>
          <Link
            to="/admin/createQuestions"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Create Questions
          </Link>
          <Link
            to="/admin/reports"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Reports & Analytics
          </Link>
        </nav>

        <div className="flex flex-end justify-between items-center m-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* This renders nested routes */}
      </main>
    </div>
  );
};

export default AdminDashboard;
