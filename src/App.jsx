import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import ProtectedRoute from "./components/protectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageExams from "./pages/admin/manageExams";
import ManageQuestions from "./pages/admin/manageQuestions";
import ManageUsers from "./pages/admin/manageUsers";
import ProctoringDashboard from "./pages/admin/proctoringDashboard";
import FlaggedIncidents from "./pages/admin/flaggedIncidents";
import ReportManagement from "./pages/admin/reports";

//student page
import StudentDashboard from "./pages/student/studentDashboard";
import AvailableExams from "./pages/student/availableExams";
import ExamDetails from "./pages/student/examDetails";
import TakeExam from "./pages/student/takeExam";
import Results from "./pages/student/results";
import Profile from "./pages/student/profile";
import CreateQuestion from "./pages/admin/createQuestions";
import LiveMonitoring from "./pages/proctor/liveMonitoring";

// Lazy-loaded
const Login = lazy(() => import("./pages/loginPage"));
const Dashboard = lazy(() => import("./pages/dasboardPage"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Login...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "exams",
        element: <ManageExams />,
      },
      {
        path: "exams/:examId/questions",
        element: <ManageQuestions />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/createQuestions",
        element: <CreateQuestion />,
      },
      {
        path: "proctoring",
        element: <ProctoringDashboard />,
      },
      {
        path: "incidents",
        element: <FlaggedIncidents />,
      },
      {
        path: "reports",
        element: <ReportManagement />,
      },
    ],
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "exams", element: <AvailableExams /> },
      { path: "exams/:examId", element: <ExamDetails /> },
      { path: "exams/:examId/take", element: <TakeExam /> },
      { path: "results", element: <Results /> },
      // placeholder for profile page
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/proctoring",
    element: (
      <ProtectedRoute>
        <ProctoringDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/proctoring/monitoring",
    element: <LiveMonitoring />,
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<div>Loading forget password...</div>}>
        <ForgetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
