import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import { Activity, Shield, CheckCircle, Clock, RefreshCw, Trash2, MapPin, User, Phone, ExternalLink, Navigation } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [adminLocation, setAdminLocation] = useState({ lat: 17.3850, lon: 78.4867 }); // Default to Hyderabad, India center

  const fetchAllEmergencies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/emergency/all");
      console.log("[DASH_DEBUG] All Emergencies Payload:", res.data);
      setEmergencies(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmergencies();

    // Get Admin's current location for the "Command Center" reference
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setAdminLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        console.log("[DASH_DEBUG] Admin Command Center anchored at:", pos.coords.latitude, pos.coords.longitude);
      });
    }
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

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/emergency/update/${id}`, { status });
      fetchAllEmergencies();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    }
  };

  const deleteCase = async (id) => {
    const ok = confirm("Are you sure you want to delete this emergency?");
    if (!ok) return;

    try {
      await API.delete(`/emergency/delete/${id}`);
      fetchAllEmergencies();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete emergency");
    }
  };

  const calculateDistance = (lat1, lon1) => {
    // Reference from dynamic Admin Location (Command Center)
    const lat2 = adminLocation.lat;
    const lon2 = adminLocation.lon;

    if (!lat1 || !lon1) return "N/A";

    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    if (d < 1) return (d * 1000).toFixed(0) + " meters";
    return d.toFixed(2) + " km";
  };

  const renderHistory = (history) => {
    if (!history || history.length === 0) return "No history";

    return history
      .map(
        (h) =>
          `${h.status} (${new Date(h.updatedAt).toLocaleString()})`
      )
      .join(" → ");
  };

  return (
    <div className="dash scan-container visible" style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: "60px", transition: "background var(--transition)" }}>
      <div className="container">
        {/* HEADER */}
        <div className="dash-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "40px 0", borderBottom: "1px solid var(--border)", marginBottom: "40px" }}>
          <div>
            <h1 className="tech-mono" style={{ fontSize: "2.5rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px" }}>
              Bharat <span style={{ color: "var(--red)" }}>CMD_CONTROL</span> 🇮🇳
            </h1>
            <p style={{ color: "var(--muted)", marginTop: "10px", fontWeight: 600 }}>
              National Defense Infrastructure. Monitors tactical deployments and operative safety protocols.
            </p>
          </div>

          <div className="dash-actions">
            <button className="btn btn-black" onClick={fetchAllEmergencies} style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid var(--border)" }}>
              <RefreshCw size={18} className={loading ? "spin" : ""} />
              Force Refresh
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          <div className="card" style={{ borderLeft: "4px solid var(--text)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--muted)", marginBottom: "5px" }}>
              <Activity size={16} /> <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>TOTAL_OPS</span>
            </div>
            <h3 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text)" }}>{stats.total}</h3>
          </div>

          <div className="card" style={{ borderLeft: "4px solid #eab308" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#eab308", marginBottom: "5px" }}>
              <Clock size={16} /> <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>AWAITING_VERIF</span>
            </div>
            <h3 className="tech-mono" style={{ fontSize: "2.5rem", fontWeight: 900 }}>{stats.pending}</h3>
          </div>

          <div className="card" style={{ borderLeft: "4px solid #3b82f6" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3b82f6", marginBottom: "5px" }}>
              <Shield size={16} /> <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>ACTIVE_DISPATCH</span>
            </div>
            <h3 className="tech-mono" style={{ fontSize: "2.5rem", fontWeight: 900 }}>{stats.accepted}</h3>
          </div>

          <div className="card" style={{ borderLeft: "4px solid #22c55e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#22c55e", marginBottom: "5px" }}>
              <CheckCircle size={16} /> <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>CONCLUDED_OPS</span>
            </div>
            <h3 className="tech-mono" style={{ fontSize: "2.5rem", fontWeight: 900 }}>{stats.resolved}</h3>
          </div>
        </div>

        {/* FILTER */}
        <div className="dash-filter" style={{ display: "flex", gap: "10px", marginBottom: "30px", overflowX: "auto", paddingBottom: "10px" }}>
          {["All", "Pending", "Accepted", "Resolved"].map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px",
                borderRadius: "30px",
                border: "1px solid var(--border)",
                background: filter === f ? "var(--red)" : "var(--input-bg)",
                color: filter === f ? "#fff" : "var(--muted)",
                fontWeight: 700,
                cursor: "pointer",
                transition: "0.2s"
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="dash-list">
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>Active Priority Requests</h2>

          {loading && <Loader text="Synchronizing case data..." />}
          {error && <p className="error" style={{ color: "var(--red)", fontWeight: 700 }}>{error}</p>}

          {!loading && !error && filteredEmergencies.length === 0 && (
            <div className="card" style={{ textAlign: "center", padding: "60px" }}>
              <p style={{ color: "var(--muted)", fontWeight: 600 }}>Zero active threats detected in this sector.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {!loading &&
              !error &&
              filteredEmergencies.map((e) => (
                <div key={e._id} className="card" style={{ padding: "0", overflow: "hidden", background: "var(--card)" }}>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, padding: "25px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span className={`badge ${e.emergencyType?.toLowerCase() || "unknown"}`} style={{ fontSize: "0.7rem", fontWeight: 900, background: "rgba(255, 255, 255, 0.05)", padding: "4px 12px", border: "1px solid var(--border)" }}>
                            {(e.emergencyType || "N/A").toUpperCase()}
                          </span>
                          <span className="tech-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600 }}>UID_{e._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="tech-mono" style={{
                          color: "var(--red)",
                          fontWeight: 950,
                          fontSize: "0.9rem",
                          background: "rgba(239, 68, 68, 0.15)",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 0 15px rgba(239, 68, 68, 0.1)"
                        }}>
                          <Navigation size={15} /> DIST: {calculateDistance(e.latitude, e.longitude)}
                        </div>
                      </div>

                      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>{e.title}</h3>
                      <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "20px", lineHeight: 1.5 }}>{e.description}</p>

                      {e.incidentImage && (
                        <div style={{ marginBottom: "20px" }}>
                          <p style={{ fontSize: "0.65rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", marginBottom: "8px" }}>Visual Evidence / Proof</p>
                          <img
                            src={e.incidentImage}
                            alt="Incident Proof"
                            style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px", border: "1px solid var(--border)" }}
                          />
                        </div>
                      )}

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                        <div>
                          <p style={{ fontSize: "0.65rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", marginBottom: "5px" }}>Field Operative</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "0.95rem" }}>
                            <User size={16} /> {e.reporterName || e.createdBy?.name || "Unknown"}
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: "0.65rem", fontWeight: 900, color: "var(--muted)", textTransform: "uppercase", marginBottom: "5px" }}>Contact Protocol</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "0.95rem", color: "var(--blue)" }}>
                            <Phone size={16} /> {e.phoneNumber || "NO_COMM_DATA"}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--muted)", fontWeight: 700, fontSize: "0.8rem" }}>
                          <MapPin size={14} /> sector: {e.address || e.location}
                        </div>
                        {e.latitude && e.longitude && (
                          <a
                            href={`https://www.google.com/maps?q=${e.latitude},${e.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "0.75rem",
                              fontWeight: 900,
                              color: "var(--blue)",
                              textDecoration: "none",
                              background: "rgba(59, 130, 246, 0.1)",
                              padding: "4px 10px",
                              borderRadius: "4px",
                              border: "1px solid rgba(59, 130, 246, 0.2)"
                            }}
                          >
                            <ExternalLink size={12} /> VIEW_LIVE_FEED
                          </a>
                        )}
                      </div>
                    </div>

                    <div style={{ width: "300px", background: "var(--input-bg)", borderLeft: "1px solid var(--border)", padding: "25px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div style={{ textAlign: "right", marginBottom: "20px" }}>
                        <div className={`status tech-mono ${e.status?.toLowerCase() || "pending"}`} style={{
                          display: "inline-block",
                          padding: "6px 16px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 900,
                          background: e.status === "Pending" ? "#eab308" : e.status === "Accepted" ? "#3b82f6" : "#22c55e",
                          color: "#fff"
                        }}>
                          {e.status === "Pending" ? "AWAITING_VERIF" : e.status === "Accepted" ? "ACTIVE_DISPATCH" : "CONCLUDED"}
                        </div>
                      </div>

                      <div className="admin-btns" style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                        {e.status === "Pending" && (
                          <button
                            className="btn btn-blue"
                            onClick={() => updateStatus(e._id, "Accepted")}
                            style={{ padding: "8px 12px", fontSize: "0.8rem" }}
                          >
                            Authorize
                          </button>
                        )}

                        {e.status !== "Resolved" && (
                          <button
                            className="btn btn-green"
                            onClick={() => updateStatus(e._id, "Resolved")}
                            style={{ padding: "8px 12px", fontSize: "0.8rem", fontWeight: 900 }}
                          >
                            CONCLUDE_OP
                          </button>
                        )}

                        <button
                          className="btn btn-black"
                          onClick={() => deleteCase(e._id)}
                          style={{ padding: "8px 12px", fontSize: "0.8rem" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) {
          .dash-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .dash-list .card > div { flex-direction: column; }
          .dash-list .card > div > div:last-child { width: 100%; border-left: none; border-top: 1px solid var(--border); }
        }

        .badge.ambulance { border-color: var(--green); color: var(--green); }
        .badge.police { border-color: var(--blue); color: var(--blue); }
        .badge.hospital { border-color: #a855f7; color: #a855f7; }
        .badge.accident { border-color: #f97316; color: #f97316; }
        .badge.womensafety { border-color: var(--red); color: var(--red); }
      `}</style>
    </div>
  );
}
