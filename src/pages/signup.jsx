import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";

const Signup = () => {
  const navigate = useNavigate(); // ✅ hook placed correctly

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
        <input type="password" placeholder="******" />

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
