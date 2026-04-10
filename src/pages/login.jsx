import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import { loginService } from "../services/signupService";
import styles from "./signup.module.css";

// Login form styled to match the signup theme exactly.
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Keep the local form data in sync with the inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Async submit that posts credentials to the login service.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setIsSubmitting(true);
      const response = await loginService(formData.email, formData.password);

      const token =
        response?.jwtToken ??
        response?.token ??
        response?.accessToken ??
        response?.data?.jwtToken ??
        response?.data?.token ??
        response?.data?.accessToken ??
        localStorage.getItem("token") ??
        null;

      if (!token) {
        setErrorMessage("Login succeeded, but token was not returned by backend.");
        return;
      }

      // Navigate to dashboard after successful login.
      navigate("/dashboard");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        "Login failed. Please check your credentials and try again.";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`page ${styles.container}`}>
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />

      <section className={styles.heroSection}>
        <img src={leafImg} className={styles.leafHero} alt="" aria-hidden="true" />

        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Welcome back</span>
          <h1 className={styles.brand}>SheCare</h1>
          <p className={styles.subtitle}>
            Sign in to continue your wellness journey with cycle tracking, mood insights, and personalized support.
          </p>
          <div className={styles.heroPills}>
            <span>Track your progress</span>
            <span>Stay connected with your routine</span>
          </div>
        </div>

        <div className={styles.illustrationShell}>
          <div className={styles.illustrationHalo} aria-hidden="true" />
          <img src={girlImg} alt="Relaxed woman illustration" className={styles.girlImage} />
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.card}>
          <img src={leafImg} className={styles.leafCard} alt="" aria-hidden="true" />

          <div className={styles.cardHeader}>
            <span className={styles.cardKicker}>Sign in</span>
            <h2>Welcome back</h2>
            <p>Enter your credentials to access your SheCare dashboard.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="hello@reallygreatsite.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          </form>

          <p className={styles.footer}>
            <button type="button" className={styles.linkButton} onClick={() => navigate("/verify-otp")}>Forgot password?</button>
          </p>
          <p className={styles.footer}>
            Don&apos;t have an account?{' '}
            <button type="button" className={styles.linkButton} onClick={() => navigate("/signup")}>Sign up</button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
