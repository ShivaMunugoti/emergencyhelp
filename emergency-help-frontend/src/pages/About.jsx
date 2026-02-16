export default function About() {
  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">About EmergencyHelp</h2>
        <p className="section-sub">
          EmergencyHelp is built to reduce emergency response delays by allowing
          users to report emergencies instantly and track the status until it is
          resolved.
        </p>

        <div className="grid3">
          <div className="card">
            <h3 style={{ fontWeight: 950, fontSize: "1.2rem" }}>
              Fast Reporting
            </h3>
            <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.7 }}>
              Users can create emergency requests in seconds with accurate
              details.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 950, fontSize: "1.2rem" }}>
              Status Tracking
            </h3>
            <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.7 }}>
              Every emergency is tracked with Pending → Accepted → Resolved.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: 950, fontSize: "1.2rem" }}>
              Secure Login (OTP)
            </h3>
            <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.7 }}>
              OTP verification ensures secure access and prevents fake logins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
