import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      // Save user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        if (res.data.role === "admin") navigate("/choose-role");
        else navigate("/dashboard");
      }, 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to access your emergency dashboard."
    >
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}

      <form onSubmit={handleLogin} className="auth-body">
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-red" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link className="auth-link" to="/forgot-password">
          Forgot Password?
        </Link>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link className="auth-link" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
