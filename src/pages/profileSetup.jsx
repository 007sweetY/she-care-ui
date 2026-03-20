import { useState } from "react";
import girlImage from "../assets/girl.png";
import leafImage from "../assets/leaf.png";
import { completeProfile } from "../services/signupService";
import styles from "./profileSetup.module.css";

// will eventually fetch these from backend based on user's signup choices,
// but hardcoding for now to speed up development
const healthGoals = [
  { id: 1, value: "PCOS Management", icon: "🌸" },
  { id: 2, value: "Period Tracking", icon: "🩸" },
  { id: 3, value: "Pregnancy Care", icon: "🤰" },
  { id: 4, value: "Weight Loss", icon: "🏃‍♀️" },
  { id: 5, value: "General Wellness", icon: "🍃" },
];

const features = [
  { label: "Period Tracking", icon: "PT" },
  { label: "Pregnancy Care", icon: "PC" },
  { label: "Weight Loss", icon: "WL" },
  { label: "Wellness Tips", icon: "WT" },
];

export default function ProfileSetup() {
  // Capture the profile inputs before sending them to the service.
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    city: "",
    healthGoal: 1
  });

  // Mirror field updates into the local form state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit the profile data so backend can personalize the journey.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        city: formData.city,
        healthGoal: parseInt(formData.healthGoal)
      };
      const response = await completeProfile(payload);
      console.log("Profile completed:", response);
      // Handle success, maybe navigate to next page
    } catch (error) {
      console.error("Error completing profile:", error);
      // Handle error
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
            <p>Let's personalize your wellness journey.</p>
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
                  <input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                </div>

                <div className={styles.dualFieldRow}>
                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="height">Height</label>
                    <input id="height" name="height" value={formData.height} onChange={handleChange} required />
                  </div>
                  <div className={`${styles.field} ${styles.halfField}`}>
                    <label htmlFor="weight">Weight</label>
                    <input id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="city">City</label>
                  <div className={styles.cityWrapper}>
                    <input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    <span className={styles.cityIcon} aria-hidden />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="healthGoal">Health Goal</label>
                  <select id="healthGoal" name="healthGoal" value={formData.healthGoal} onChange={handleChange}>
                    {healthGoals.map((goal) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.icon} {goal.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.continueBtn}>
                  Continue
                </button>
                {/* <p className={styles.note}>You can update these details anytime.</p> */}
              </div>
            </form>

            {/* <div className={styles.featureRow}>
              {features.map((feature) => (
                <div key={feature.label} className={styles.featureCard}>
                  <div className={styles.featureIcon} aria-hidden="true">
                    {feature.icon}
                  </div>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div> */}
          </div>
        </article>
      </div>
    </div>
  );
}
