import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import styles from "./signup.module.css";
  
const Signup = () => {
  const navigate = useNavigate(); // âœ… hook placed correctly
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className={styles.container}>
      
      {/* Top-right leaf */}
      <img src={leafImg} className={styles.leafTopRight} alt="leaf" />

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.welcome}>Welcome to</p>
        <h1>SheCare</h1>
      </div>

      {/* Girl illustration (NOT avatar) */}
      <div className={styles.girlWrapper}>
        <img src={girlImg} alt="girl" />
      </div>

      {/* Brown section */}
      <div className={styles.card}>
        
        {/* Leaf beside "Sign Up" */}
        <img src={leafImg} className={styles.leafCard} alt="leaf" />

        <h2>Sign Up</h2>

        <label>Name</label>
        <input type="text" placeholder="Olivia Wilson" />

        <label>Email</label>
        <input type="email" placeholder="hello@reallygreatsite.com" />

        <label>Password</label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="******"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        {passwordsMismatch && (
          <p className={styles.error}>Passwords do not match.</p>
        )}

        <button>Continue</button>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
