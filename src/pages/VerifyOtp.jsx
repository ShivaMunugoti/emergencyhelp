import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import API from "../api/api";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log("VERIFY OTP RESPONSE:", res.data);

      // MUST come from backend
      const token = res.data.token;
      const role = res.data.role; // admin/user

      if (!token) {
        setError("Token missing from backend response");
        return;
      }

      if (!role) {
        setError("Role missing from backend response");
        return;
      }

      // Save in localStorage (AdminRoute depends on this)
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setSuccess("OTP verified successfully! Redirecting...");

      setTimeout(() => {
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/dashboard");
      }, 600);
    } catch (err) {
      setError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout
        title="OTP Session Expired"
        subtitle="Please login again to receive OTP."
      >
        <button className="btn btn-red" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Verify OTP 🔐"
      subtitle={`Enter the OTP sent to: ${email}`}
    >
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}

      <form onSubmit={handleVerify} className="auth-body">
        <input
          className="auth-input"
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />

        <button className="btn btn-green" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          type="button"
          className="btn btn-blue"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </form>
    </AuthLayout>
  );
}
