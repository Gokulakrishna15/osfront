const ReportManagement = () => {
  const reports = [
    { id: 1, exam: "JavaScript Basics", totalStudents: 50, avgScore: 72 },
    { id: 2, exam: "React Fundamentals", totalStudents: 40, avgScore: 81 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
      <table className="w-full border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Report ID</th>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Total Students</th>
            <th className="p-3 text-left">Average Score</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{r.id}</td>
              <td className="p-3">{r.exam}</td>
              <td className="p-3">{r.totalStudents}</td>
              <td className="p-3">{r.avgScore}%</td>
              <td className="p-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportManagement;
