import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmergency } from "../api/emergencyApi";

export default function CreateEmergency() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    emergencyType: "Ambulance",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await createEmergency(form);

      setSuccess("Emergency request created successfully!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create emergency");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Create Emergency 🚨</h2>
        <p className="section-sub">
          Fill details carefully. This request will be visible in dashboard.
        </p>

        <div className="form-card">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleSubmit} className="form-box">
            <input
              className="auth-input"
              name="title"
              type="text"
              placeholder="Emergency Title (Ex: Road Accident)"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              className="auth-input"
              style={{ minHeight: "110px" }}
              name="description"
              placeholder="Describe the emergency..."
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              className="auth-input"
              name="location"
              type="text"
              placeholder="Location (Ex: Hyderabad, Gachibowli)"
              value={form.location}
              onChange={handleChange}
              required
            />

            <select
              className="auth-input"
              name="emergencyType"
              value={form.emergencyType}
              onChange={handleChange}
            >
              <option value="Ambulance">Ambulance</option>
              <option value="Police">Police</option>
              <option value="Hospital">Hospital</option>
              <option value="Accident">Accident</option>
            </select>

            <button className="btn btn-red" disabled={loading}>
              {loading ? "Creating..." : "Submit Emergency"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
