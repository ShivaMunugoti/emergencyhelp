import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const name = localStorage.getItem("name") || "User";

  const fetchMyEmergencies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/emergency/my");
      setEmergencies(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEmergencies();
  }, []);

  const stats = useMemo(() => {
    const total = emergencies.length;
    const pending = emergencies.filter((e) => e.status === "Pending").length;
    const accepted = emergencies.filter((e) => e.status === "Accepted").length;
    const resolved = emergencies.filter((e) => e.status === "Resolved").length;

    return { total, pending, accepted, resolved };
  }, [emergencies]);

  const filteredEmergencies = useMemo(() => {
    if (filter === "All") return emergencies;
    return emergencies.filter((e) => e.status === filter);
  }, [emergencies, filter]);

  const openNearest = (query) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const url = `https://www.google.com/maps/search/${encodeURIComponent(
          query
        )}/@${lat},${lng},14z`;

        window.open(url, "_blank");
      },
      () => alert("Please allow location permission to open Maps.")
    );
  };

  const renderHistory = (history) => {
    if (!history || history.length === 0) return null;

    return (
      <div className="timeline">
        {history.map((h, idx) => (
          <div key={idx} className="t-item">
            <span className="t-dot" />
            <div className="t-body">
              <p className="t-status">{h.status}</p>
              <p className="t-time">
                {new Date(h.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dash">
      <div className="container">
        {/* HEADER */}
        <div className="dash-header" style={{ marginBottom: "40px" }}>
          <div>
            <h1 className="tech-mono" style={{ fontSize: "2rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: "1px" }}>
              Field <span style={{ color: "var(--red)" }}>Operative</span> HUD
            </h1>
            <p style={{ color: "var(--muted)", fontWeight: 750 }}>Welcome back, {name}. Monitoring your active tactical deployments.</p>
          </div>

          <div className="dash-actions">
            <Link className="btn btn-red" to="/create-emergency" style={{ fontWeight: 900 }}>
              🚨 INITIATE_INCIDENT
            </Link>

            <button
              className="btn btn-blue"
              onClick={() => openNearest("hospitals near me")}
              style={{ fontWeight: 900 }}
            >
              🏥 LOCATE_RESOURCES
            </button>

            <button className="btn btn-black" onClick={fetchMyEmergencies} style={{ border: "1px solid var(--border)", fontWeight: 900 }}>
              🔄 REFRESH_FEED
            </button>
          </div>
        </div>

        <div className="dash-stats">
          <div className="stat-card">
            <h3 className="tech-mono">{stats.total}</h3>
            <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--muted)" }}>TOTAL_REPORTS</p>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid #eab308" }}>
            <h3 className="tech-mono">{stats.pending}</h3>
            <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#eab308" }}>AWAITING_VERIF</p>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid #3b82f6" }}>
            <h3 className="tech-mono">{stats.accepted}</h3>
            <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#3b82f6" }}>ACTIVE_DISPATCH</p>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid #22c55e" }}>
            <h3 className="tech-mono">{stats.resolved}</h3>
            <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "#22c55e" }}>CONCLUDED</p>
          </div>
        </div>

        {/* FILTER */}
        <div className="dash-filter">
          <button
            className={`chip ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={`chip ${filter === "Pending" ? "active" : ""}`}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>

          <button
            className={`chip ${filter === "Accepted" ? "active" : ""}`}
            onClick={() => setFilter("Accepted")}
          >
            Accepted
          </button>

          <button
            className={`chip ${filter === "Resolved" ? "active" : ""}`}
            onClick={() => setFilter("Resolved")}
            style={{ fontWeight: 900 }}
          >
            CONCLUDED
          </button>
        </div>

        <div className="dash-list">
          <h2 style={{ textTransform: "uppercase", letterSpacing: "1px", fontSize: "1.2rem", marginBottom: "20px" }}>Active Operative Log</h2>

          {loading && <Loader text="Loading your emergency requests..." />}
          {error && <p className="error">{error}</p>}

          {!loading && !error && filteredEmergencies.length === 0 && (
            <p className="muted">
              No emergency requests found. Create one now.
            </p>
          )}

          {!loading &&
            !error &&
            filteredEmergencies.map((e) => (
              <div key={e._id} className="case-card">
                <div className="case-left">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                    <span className="tech-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600 }}>UID_{e._id.slice(-6).toUpperCase()}</span>
                    <div className={`badge ${e.emergencyType.toLowerCase()}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                      {e.emergencyType.toUpperCase()}
                    </div>
                  </div>

                  <h3>{e.title}</h3>
                  <p className="muted">{e.description}</p>
                  {e.incidentImage && (
                    <img src={e.incidentImage} alt="Proof" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px", margin: "10px 0" }} />
                  )}
                  <p className="loc">📍 {e.address || e.location}</p>

                  <div className="timelineWrap">
                    <p className="smallTitle">Status History</p>
                    {renderHistory(e.statusHistory)}
                  </div>
                </div>

                <div className="case-right">
                  <div className={`status tech-mono ${e.status.toLowerCase()}`} style={{
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    background: e.status === "Pending" ? "#eab308" : e.status === "Accepted" ? "#3b82f6" : "#22c55e",
                    color: "#fff"
                  }}>
                    {e.status === "Pending" ? "AWAITING_VERIF" : e.status === "Accepted" ? "ACTIVE_DISPATCH" : "CONCLUDED"}
                  </div>

                  <p className="date">
                    Created: {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
