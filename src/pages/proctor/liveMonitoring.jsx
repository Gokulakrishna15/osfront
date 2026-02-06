import React, { useEffect, useState } from "react";
import { Activity, Users, Eye, AlertTriangle } from "lucide-react";

const LiveMonitoring = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/monitoring/students"); // 🔥 update URL to your backend
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading data...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Eye className="w-7 h-7 text-blue-600" />
          Live Monitoring
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3">
            <Users className="text-blue-600 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-lg font-bold">{students.length}</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3">
            <Activity className="text-green-600 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Active Students</p>
              <p className="text-lg font-bold">
                {students.filter((s) => s.status === "Active").length}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3">
            <Eye className="text-red-600 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Disconnected</p>
              <p className="text-lg font-bold">
                {students.filter((s) => s.status === "Disconnected").length}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="text-yellow-600 w-6 h-6" />
            <div>
              <p className="text-gray-500 text-sm">Flagged Incidents</p>
              <p className="text-lg font-bold">
                {students.reduce(
                  (acc, s) => acc + (s.flaggedIncidents?.length || 0),
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Student Monitoring Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Current Activity</th>
                <th className="py-3 px-4">Flagged Incidents</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{student.id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      student.status === "Active"
                        ? "text-green-600"
                        : student.status === "Inactive"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {student.status}
                  </td>
                  <td className="py-3 px-4">{student.activity}</td>
                  <td className="py-3 px-4">
                    {student.flaggedIncidents?.length > 0 ? (
                      <ul className="list-disc pl-5 text-red-600">
                        {student.flaggedIncidents.map((incident, i) => (
                          <li key={i}>{incident}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Monitoring in real-time... (via API polling / WebSocket)
        </p>
      </div>
    </div>
  );
};

export default LiveMonitoring;
