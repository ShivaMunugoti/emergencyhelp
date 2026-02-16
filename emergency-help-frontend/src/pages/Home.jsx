import HeroCarousel from "../components/HeroCarousel";
import QuickActions from "../components/QuickActions";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        {/* HERO */}
        <HeroCarousel />

        {/* QUICK ACTIONS */}
        <QuickActions />

        {/* HOW IT WORKS */}
        <section className="how">
          <h2 className="section-title">How it works ⚡</h2>
          <p className="section-sub">
            EmergencyHelp is designed to reduce confusion and save time during
            critical situations. A user can report an emergency and track it
            until it is resolved.
          </p>

          <div className="how-grid">
            <div className="how-card">
              <h3>1️⃣ Create Emergency</h3>
              <p>
                Fill a structured form with emergency type, location and short
                description.
              </p>
            </div>

            <div className="how-card">
              <h3>2️⃣ Admin Accepts</h3>
              <p>
                Admin monitors all requests and accepts the case for action and
                follow-up.
              </p>
            </div>

            <div className="how-card">
              <h3>3️⃣ Track Until Resolved</h3>
              <p>
                User can see live status updates: Pending → Accepted → Resolved.
              </p>
            </div>
          </div>
        </section>

        {/* EMERGENCY CATEGORIES */}
        <section className="cats">
          <h2 className="section-title">Emergency categories 🚨</h2>
          <p className="section-sub">
            EmergencyHelp supports multiple emergency categories to handle
            real-world cases.
          </p>

          <div className="cats-grid">
            <div className="cat-card">
              <div className="cat-top">
                <span className="cat-icon">🚑</span>
                <span className="cat-tag green">Ambulance</span>
              </div>
              <h3>Medical Emergency</h3>
              <p>
                Request ambulance help quickly and track status updates from the
                system.
              </p>
            </div>

            <div className="cat-card">
              <div className="cat-top">
                <span className="cat-icon">👮</span>
                <span className="cat-tag blue">Police</span>
              </div>
              <h3>Police Assistance</h3>
              <p>
                Report critical situations such as theft, threats, or suspicious
                activities.
              </p>
            </div>

            <div className="cat-card">
              <div className="cat-top">
                <span className="cat-icon">🏥</span>
                <span className="cat-tag purple">Hospital</span>
              </div>
              <h3>Hospital Support</h3>
              <p>
                Find nearest hospitals quickly and create emergency requests for
                urgent medical support.
              </p>
            </div>

            <div className="cat-card">
              <div className="cat-top">
                <span className="cat-icon">🚗</span>
                <span className="cat-tag orange">Accident</span>
              </div>
              <h3>Accident Reporting</h3>
              <p>
                Report accident cases instantly with location details to reduce
                response delay.
              </p>
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="impact">
          <h2 className="section-title">Platform impact 📊</h2>
          <p className="section-sub">
            This platform is designed like a real emergency workflow product.
            The focus is faster reporting, better tracking, and faster
            resolution.
          </p>

          <div className="impact-grid">
            <div className="impact-card">
              <h3>2,450+</h3>
              <p>Emergency requests received</p>
            </div>

            <div className="impact-card">
              <h3>1,920+</h3>
              <p>Cases resolved successfully</p>
            </div>

            <div className="impact-card">
              <h3>4.2 mins</h3>
              <p>Average response time</p>
            </div>

            <div className="impact-card">
              <h3>24/7</h3>
              <p>Emergency support availability</p>
            </div>
          </div>
        </section>

        {/* LIVE UPDATES */}
        <section className="live">
          <h2 className="section-title">Live emergency updates 🔴</h2>
          <p className="section-sub">
            A user should never feel lost after submitting a request. This
            system provides a clear workflow and progress updates.
          </p>

          <div className="live-grid">
            <div className="live-card">
              <h3>🟡 Pending</h3>
              <p>
                Request submitted successfully and waiting for admin review.
              </p>
            </div>

            <div className="live-card">
              <h3>🔵 Accepted</h3>
              <p>
                Admin accepted the case and emergency response is being handled.
              </p>
            </div>

            <div className="live-card">
              <h3>🟢 Resolved</h3>
              <p>
                Case closed successfully and final update is shown to the user.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta">
          <h2>Need emergency help right now?</h2>
          <p>
            Create an emergency request in seconds and track it until it is
            resolved.
          </p>

          <div className="cta-buttons">
            <Link className="btn btn-red" to="/create-emergency">
              🚨 Create Emergency
            </Link>
            <Link className="btn btn-green" to="/register">
              ✅ Register Now
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} <b>EmergencyHelp</b>. Designed for
            real-world emergency response workflow.
          </p>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
