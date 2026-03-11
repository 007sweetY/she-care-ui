import styles from "./login.module.css";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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

        <h1>Log in</h1>

        <label>Email</label>
        <input type="email" placeholder="hello@reallygreatsite.com" />

        <label>Password</label>
        <input type="password" placeholder="******" />

        {/* Bottom CTA bar */}
        <div className={styles.ctaBar}>
          <button>Login</button>
        </div>
        
        <p className={styles.forgot}>
          <span onClick={() => navigate("/verify-otp")}>
          Forgot Password?
          </span>
          </p>

        <p className={styles.footer}>
                  <span onClick={() => navigate("/signup")}>Sign in</span>
                </p>
      </div>
    </div>
  );
};

export default Login;
