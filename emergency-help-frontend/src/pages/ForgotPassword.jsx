import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      setLoading(true);
      const res = await API.post("/auth/forgot-password", { email });

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/reset-password-otp", { state: { email } });
      }, 800);
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password 🔑"
      subtitle="Enter your email to receive OTP"
    >
      {err && <div className="auth-error">{err}</div>}
      {msg && <div className="auth-success">{msg}</div>}

      <form className="auth-body" onSubmit={handleSendOtp}>
        <input
          className="auth-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="btn btn-blue" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </AuthLayout>
  );
}
