import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImage from "../assets/girl.png";
import leafImage from "../assets/leaf.png";
import { completeProfile } from "../services/signupService";
import styles from "./profileSetup.module.css";

const healthGoals = [
  { id: 1, value: "PCOS Management", icon: "PC" },
  { id: 2, value: "Period Tracking", icon: "PT" },
  { id: 3, value: "Pregnancy Care", icon: "PR" },
  { id: 4, value: "Weight Loss", icon: "WL" },
  { id: 5, value: "General Wellness", icon: "GW" }
];

const sexOptions = [
  { id: 1, label: "Female" },
  { id: 2, label: "Male" },
  { id: 3, label: "Other" }
];

const bloodGroupOptions = [
  { id: 1, label: "A+" },
  { id: 2, label: "A-" },
  { id: 3, label: "B+" },
  { id: 4, label: "B-" },
  { id: 5, label: "AB+" },
  { id: 6, label: "AB-" },
  { id: 7, label: "O+" },
  { id: 8, label: "O-" }
];

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    city: "",
    healthGoal: 1,
    sex: 1,
    bloodGroup: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      age: Number.parseInt(formData.age, 10),
      height: Number.parseInt(formData.height, 10),
      weight: Number.parseInt(formData.weight, 10),
      city: formData.city.trim(),
      healthGoal: Number.parseInt(formData.healthGoal, 10),
      sex: Number.parseInt(formData.sex, 10),
      bloodGroup: Number.parseInt(formData.bloodGroup, 10)
    };

    try {
      setIsSubmitting(true);
      const response = await completeProfile(payload);
      console.log("Profile completed:", response);
      setSuccessMessage("Profile setup completed successfully.");
      navigate("/dashboard");
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ??
        error?.response?.data?.error ??
        "Error completing profile. Please try again.";
      setErrorMessage(backendMessage);
      console.error("Error completing profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`page ${styles.screen}`}>
      <div className={styles.content}>
        <section className={styles.topSection}>
          <img src={leafImage} alt="" className={styles.headerLeaf} />
          <div className={styles.greeting}>
            <h1>
              Welcome to <span className={styles.brand}>SheCare</span>
            </h1>
            <p>Let&apos;s personalize your wellness journey.</p>
          </div>
        </section>

        <div className={styles.illustrationOverlap}>
          <img
            src={girlImage}
            alt="Calm woman illustration"
            className={styles.illustrationImage}
          />
        </div>

        <article className={styles.cardWrapper}>
          <img src={leafImage} alt="" className={styles.cardLeaf} />
          <div className={styles.profileCard}>
            <header className={styles.cardHeader}>
              <h2>Complete Your Profile</h2>
              <p>Fill in the details below to personalize your experience.</p>
            </header>
            <form onSubmit={handleSubmit}>
              <div className={styles.innerForm}>
                <div className={styles.field}>
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.dualFieldRow}>
                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="height">Height (cm)</label>
                    <input
                      id="height"
                      name="height"
                      type="number"
                      min="1"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="1"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="city">City</label>
                  <div className={styles.cityWrapper}>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <span className={styles.cityIcon} aria-hidden />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="healthGoal">Health Goal</label>
                  <select
                    id="healthGoal"
                    name="healthGoal"
                    value={formData.healthGoal}
                    onChange={handleChange}
                  >
                    {healthGoals.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.icon} {goal.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.dualFieldRow}>
                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="sex">Sex</label>
                    <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                      {sexOptions.map((sex) => (
                        <option key={sex.id} value={sex.id}>
                          {sex.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    >
                      {bloodGroupOptions.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
                {successMessage && <p className={styles.successText}>{successMessage}</p>}
                <button type="submit" className={styles.continueBtn} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
}
