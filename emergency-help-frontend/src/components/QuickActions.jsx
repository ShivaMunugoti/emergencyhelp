export default function QuickActions() {
  const openNearest = (type) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        let query = "emergency services";

        if (type === "hospital") query = "hospitals near me";
        if (type === "police") query = "police station near me";
        if (type === "ambulance") query = "ambulance near me";
        if (type === "accident") query = "car repair emergency near me";

        const url = `https://www.google.com/maps/search/${encodeURIComponent(
          query
        )}/@${lat},${lng},14z`;

        window.open(url, "_blank");
      },
      () => alert("Please allow location permission to open Maps.")
    );
  };

  return (
    <section className="quick">
      <div className="quick-head">
        <h2>Quick Emergency Actions ⚡</h2>
        <p>
          Use quick actions to locate nearby emergency services instantly using
          Maps.
        </p>
      </div>

      <div className="quick-grid">
        <button
          className="quick-card green"
          onClick={() => openNearest("hospital")}
        >
          <div className="q-icon">🏥</div>
          <div className="q-text">
            <h3>Find Hospital</h3>
            <p>Nearest hospitals and medical services</p>
          </div>
          <span className="q-go">→</span>
        </button>

        <button
          className="quick-card blue"
          onClick={() => openNearest("police")}
        >
          <div className="q-icon">👮</div>
          <div className="q-text">
            <h3>Find Police</h3>
            <p>Nearest police stations and help points</p>
          </div>
          <span className="q-go">→</span>
        </button>

        <button
          className="quick-card red"
          onClick={() => openNearest("ambulance")}
        >
          <div className="q-icon">🚑</div>
          <div className="q-text">
            <h3>Find Ambulance</h3>
            <p>Emergency ambulance services nearby</p>
          </div>
          <span className="q-go">→</span>
        </button>

        <button
          className="quick-card orange"
          onClick={() => openNearest("accident")}
        >
          <div className="q-icon">🚗</div>
          <div className="q-text">
            <h3>Accident Help</h3>
            <p>Nearby emergency help for accidents</p>
          </div>
          <span className="q-go">→</span>
        </button>
      </div>
    </section>
  );
}
