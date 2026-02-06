import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamDetails = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/exams/${examId}`, {
          withCredentials: true,
        });
        setExam(res.data);
      } catch (err) {
        console.error("Error fetching exam details:", err);
        setError("Failed to load exam details.");
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  const handleEnroll = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/exams/enroll",
        { examId },
        { withCredentials: true }
      );
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Enrollment failed", err);
      alert("Enrollment failed. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading exam details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!exam) return <p className="p-6 text-gray-500">Exam not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl border space-y-4">
      <h2 className="text-2xl font-bold">{exam.title}</h2>
      <p className="text-gray-700">📅 Date: {new Date(exam.date).toLocaleString()}</p>
      <p className="text-gray-700">⏱ Duration: {exam.duration} minutes</p>
      <p className="text-gray-700">📝 Description: {exam.description}</p>
      <p className="text-gray-700">📚 Subject: {exam.subject}</p>
      <p className="text-gray-700">📝 Total Marks: {exam.totalMarks}</p>
      <p className="text-gray-700">⚠ Instructions: {exam.instructions}</p>
      {exam.createdBy && (
        <p className="text-gray-500 text-sm">
          Created by: {exam.createdBy.firstName} {exam.createdBy.lastName} ({exam.createdBy.email})
        </p>
      )}

      {/* List of questions */}
      {exam.questions && exam.questions.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Questions:</h3>
          <ul className="list-decimal list-inside space-y-1">
            {exam.questions.map((q) => (
              <li key={q._id}>
                {q.text} ({q.marks} marks)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleEnroll}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-4"
      >
        Enroll Now
      </button>
    </div>
  );
};

export default ExamDetails;
