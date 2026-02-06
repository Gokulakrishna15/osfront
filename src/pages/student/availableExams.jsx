import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AvailableExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("https://osback.onrender.com/api/exams", { withCredentials: true });
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams:", err);
      }
    };
    fetchExams();
  }, []);

  const handleEnroll = async (examId) => {
    try {
      await axios.post(
        "https://osback.onrender.com/api/exams/enroll",
        { examId },
        { withCredentials: true }
      );
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Enrollment failed", err);
      alert("Failed to enroll.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Exams</h2>
      <div className="grid gap-4">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam._id} className="bg-white shadow-md rounded-xl p-4 border">
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              <p className="text-gray-600">Date: {new Date(exam.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Duration: {exam.duration} mins</p>
              <p className="text-gray-600">{exam.description}</p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEnroll(exam._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Enroll
                </button>
                <Link
                  to={`/student/exams/${exam._id}`}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No exams available</p>
        )}
      </div>
    </div>
  );
};

export default AvailableExams;