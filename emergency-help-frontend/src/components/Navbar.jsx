import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "user" or "admin"

  // theme apply
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          🚨 Emergency<span>Help</span>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/about">
            About
          </Link>

          {token && (
            <Link className="nav-link" to="/create-emergency">
              Create Emergency
            </Link>
          )}

          {/* Role Based Dashboard */}
          {token && role === "user" && (
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          )}

          {token && role === "admin" && (
            <Link className="nav-link" to="/admin/dashboard">
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side Buttons */}
        <div className="nav-right">
          {/* Theme */}
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Auth Buttons */}
          {!token ? (
            <div className="auth-btns">
              <Link className="btn btn-blue" to="/login">
                Login
              </Link>
              <Link className="btn btn-red" to="/register">
                Register
              </Link>
            </div>
          ) : (
            <button className="btn btn-red" onClick={logout}>
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link className="m-link" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link className="m-link" to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          {token && (
            <Link
              className="m-link"
              to="/create-emergency"
              onClick={() => setMenuOpen(false)}
            >
              Create Emergency
            </Link>
          )}

          {token && role === "user" && (
            <Link
              className="m-link"
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {token && role === "admin" && (
            <Link
              className="m-link"
              to="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          <button className="m-theme" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {!token ? (
            <div className="m-auth">
              <Link
                className="btn btn-blue"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="btn btn-red"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          ) : (
            <button className="btn btn-red" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
