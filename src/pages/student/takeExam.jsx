import { useState } from "react";

const TakeExam = () => {
  const questions = [
    { id: 1, question: "What is React?", options: ["Library", "Framework", "Language", "Tool"], correct: 0 },
    { id: 2, question: "What does JSX stand for?", options: ["Java Syntax Extension", "JavaScript XML", "JSON Syntax Extension", "None"], correct: 1 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qid, optionIndex) => {
    setAnswers({ ...answers, [qid]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const currentQuestion = questions[currentIndex];

  if (submitted) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Exam Submitted ✅</h2>
        <p>Your answers have been recorded.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4">{currentQuestion.question}</p>
      <div className="space-y-2">
        {currentQuestion.options.map((opt, i) => (
          <label
            key={i}
            className={`block p-2 border rounded cursor-pointer ${
              answers[currentQuestion.id] === i ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name={`q-${currentQuestion.id}`}
              checked={answers[currentQuestion.id] === i}
              onChange={() => handleAnswer(currentQuestion.id, i)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeExam;
