export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        <p className="auth-sub">{subtitle}</p>
        <div className="auth-body">{children}</div>
      </div>
    </div>
  );
}
