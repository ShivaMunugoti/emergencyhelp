import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "Admin";

  // only admin can access
  if (role !== "admin") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="choose">
      <div className="container">
        <div className="choose-box">
          <h1>Welcome, {name} 👋</h1>
          <p>
            You have admin access. Choose how you want to enter the system.
          </p>

          <div className="choose-buttons">
            <button
              className="btn btn-blue"
              onClick={() => navigate("/dashboard")}
            >
              👤 Login as User
            </button>

            <button
              className="btn btn-red"
              onClick={() => navigate("/admin/dashboard")}
            >
              👑 Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
