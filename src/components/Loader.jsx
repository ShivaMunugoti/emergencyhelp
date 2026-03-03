export default function Loader({ text = "System Scanning..." }) {
  return (
    <div className="loader-container" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      gap: "20px"
    }}>
      <div className="radar-loader">
        <div className="radar-sweep"></div>
        <div className="radar-circle"></div>
      </div>
      <p style={{
        color: "var(--muted)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "2px",
        fontSize: "0.8rem",
        animation: "pulse 2s infinite"
      }}>{text}</p>

      <style>{`
        .radar-loader {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid var(--border);
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
        }

        .radar-sweep {
          position: absolute;
          width: 100%;
          height: 100%;
          background: conic-gradient(from 0deg, var(--red) 0deg, transparent 90deg);
          animation: rotate 2s linear infinite;
          opacity: 0.3;
        }

        .radar-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: var(--red);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--red);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
