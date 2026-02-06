const Results = () => {
  const results = [
    { id: 1, exam: "JavaScript Basics", score: 85, feedback: "Good job! Review closures." },
    { id: 2, exam: "React Fundamentals", score: 72, feedback: "Focus on lifecycle methods." },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Results</h2>
      <table className="w-full border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Exam</th>
            <th className="p-3 text-left">Score</th>
            <th className="p-3 text-left">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{r.exam}</td>
              <td className="p-3 font-semibold">{r.score}%</td>
              <td className="p-3">{r.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
