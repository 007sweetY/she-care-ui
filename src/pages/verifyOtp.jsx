import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./verifyOtp.module.css";

import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import { verifyOtpService } from "../services/signupService";

function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flow = searchParams.get("flow");
  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputsRef = useRef([]);

  // Collect the digit, move focus forward, and keep OTP state synced.
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];

    if (!value) {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    setErrorMessage("");
    setSuccessMessage("");

    if (otpValue.length < 4) {
      setErrorMessage("Please enter the 4-digit OTP.");
      return;
    }

    if (!email) {
      setErrorMessage("Missing email. Please sign up again and retry OTP verification.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await verifyOtpService(email, otpValue);

      const token =
        response?.jwtToken ??
        response?.token ??
        response?.accessToken ??
        response?.data?.jwtToken ??
        response?.data?.token ??
        response?.data?.accessToken ??
        null;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (flow !== "forgot" && !token) {
        setErrorMessage("OTP verified, but auth token was not returned by backend.");
        return;
      }

      setSuccessMessage("Email verified successfully. You are now authenticated.");

      setTimeout(() => {
        navigate(flow === "forgot" ? "/createPassword" : "/profile-setup");
      }, 800);
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        "OTP verification failed. Please try again.";

      setErrorMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`page ${styles.otpContainer}`}>
      {/* DECORATIVE LEAVES */}
      <img src={leafImg} alt="leaf" className={styles.leafTopRight} />
      <img src={leafImg} alt="leaf" className={styles.leafMidLeft} />

      <p className={styles.verifyText}>Verify Your Email</p>
      <h1 className={styles.brand}>She Care</h1>

      {/* CARD */}
      <div className={styles.otpCard}>
        <img src={girlImg} alt="girl" className={styles.girl} />
        <img src={leafImg} alt="leaf" className={styles.leafbelow} />
        <h2>
          Account <br /> Verification
        </h2>

        <p className={styles.subtitle}>
          Please enter the 4 digit code <br />sent to your Email
        </p>
        {email && <p className={styles.emailText}>{email}</p>}

        <div className={styles.otpInputs}>
          {otp.map((value, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              value={value}
              maxLength="1"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        {successMessage && <p className={styles.successText}>{successMessage}</p>}

        <button className={styles.resend}>Resend Code</button>

        <button className={styles.verifyBtn} onClick={handleVerify} disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
