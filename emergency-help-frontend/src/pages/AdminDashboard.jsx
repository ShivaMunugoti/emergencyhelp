import { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchAllEmergencies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/emergency/all");
      setEmergencies(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmergencies();
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
    <div className="dash">
      <div className="container">
        {/* HEADER */}
        <div className="dash-header">
          <div>
            <h1>Admin Dashboard 👑</h1>
            <p>
              Monitor all emergency cases, update status workflow, and maintain
              case history for transparency.
            </p>
          </div>

          <div className="dash-actions">
            <button className="btn btn-blue" onClick={fetchAllEmergencies}>
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
          <h2>All Emergency Requests</h2>

          {loading && <Loader text="Loading emergency cases..." />}
          {error && <p className="error">{error}</p>}

          {!loading && !error && filteredEmergencies.length === 0 && (
            <p className="muted">No emergency cases found.</p>
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

                  <p className="history">
                    <b>History:</b> {renderHistory(e.statusHistory)}
                  </p>
                </div>

                <div className="case-right">
                  <div className={`status ${e.status.toLowerCase()}`}>
                    {e.status}
                  </div>

                  <div className="admin-btns">
                    <button
                      className="btn btn-green"
                      onClick={() => updateStatus(e._id, "Accepted")}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-red"
                      onClick={() => updateStatus(e._id, "Resolved")}
                    >
                      Resolve
                    </button>

                    <button
                      className="btn btn-dark"
                      onClick={() => deleteCase(e._id)}
                    >
                      Delete
                    </button>
                  </div>

                  <p className="date">
                    {new Date(e.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
