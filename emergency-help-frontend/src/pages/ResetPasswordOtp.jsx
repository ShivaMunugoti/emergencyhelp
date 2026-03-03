import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import AuthLayout from "../components/AuthLayout";

export default function ResetPasswordOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password/verify", {
        email,
        otp,
        newPassword,
      });

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setErr(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout
        title="Session expired"
        subtitle="Please enter your email again."
      >
        <button className="btn btn-red" onClick={() => navigate("/forgot-password")}>
          Go Back
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password 🔒"
      subtitle={`OTP sent to ${email}`}
    >
      {err && <div className="auth-error">{err}</div>}
      {msg && <div className="auth-success">{msg}</div>}

      <form className="auth-body" onSubmit={handleReset}>
        <input
          className="auth-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="btn btn-green" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </AuthLayout>
  );
}
