import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import styles from "./signup.module.css";

const Password = () => {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={`page ${styles.container}`}>
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />

      <section className={styles.heroSection}>
        <img src={leafImg} className={styles.leafHero} alt="" aria-hidden="true" />

        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Secure your account</span>
          <h1 className={styles.brand}>SheCare</h1>
          <p className={styles.subtitle}>
            Set a strong password to protect your SheCare journey and keep your data secure.
          </p>
          <div className={styles.heroPills}>
            <span>Strong security</span>
            <span>One secure login</span>
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
            <span className={styles.cardKicker}>Create password</span>
            <h2>Protect your account</h2>
            <p>Choose a secure password that meets the SheCare standard.</p>
          </div>

          <div className={styles.field}>
            <label htmlFor="new-password">New Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="new-password"
                type={showNew ? "text" : "password"}
                placeholder="Type new password here"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowNew(!showNew)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Type confirm password here"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button className={styles.submitButton} type="button">
            Confirm Password
          </button>

          <p className={styles.footer}>
            Already have an account?{' '}
            <button type="button" className={styles.linkButton} onClick={() => navigate("/login")}>Sign in</button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Password;
