const FlaggedIncidents = () => {
  const incidents = [
    { id: 1, exam: "JavaScript Basics", student: "Alice Johnson", reason: "Multiple face detection" },
    { id: 2, exam: "React Fundamentals", student: "Bob Smith", reason: "Unusual screen activity" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Flagged Incidents</h2>
      <table className="w-full border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Incident ID</th>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Reason</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((i) => (
            <tr key={i.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{i.id}</td>
              <td className="p-3">{i.exam}</td>
              <td className="p-3">{i.student}</td>
              <td className="p-3 text-red-600">{i.reason}</td>
              <td className="p-3">
                <button className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlaggedIncidents;
