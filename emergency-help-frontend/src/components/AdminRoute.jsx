import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // saved after OTP verify

  if (!token) return <Navigate to="/login" />;

  if (role !== "admin") return <Navigate to="/dashboard" />;

  return children;
}
