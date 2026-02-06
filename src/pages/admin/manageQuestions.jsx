import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ManageQuestions = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exams] = useState([
    { id: 1, title: "JavaScript Basics" },
    { id: 2, title: "React Fundamentals" },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      examId: 1,
      text: "What is React?",
      options: ["Library", "Framework", "Language", "Database"],
      answer: "Library",
    },
    {
      id: 2,
      examId: 2,
      text: "Which keyword defines a constant in JS?",
      options: ["var", "let", "const", "define"],
      answer: "const",
    },
  ]);

  const exam = exams.find((e) => e.id === Number(examId));
  const filteredQuestions = questions.filter((q) => q.examId === Number(examId));

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin/exams")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        ← Back to Exams
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Manage Questions for:{" "}
        <span className="text-blue-600">{exam?.title || "Unknown Exam"}</span>
      </h2>

      {/* Show table of questions */}
      {filteredQuestions.length > 0 ? (
        <table className="w-full border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Options</th>
              <th className="p-3 text-left">Answer</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{q.id}</td>
                <td className="p-3">{q.text}</td>
                <td className="p-3">
                  {q.options.map((opt, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-200 px-2 py-1 rounded-md mr-1 text-sm"
                    >
                      {opt}
                    </span>
                  ))}
                </td>
                <td className="p-3 font-semibold text-green-700">{q.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No questions found for this exam.</p>
      )}
    </div>
  );
};

export default ManageQuestions;
