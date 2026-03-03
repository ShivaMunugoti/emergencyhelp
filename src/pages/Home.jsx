import { useEffect, useRef } from "react";
import HeroCarousel from "../components/HeroCarousel";
import QuickActions from "../components/QuickActions";
import { Link } from "react-router-dom";

export default function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="home" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* HERO SECTION */}
      <section className="hero" style={{
        position: "relative",
        padding: "120px 0",
        overflow: "hidden",
        backgroundImage: `linear-gradient(var(--nav-bg), var(--nav-bg)), url("${new URL('../assets/images/hero_india.png', import.meta.url).href}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderBottom: "1px solid var(--border)"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="badge inline" style={{ marginBottom: "20px", background: "rgba(239, 68, 68, 0.1)", color: "var(--red)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "8px 20px", fontSize: "0.8rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px", borderRadius: "30px" }}>
            🚨 Priority_Level: CRITICAL
          </div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 950, textTransform: "uppercase", lineHeight: 0.9, marginBottom: "20px", letterSpacing: "-2px" }}>
            Bharat <span style={{ color: "var(--red)", textShadow: "0 0 25px var(--accent-glow)" }}>Digital</span> Command
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--muted)", marginBottom: "40px", lineHeight: 1.6, maxWidth: "800px", marginInline: "auto", fontWeight: 600 }}>
            Modern tactical infrastructure for coordinated life-saving operations, **specialized Women's Safety SOS**, and emergency response in the Indian subcontinent.
            Engineered by <b style={{ color: "var(--text)" }}>Shiva Munugoti</b>.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn-red pulse" to="/create-emergency" style={{ padding: "18px 36px", fontSize: "1.1rem" }}>
              🚨 Initialize Tactical Incident
            </Link>
            <Link className="btn" to="/login" style={{ padding: "18px 36px", fontSize: "1.1rem", background: "var(--input-bg)", border: "1px solid var(--border)", backdropFilter: "blur(10px)", color: "var(--text)" }}>
              Secure Terminal Access
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* QUICK ACTIONS */}
        <div ref={addToRefs} className="section">
          <QuickActions />
        </div>

        {/* HOW IT WORKS */}
        <section ref={addToRefs} className="section how">
          <h2 className="section-title">Operational Protocol ⚡</h2>
          <p className="section-sub" style={{ textAlign: "center", color: "var(--muted)", marginBottom: "40px" }}>
            The standard workflow for emergency response management.
          </p>

          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div className="card">
              <h3 style={{ color: "var(--red)", marginBottom: "12px" }}>01. Situation Report</h3>
              <p style={{ color: "var(--muted)" }}>
                Initialize a structured case with telemetry, location data, and severity analysis.
              </p>
            </div>

            <div className="card">
              <h3 style={{ color: "var(--blue)", marginBottom: "12px" }}>02. Resource Dispatch</h3>
              <p style={{ color: "var(--muted)" }}>
                Authorized Command monitors active requests and authorizes targeted action.
              </p>
            </div>

            <div className="card">
              <h3 style={{ color: "var(--green)", marginBottom: "12px" }}>03. Resolution</h3>
              <p style={{ color: "var(--muted)" }}>
                Live tracking until the situation is neutralized and archived.
              </p>
            </div>
          </div>
        </section>

        {/* EMERGENCY CATEGORIES */}
        <section ref={addToRefs} className="section cats">
          <h2 className="section-title">Response Units 🚨</h2>
          <p className="section-sub" style={{ textAlign: "center", color: "var(--muted)", marginBottom: "40px" }}>
            Specialized units for multi-domain emergency handling.
          </p>

          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            <div className="card" style={{ borderLeft: "4px solid var(--green)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span style={{ fontSize: "1.5rem" }}>🚑</span>
                <span className="badge green" style={{ fontSize: "0.7rem", fontWeight: 900 }}>AMBULANCE-UNIT</span>
              </div>
              <h3>Medical Support</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Urgent medical intervention and extraction services.</p>
            </div>

            <div className="card" style={{ borderLeft: "4px solid var(--blue)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span style={{ fontSize: "1.5rem" }}>👮</span>
                <span className="badge blue" style={{ fontSize: "0.7rem", fontWeight: 900 }}>POLICE-UNIT</span>
              </div>
              <h3>Law Enforcement</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Critical security response and threat neutralization.</p>
            </div>

            <div className="card" style={{ borderLeft: "4px solid #a855f7" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span style={{ fontSize: "1.5rem" }}>🏥</span>
                <span className="badge purple" style={{ fontSize: "0.7rem", fontWeight: 900 }}>HOSPITAL-UNIT</span>
              </div>
              <h3>Facility Coordination</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Nearest hospital intake and medical logistics.</p>
            </div>

            <div className="card" style={{ borderLeft: "4px solid #f97316" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span style={{ fontSize: "1.5rem" }}>🚗</span>
                <span className="badge orange" style={{ fontSize: "0.7rem", fontWeight: 900 }}>RECOVERY-UNIT</span>
              </div>
              <h3>Accident Control</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Accident site management and recovery operations.</p>
            </div>

            <div className="card" style={{ borderLeft: "4px solid var(--red)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <span style={{ fontSize: "1.5rem" }}>🛡️</span>
                <span className="badge red" style={{ fontSize: "0.7rem", fontWeight: 900 }}>WOMEN-SAFETY-UNIT</span>
              </div>
              <h3>Women's Safety SOS</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Specialized rapid response for women's protection and distress signals.</p>
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section ref={addToRefs} className="section impact">
          <h2 className="section-title">Network Impact 📊</h2>
          <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "40px" }}>
            <div className="card" style={{ textAlign: "center" }}>
              <h3 className="tech-mono" style={{ fontSize: "2.5rem", color: "var(--text)" }}>2.4K+</h3>
              <p style={{ color: "var(--muted)" }}>Reports Processed</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <h3 className="tech-mono" style={{ fontSize: "2.5rem", color: "var(--green)" }}>1.9K+</h3>
              <p style={{ color: "var(--muted)" }}>Neutralized / Concluded</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <h3 className="tech-mono" style={{ fontSize: "2.5rem", color: "var(--red)" }}>4.2m</h3>
              <p style={{ color: "var(--muted)" }}>Response Latency</p>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <h3 className="tech-mono" style={{ fontSize: "2.5rem", color: "var(--blue)" }}>24/7</h3>
              <p style={{ color: "var(--muted)" }}>System Uptime</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section ref={addToRefs} className="section final-cta" style={{ textAlign: "center", padding: "100px 20px", background: "rgba(59, 130, 246, 0.03)", borderRadius: "30px", border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Awaiting Operational Readiness?</h2>
          <p style={{ color: "var(--muted)", marginBottom: "40px" }}>Onboard as an official Field Operative or initialize a tactical incident report.</p>

          <div className="cta-buttons" style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <Link className="btn btn-red" to="/create-emergency">
              🚨 TACTICAL_REPORT
            </Link>
            <Link className="btn btn-black" to="/register" style={{ border: "1px solid var(--border)" }}>
              ✅ FIELD_ONBOARDING
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer" style={{ borderTop: "1px solid var(--border)", padding: "40px 0" }}>
        <div className="container footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <p style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} <b style={{ color: "var(--text)" }}>Tactical Emergency Network</b>.
            Designed & Developed by <span style={{ color: "var(--red)", fontWeight: 800 }}>Shiva Munugoti</span>.
            Unauthorized access is strictly prohibited.
          </p>

          <div className="footer-links" style={{ display: "flex", gap: "30px" }}>
            <Link to="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>PROTOCOL_HOME</Link>
            <Link to="/login" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>CLEARANCE_ACCESS</Link>
            <Link to="/register" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>ONBOARDING</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
