import React, { useState } from "react";
import axios from "axios";

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: 1, // default value
    type: "MCQ",
    topic: "",
    category: "", // instead of examType
    difficulty: "EASY",
    createdBy: "66e8b62e4f1234567890abcd", // TODO: replace with logged-in user ID
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/questions", formData);
      alert("Question added successfully!");
      setFormData({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: 1,
        type: "MCQ",
        topic: "",
        category: "",
        difficulty: "EASY",
        createdBy: "66e8b62e4f1234567890abcd",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding question");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create a New Question
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question Text */}
          <input
            name="questionText"
            value={formData.questionText}
            placeholder="Enter question"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Options (only if MCQ) */}
          {formData.type === "MCQ" && (
            <div className="grid grid-cols-2 gap-3">
              {formData.options.map((opt, idx) => (
                <input
                  key={idx}
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="border rounded-lg p-2"
                />
              ))}
            </div>
          )}

          {/* Correct Answer */}
          <input
            name="correctAnswer"
            value={formData.correctAnswer}
            placeholder="Correct Answer"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Marks */}
          <input
            type="number"
            name="marks"
            value={formData.marks}
            placeholder="Marks"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Type */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="MCQ">MCQ</option>
            <option value="TRUE_FALSE">True/False</option>
          </select>

          {/* Topic */}
          <input
            name="topic"
            value={formData.topic}
            placeholder="Topic"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Category */}
          <input
            name="category"
            value={formData.category}
            placeholder="Category (e.g. Final, Midterm)"
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2"
          />

          {/* Difficulty */}
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
