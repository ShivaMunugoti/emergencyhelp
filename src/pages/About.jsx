export default function About() {
  return (
    <div className="section visible" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 className="section-title" style={{ fontSize: "3.5rem", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 950 }}>
            The <span style={{ color: "var(--red)" }}>Bharat</span> Protocol
          </h2>
          <p className="section-sub" style={{ color: "var(--muted)", maxWidth: "800px", margin: "20px auto", lineHeight: 1.8, fontSize: "1.1rem", fontWeight: 600 }}>
            The <b className="tech-mono">Bharat Digital Command Network</b> was engineered by Lead Architect <b className="tech-mono">Shiva Munugoti</b> to bridge the critical telemetry gap between people in distress and specialized Response Units.
          </p>
          <p style={{ color: "var(--muted)", maxWidth: "700px", margin: "0 auto", fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.6 }}>
            "This initiative was born from a realization of systematic failure. I once witnessed a critical emergency where a fellow citizen needed immediate assistance, yet no help arrived in time as bystanders were untrained and disconnected from authorities. I created this platform to ensure that no Indian ever has to face an emergency alone again." — Shiva Munugoti
          </p>
        </div>

        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "80px" }}>
          <div className="auth-card" style={{ borderLeft: "4px solid var(--red)" }}>
            <h3 style={{ color: "var(--red)", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 900 }}>
              🚨 National Purpose
            </h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              In critical Indian high-stakes situations, every second determines an outcome. This platform provides a centralized duty protocol for reporting, verifying, and neutralizing tactical threats—including specialized **Women's Safety & SOS** responses—in real-time.
            </p>
          </div>

          <div className="auth-card" style={{ borderLeft: "4px solid var(--blue)" }}>
            <h3 style={{ color: "var(--blue)", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 900 }}>
              📡 Tactical Telemetry
            </h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Utilizing advanced geospatial anchoring suited for the Indian landscape, we ensure that local police, ambulance, and fire services have precise coordinates before they even arrive.
            </p>
          </div>

          <div className="auth-card" style={{ borderLeft: "4px solid var(--green)" }}>
            <h3 style={{ color: "var(--green)", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 900 }}>
              🛡️ Rapid Neutralization
            </h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
              We facilitate a seamless transition from <span className="tech-mono">AWAITING_VERIF</span> to <span className="tech-mono">CONCLUDED</span>, ensuring all stakeholders are synchronized via a single source of truth for a safer Bharat.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "60px 40px", border: "1px solid var(--border)", borderRadius: "20px", background: "var(--card)", boxShadow: "var(--shadow)" }}>
          <p className="tech-mono" style={{ color: "var(--muted)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "15px", fontWeight: 900 }}>Network Architect & Lead Developer</p>
          <h3 className="tech-mono" style={{ fontSize: "2.5rem", fontWeight: 950, color: "var(--text)", textTransform: "uppercase" }}>SHIVA_MUNUGOTI</h3>
          <p style={{ color: "var(--muted)", marginTop: "15px", maxWidth: "600px", marginInline: "auto", lineHeight: 1.6 }}>
            A mission-driven engineer dedicated to digitizing India's emergency response infrastructure. This platform is a tribute to the spirit of Bharat and the collective safety of its citizens.
          </p>
        </div>
      </div>
    </div>
  );
}
