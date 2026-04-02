import { Link } from "react-router-dom";

function Home() {
  const topics = [
    { name: "HTML", path: "html", color: "primary" },
    { name: "CSS", path: "css", color: "success" },
    { name: "JavaScript", path: "javascript", color: "warning" },
    { name: "React", path: "react", color: "info" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select a Quiz Topic</h2>
      <div className="row">
        {topics.map((topic) => (
          <div key={topic.path} className="col-md-6 mb-4">
            <Link to={`/quiz/${topic.path}`} className={`card p-4 text-center text-white bg-${topic.color}`}>
              <h4 className="card-title">{topic.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


