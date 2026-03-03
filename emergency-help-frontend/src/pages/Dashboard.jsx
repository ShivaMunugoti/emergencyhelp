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
        <div className="dash-header">
          <div>
            <h1>Welcome, {name} 👋</h1>
            <p>
              Track your emergency requests and view status updates clearly until
              resolution.
            </p>
          </div>

          <div className="dash-actions">
            <Link className="btn btn-red" to="/create-emergency">
              🚨 Create Emergency
            </Link>

            <button
              className="btn btn-blue"
              onClick={() => openNearest("hospitals near me")}
            >
              🏥 Find Hospitals
            </button>

            <button className="btn btn-green" onClick={fetchMyEmergencies}>
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="dash-stats">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Requests</p>
          </div>

          <div className="stat-card">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h3>{stats.accepted}</h3>
            <p>Accepted</p>
          </div>

          <div className="stat-card">
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
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
          >
            Resolved
          </button>
        </div>

        {/* LIST */}
        <div className="dash-list">
          <h2>My Emergency Requests</h2>

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
                  <div className={`badge ${e.emergencyType.toLowerCase()}`}>
                    {e.emergencyType}
                  </div>

                  <h3>{e.title}</h3>
                  <p className="muted">{e.description}</p>
                  <p className="loc">📍 {e.location}</p>

                  <div className="timelineWrap">
                    <p className="smallTitle">Status History</p>
                    {renderHistory(e.statusHistory)}
                  </div>
                </div>

                <div className="case-right">
                  <div className={`status ${e.status.toLowerCase()}`}>
                    {e.status}
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
