import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./verifyOtp.module.css";

import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";

function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flow = searchParams.get("flow");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  // Collect the digit, move focus forward, and keep OTP state synced.
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) inputsRef.current[index + 1]?.focus();
  };

  // Navigate once a full 4-digit code is entered.
  const handleVerify = () => {
    if (otp.join("").length < 4) return;
    navigate(flow === "forgot" ? "/reset-password" : "/profile-setup");
  };

  return (
    <div className={styles.otpContainer}>
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

        <div className={styles.otpInputs}>
          {otp.map((value, i) => (
            <input
              key={i}
              value={value}
              maxLength="1"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
        </div>

        <button className={styles.resend}>Resend Code</button>

        <button className={styles.verifyBtn} onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
