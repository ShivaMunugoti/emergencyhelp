import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEmergency } from "../api/emergencyApi";
import { User, Phone, MapPin, Navigation, Send, AlertTriangle, Image as ImageIcon, Camera, Map as MapIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapPicker({ setForm, form }) {
  useMapEvents({
    click(e) {
      setForm((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });
  return form.latitude && form.longitude ? (
    <Marker position={[form.latitude, form.longitude]} />
  ) : null;
}

export default function CreateEmergency() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    emergencyType: "Ambulance",
    reporterName: localStorage.getItem("name") || "",
    phoneNumber: "",
    latitude: null,
    longitude: null,
    incidentImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [geoStatus, setGeoStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, incidentImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus("Geolocation is not supported by your browser");
      return;
    }

    setGeoStatus("Requesting coordinates...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGeoStatus("Coordinates anchored successfully.");
      },
      () => {
        setGeoStatus("Unable to retrieve location. Please enter manually.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.phoneNumber) {
      setError("Active phone number is required for dispatch contact.");
      return;
    }

    try {
      setLoading(true);
      console.log("[DEPLOY_DEBUG] Initializing Emergency Deployment with Payload:", form);
      await createEmergency(form);
      setSuccess("Emergency deployment successful. Monitoring initialized.");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to deploy emergency request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section visible" style={{ minHeight: "100vh", background: "var(--bg)", transition: "background var(--transition)" }}>
      <div className="auth-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", border: "1px solid var(--border)", background: "var(--card)", borderRadius: "20px", boxShadow: "var(--shadow)" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 className="tech-mono" style={{ fontSize: "2rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: "2px", color: "var(--red)" }}>
            INITIATE_TACTICAL_INCIDENT
          </h2>
          <p style={{ color: "var(--muted)", fontWeight: 700, marginTop: "10px" }}>
            Secure Channel: Priority 1 Dispatch Authorization — Including specialized Women's Safety & SOS protocols.
          </p>
        </div>

        <div className="auth-card" style={{ width: "100%", maxWidth: "600px", padding: "40px", backdropFilter: "blur(12px)", background: "transparent", margin: "0 auto" }}>
          {error && <div className="auth-error" style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}><AlertTriangle size={18} /> {error}</div>}
          {success && <div className="auth-success" style={{ marginBottom: "20px" }}>{success}</div>}

          <form onSubmit={handleSubmit} className="auth-body" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div className="auth-input-group">
              <User className="auth-icon" size={18} style={{ position: "absolute", left: "15px", color: "var(--muted)" }} />
              <input
                className="auth-input"
                style={{ paddingLeft: "45px" }}
                name="reporterName"
                type="text"
                placeholder="Reporter Full Name"
                value={form.reporterName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <Phone className="auth-icon" size={18} style={{ position: "absolute", left: "15px", color: "var(--muted)" }} />
              <input
                className="auth-input"
                style={{ paddingLeft: "45px" }}
                name="phoneNumber"
                type="tel"
                placeholder="Active Phone Number (Ex: +1234567890)"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <input
                className="auth-input"
                name="title"
                type="text"
                placeholder="Situation Title (Ex: Severe Medical Distress)"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              className="auth-input"
              style={{ minHeight: "120px", resize: "none" }}
              name="description"
              placeholder="Detailed Incident Briefing (Ex: Multiple vehicles involved, injury detected)..."
              value={form.description}
              onChange={handleChange}
              required
            />

            <div className="incident-upload" style={{ border: "2px dashed var(--border)", borderRadius: "12px", padding: "20px", textAlign: "center", background: "var(--input-bg)" }}>
              {form.incidentImage ? (
                <div style={{ position: "relative" }}>
                  <img src={form.incidentImage} alt="Incident Evidence" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, incidentImage: null })}
                    style={{ position: "absolute", top: "10px", right: "10px", background: "var(--red)", border: "none", color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontWeight: 900 }}
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <label style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <ImageIcon size={30} style={{ color: "var(--muted)" }} />
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem", fontWeight: 700 }}>ATTACH INCIDENT EVIDENCE (IMAGE)</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                </label>
              )}
            </div>

            <div className="location-selection-tactical" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div className="map-portal-container" style={{ height: "250px", width: "100%", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)" }}>
                <MapContainer
                  center={[17.3850, 78.4867]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapPicker setForm={setForm} form={form} />
                </MapContainer>
              </div>
              <p className="tech-mono" style={{ fontSize: "0.7rem", color: "var(--muted)", textAlign: "center", fontWeight: 700 }}>
                🖱️ CLICK_ON_MAP_TO_PIN_TELEMETRY
              </p>

              <div className="auth-input-group" style={{ display: "flex", gap: "10px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <MapPin size={18} style={{ position: "absolute", left: "15px", top: "15px", color: "var(--muted)" }} />
                  <input
                    className="auth-input"
                    style={{ paddingLeft: "45px" }}
                    name="address"
                    type="text"
                    placeholder="Sector / Physical Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={getGeolocation}
                  className="btn btn-black"
                  style={{ padding: "0 20px", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}
                  title="Anchor GPS Coordinates"
                >
                  <Navigation size={18} />
                </button>
              </div>
            </div>

            {geoStatus && (
              <p className="tech-mono" style={{ fontSize: "0.75rem", color: "var(--red)", fontWeight: 800, textAlign: "center", margin: "10px 0" }}>
                📡 SIGNAL: {geoStatus.toUpperCase()}
              </p>
            )}

            {form.latitude && form.longitude && (
              <div className="tech-mono" style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", fontSize: "0.75rem", color: "var(--blue)" }}>
                <span>LAT: {form.latitude.toFixed(4)}</span>
                <span>LON: {form.longitude.toFixed(4)}</span>
              </div>
            )}

            <select
              className="auth-input"
              name="emergencyType"
              value={form.emergencyType}
              onChange={handleChange}
              style={{ background: "var(--input-bg)" }}
            >
              <option value="Ambulance">🚑 Medical (Ambulance)</option>
              <option value="Police">👮 Security (Police)</option>
              <option value="Hospital">🏥 Facility (Hospital)</option>
              <option value="Accident">🚗 Recovery (Accident)</option>
              <option value="WomenSafety">🛡️ Women's Safety / SOS</option>
            </select>

            <button className="btn btn-red pulse" disabled={loading} style={{ padding: "18px", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
              {loading ? "Transmitting..." : <><Send size={20} /> Initialize Deployment</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
