import { useNavigate, Outlet } from "react-router-dom";


const ProctoringDashboard = () => {
  const navigate = useNavigate();
  const activeSessions = [
    { id: 1, exam: "JavaScript Basics", proctor: "John Doe", status: "Live" },
    {
      id: 2,
      exam: "React Fundamentals",
      proctor: "Sarah Lee",
      status: "Scheduled",
    },
  ];

  const handleMonitorClick = () => {
    alert("Monitoring session started!");
    navigate("/proctoring/monitoring");
    return null;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Proctoring Dashboard</h2>
      <table className="w-full border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Session ID</th>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Proctor</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeSessions.map((s) => (
            <tr key={s.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{s.id}</td>
              <td className="p-3">{s.exam}</td>
              <td className="p-3">{s.proctor}</td>
              <td className="p-3 font-semibold">{s.status}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={handleMonitorClick}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Monitor
                </button>
                <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                  End
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* <Outlet />  */}
    </div>
  );
};

export default ProctoringDashboard;
