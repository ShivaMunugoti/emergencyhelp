import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../api/api";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";

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

      setSuccess("Authentication successful. Access granted.");

      setTimeout(() => {
        if (res.data.role === "admin") navigate("/choose-role");
        else navigate("/dashboard");
      }, 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Access Authorization"
      subtitle="High-Security Internal Channel. Unauthorized access is a violation of Federal Protocol."
    >
      {error && (
        <div className="auth-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="auth-success">
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="auth-body">
        <div className="auth-input-group">
          <Mail className="auth-icon" size={20} />
          <input
            className="auth-input tech-mono"
            type="email"
            name="email"
            placeholder="Official Email ID"
            value={form.email}
            onChange={handleChange}
            required
            style={{ paddingLeft: "48px", fontSize: "0.9rem" }}
          />
        </div>

        <div className="auth-input-group">
          <Lock className="auth-icon" size={20} />
          <input
            className="auth-input tech-mono"
            type="password"
            name="password"
            placeholder="Security Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ paddingLeft: "48px", fontSize: "0.9rem" }}
          />
        </div>

        <button className="btn btn-red tech-mono" disabled={loading} style={{ marginTop: "10px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 900 }}>
          {loading ? (
            "VERIFYING..."
          ) : (
            <>
              <LogIn size={20} />
              Authorize Access
            </>
          )}
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginTop: "4px" }}>
          <Link className="auth-link" to="/forgot-password" style={{ color: "var(--muted)" }}>
            Forgot Password?
          </Link>
        </div>

        <p className="auth-footer" style={{ marginTop: "20px", fontWeight: 700 }}>
          Awaiting assignment?{" "}
          <Link className="auth-link" to="/register">
            Register for Access
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
