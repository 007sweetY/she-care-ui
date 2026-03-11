import styles from "./createPassword.module.css";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Password = () => {
  const navigate = useNavigate();

  // 👁️ eye toggle states
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={styles.container}>
      {/* Top indicators */}
      <div className={styles.dots}>
        <span className={styles.active}></span>
        <span></span>
        <span></span>
      </div>

      {/* Top right leaf */}
      <img src={leafImg} className={styles.leafTop} alt="leaf" />

      {/* Header */}
      <div className={styles.header}>
        <p>Sign in to continue</p>
        <h1>She Care</h1>
      </div>

      {/* Girl illustration */}
      <div className={styles.girlWrapper}>
        <img src={girlImg} alt="girl" />
      </div>

      {/* Brown card */}
      <div className={styles.card}>
        <img src={leafImg} className={styles.leafCard} alt="leaf" />

        <h1>Create Password</h1>

        {/* New Password */}
        <label>New Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showNew ? "text" : "password"}
            placeholder="Type New Password here"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Type Confirm Password here"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Bottom CTA bar */}
        <div className={styles.ctaBar}>
          <button>Confirm Password</button>
        </div>

        {/* Footer */}
        <p className={styles.footer}>
          <span onClick={() => navigate("/signup")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Password;
