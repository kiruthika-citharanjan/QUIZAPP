import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    total = 0,
    results = []
  } = location.state || {};

  return (
    <div className="container mt-5 result-container">
      <h2>Quiz Completed 🎉</h2>

      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>

      <hr />

      <h4>Detailed Result</h4>

      {results.map((item) => (
        <div
          key={item.questionNo}
          className={`card mb-3 ${
            item.isCorrect ? "border-success" : "border-danger"
          }`}
        >
          <div className="card-body">
            <h6 className="card-title">
              Q{item.questionNo}. {item.question}
            </h6>

            <p className="mb-1">
              <strong>Your Answer:</strong>{" "}
              <span
                className={item.isCorrect ? "text-success" : "text-danger"}
              >
                {item.selectedAnswer || "Not Answered"}
              </span>
            </p>

            {!item.isCorrect && (
              <p className="mb-1">
                <strong>Correct Answer:</strong>{" "}
                <span className="text-success">
                  {item.correctAnswer}
                </span>
              </p>
            )}

            <p className="fw-bold">
              {item.isCorrect ? "Correct ✅" : "Wrong ❌"}
            </p>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary me-2" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="btn btn-success" onClick={() => navigate(-1)}>
          Retake
        </button>
      </div>
    </div>
  );
}

export default Result;



