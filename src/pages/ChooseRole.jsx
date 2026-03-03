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
    <div className="choose" style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--transition)" }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="choose-box" style={{ textAlign: "center", padding: "60px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "24px", boxShadow: "var(--shadow)", transition: "all var(--transition)" }}>
          <h1 className="tech-mono" style={{ fontSize: "2rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: "2px", color: "var(--red)" }}>
            Clearance Selection
          </h1>
          <p style={{ color: "var(--muted)", fontWeight: 700, margin: "20px 0 40px" }}>
            Identify your deployment role for this session, {name}.
          </p>

          <div className="choose-buttons" style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button
              className="btn btn-blue tech-mono"
              onClick={() => navigate("/dashboard")}
              style={{ padding: "15px 30px", fontWeight: 900 }}
            >
              FIELD_OPERATIVE_HUD
            </button>

            <button
              className="btn btn-red tech-mono"
              onClick={() => navigate("/admin/dashboard")}
              style={{ padding: "15px 30px", fontWeight: 900 }}
            >
              CMD_CONTROL_TERMINAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
