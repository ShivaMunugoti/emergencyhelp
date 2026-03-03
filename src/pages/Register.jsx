import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await registerUser(form);

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Personnel Onboarding"
      subtitle="Request Field Operative clearance for the Bharat Digital Emergency Network."
    >
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}

      <form onSubmit={handleRegister} className="auth-body">
        <input
          className="auth-input tech-mono"
          name="name"
          type="text"
          placeholder="Full Legal Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ fontSize: "0.9rem" }}
        />

        <input
          className="auth-input tech-mono"
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          style={{ fontSize: "0.9rem" }}
        />

        <input
          className="auth-input tech-mono"
          name="password"
          type="password"
          placeholder="Security Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ fontSize: "0.9rem" }}
        />

        <button className="btn btn-red tech-mono" disabled={loading} style={{ fontWeight: 900 }}>
          {loading ? "INITIALIZING..." : "Register Operative"}
        </button>

        <p className="auth-footer" style={{ fontWeight: 700 }}>
          Already have clearance?{" "}
          <Link className="auth-link" to="/login">
            Login to System
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
