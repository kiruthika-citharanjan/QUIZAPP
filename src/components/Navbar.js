// src/components/Navbar.js
function Navbar({ darkMode, setDarkMode, soundOn, setSoundOn }) {
  return (
    <nav className={`navbar px-3 ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <span className="navbar-brand fw-bold">Quiz App</span>

      <div className="d-flex">
        {/* Dark/Light Toggle */}
        <button
          className={`btn btn-sm me-2 ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Sound Toggle */}
        <button
          className={`btn btn-sm ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? "🔊 Sound ON" : "🔇 Sound OFF"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

