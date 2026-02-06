import { useEffect, useState } from "react";
import axios from "axios";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    date: "",
    duration: "",
    totalMarks: "",
    instructions: "",
    timeLimitPerQuestion: "", 
  });
  const [loading, setLoading] = useState(true);
  const [editingExam, setEditingExam] = useState(null);

  
  // Fetch exams
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/exams", {
        withCredentials: true,
      });
      setExams(res.data);
    } catch (err) {
      console.error("Failed to fetch exams", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new or updated exam
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload with correct types
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        subject: formData.subject.trim(),
        date: new Date(formData.date).toISOString(),
        duration: Number(formData.duration),
        totalMarks: Number(formData.totalMarks),
        instructions: formData.instructions.trim(),
      };

      if (editingExam) {
        await axios.put(
          `http://localhost:3000/api/exams/update/${editingExam._id}`,
          payload,
          { withCredentials: true }
        );
        alert("Exam updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/exams", payload, {
          withCredentials: true,
        });
        alert("Exam created successfully!");
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        date: "",
        duration: "",
        totalMarks: "",
        instructions: "",
      });
      setEditingExam(null);
      fetchExams();
    } catch (err) {
      console.error("Failed to save exam", err.response?.data || err);
      alert("Error saving exam. Check console for details.");
    }
  };

  // Edit exam
  const handleEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      title: exam.title,
      description: exam.description,
      subject: exam.subject,
      date: new Date(exam.date).toISOString().slice(0, 16), // datetime-local
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      instructions: exam.instructions,
    });
  };

  // Delete exam
  const handleDelete = async (examId) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/exams/delete/${examId}`, {
        withCredentials: true,
      });
      alert("Exam deleted successfully!");
      fetchExams();
    } catch (err) {
      console.error("Failed to delete exam", err.response?.data || err);
      alert("Error deleting exam");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Exams</h1>

      {/* Exam Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editingExam ? "Edit Exam" : "Create New Exam"}
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Exam Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="totalMarks"
          value={formData.totalMarks}
          onChange={handleChange}
          placeholder="Total Marks"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingExam ? "Update Exam" : "Create Exam"}
          </button>
          {editingExam && (
            <button
              type="button"
              onClick={() => {
                setEditingExam(null);
                setFormData({
                  title: "",
                  description: "",
                  subject: "",
                  date: "",
                  duration: "",
                  totalMarks: "",
                  instructions: "",
                });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Exam List */}
      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500">No exams available</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              <p className="text-sm text-gray-600">{exam.description}</p>
              <p className="text-sm">📚 {exam.subject}</p>
              <p className="text-sm">
                🗓 {new Date(exam.date).toLocaleString()}
              </p>
              <p className="text-sm">⏱ {exam.duration} minutes</p>
              <p className="text-sm">📝 {exam.totalMarks} marks</p>
              <p className="text-sm text-gray-700">{exam.instructions}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEdit(exam)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exam._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageExams;
