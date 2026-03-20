import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import { loginService } from "../services/signupService";
import styles from "./login.module.css";

// Simple login form that calls the shared auth service.
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
    try {
      const response = await loginService(formData.email, formData.password);
      console.log("Login successful:", response);
      // Navigate to profile setup or dashboard
      navigate("/profile-setup");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, show message
    }
  };

  return (
    <div className={`page ${styles.container}`}>

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

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@reallygreatsite.com" required />

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="******" required />

          {/* Bottom CTA bar */}
          <div className={styles.ctaBar}>
            <button type="submit">Login</button>
          </div>
        </form>
        
        <p className={styles.forgot}>
          <span onClick={() => navigate("/verify-otp")}>
          Forgot Password?
          </span>
          </p>

          <h1>test for sure</h1>

        <p className={styles.footer}>
                  <span onClick={() => navigate("/signup")}>Sign in</span>
                </p>
      </div>
    </div>
  );
};

export default Login;
