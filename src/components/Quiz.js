import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import htmlQuestions from "../htmlQuestions";
import cssQuestions from "../cssQuestions";
import jsQuestions from "../jsQuestions";
import reactQuestions from "../reactQuestions";

function Quiz({ soundOn }) {
  const { topic } = useParams();
  const navigate = useNavigate();

  // Question mapping
  const questionsMap = { html: htmlQuestions, css: cssQuestions, javascript: jsQuestions, react: reactQuestions };
  const questions = questionsMap[topic];

  // Hooks (must always be called in same order)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  // Initialize Audio objects once
  useEffect(() => {
    correctSound.current = new Audio("/sounds/correct5.mp3");
    wrongSound.current = new Audio("/sounds/wrong.mp3");
  }, []);

  // Play sound safely
  const playSound = (type) => {
    if (!soundOn) return;

    if (correctSound.current) { correctSound.current.pause(); correctSound.current.currentTime = 0; }
    if (wrongSound.current) { wrongSound.current.pause(); wrongSound.current.currentTime = 0; }

    const sound = type === "correct5.mp3" ? correctSound.current : wrongSound.current;
    if (sound) sound.play().catch(() => {});
  };

  if (!questions) return <h2 className="text-center mt-5">Invalid Quiz Topic</h2>;

  const currentQuestion = questions[currentIndex];

  // Answer handling
  const handleAnswer = (idx) => {
    if (answers[currentIndex] !== undefined) return; // already answered

    const isCorrect = idx === currentQuestion.correctAnswer;

    setAnswers({ ...answers, [currentIndex]: idx });
    setSelectedOption(idx);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      playSound("correct5.mp3");
    } else {
      playSound("wrong.mp3");
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[currentIndex - 1] ?? null);
    }
  };

  const handleSkip = () => {
    setAnswers({ ...answers, [currentIndex]: null });
    setSelectedOption(null);
    handleNext();
  };

  const handleSubmit = () => {
  const results = questions.map((q, index) => ({
    questionNo: index + 1,
    question: q.question,
    correctAnswer: q.options[q.correctAnswer],
    selectedAnswer:
      answers[index] !== null && answers[index] !== undefined
        ? q.options[answers[index]]
        : "Not Answered",
    isCorrect: answers[index] === q.correctAnswer
  }));

  navigate("/result", {
    state: {
      score,
      total: questions.length,
      results
    }
  });
};


  const getOptionClass = (idx) => {
    if (selectedOption === null) return "option";

    if (idx === currentQuestion.correctAnswer) return "option correct";
    if (idx === selectedOption && selectedOption !== currentQuestion.correctAnswer) return "option wrong";
    return "option";
  };

  return (
    <div className="container mt-5 quiz-card">
      <h4>Question {currentIndex + 1} of {questions.length}</h4>
      <h5 className="my-4">{currentQuestion.question}</h5>

      {currentQuestion.options.map((opt, idx) => (
        <button key={idx} className={getOptionClass(idx)} onClick={() => handleAnswer(idx)}>
          {opt}
        </button>
      ))}

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
        <button className="btn btn-warning" onClick={handleSkip}>Skip</button>
        {currentIndex === questions.length - 1 ? (
          <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
}

export default Quiz;


