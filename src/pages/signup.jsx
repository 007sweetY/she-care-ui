import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import styles from "./signup.module.css";
import signupService from "../services/signupService";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in every field to continue.");
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signupService(name, email, password);
      navigate("/verify-otp?flow=signup");
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      setErrorMessage(backendMessage ?? "Signup failed. Please try again.");
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
          <span className={styles.eyebrow}>Welcome to</span>
          <h1 className={styles.brand}>SheCare</h1>
          <p className={styles.subtitle}>
            A softer, calmer place to track your cycle, build healthy routines,
            and feel more in control of your care.
          </p>
          <div className={styles.heroPills}>
            <span>Create your account</span>
            <span>Start your wellness journey</span>
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
            <span className={styles.cardKicker}>Create account</span>
            <h2>Sign up</h2>
            <p>Join SheCare with a few details and continue to verification.</p>
          </div>

          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.field}>
              <label htmlFor="signup-name">Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Olivia Wilson"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="hello@reallygreatsite.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className={styles.inputGrid}>
              <div className={styles.field}>
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            {passwordsMismatch && (
              <p className={styles.error}>Passwords do not match.</p>
            )}

            {errorMessage && !passwordsMismatch && (
              <p className={styles.error}>{errorMessage}</p>
            )}

            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting || passwordsMismatch}
            >
              {isSubmitting ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{" "}
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
