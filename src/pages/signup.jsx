import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import styles from "./signup.module.css";
import signupService from "../services/signupService";

const Signup = () => {
  const navigate = useNavigate();
  // Track the form fields plus submission/error states.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Flag to show errors when the confirmation diverges.
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const arePasswordsMatching = () => password === confirmPassword;

  // Guarded signup call that pushes the user to OTP after success.
  const handleSignup = async () => {
    setErrorMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in every field to continue.");
      return;
    }

    if (!arePasswordsMatching()) {
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
        <input
          type="text"
          placeholder="Olivia Wilson"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="hello@reallygreatsite.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

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

        {errorMessage && !passwordsMismatch && (
          <p className={styles.error}>{errorMessage}</p>
        )}

        <button
          type="button"
          onClick={handleSignup}
          disabled={isSubmitting || passwordsMismatch}
        >
          {isSubmitting ? "Creating account" : "Continue"}
        </button>

        <p className={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
