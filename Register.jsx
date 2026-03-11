import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      await register(form.email, form.password, form.displayName);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <h1 className="auth-headline">
            Share your world<br />
            <em>with the world.</em>
          </h1>
          <p className="auth-subtext">
            Join thousands of experience providers and travelers discovering
            the planet's hidden gems.
          </p>
          <div className="auth-stats">
            <div className="stat">
              <span className="stat-num">2.4k+</span>
              <span className="stat-label">Experiences</span>
            </div>
            <div className="stat">
              <span className="stat-num">80+</span>
              <span className="stat-label">Countries</span>
            </div>
            <div className="stat">
              <span className="stat-num">12k+</span>
              <span className="stat-label">Travelers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="logo-dot" />
            <span className="auth-logo-text">wandr</span>
          </div>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">
            Already have one?{" "}
            <Link to="/login" className="auth-switch-link">
              Log in
            </Link>
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input
                className="field-input"
                type="text"
                name="displayName"
                placeholder="Jane Doe"
                value={form.displayName}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input
                className="field-input"
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <input
                className="field-input"
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary full-width"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" /> Creating account…
                </span>
              ) : (
                "Create account →"
              )}
            </button>
          </form>

          <p className="auth-terms">
            By registering you agree to our{" "}
            <span className="terms-link">Terms of Service</span> and{" "}
            <span className="terms-link">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
