import styles from "./profileSetup.module.css";
import girlImage from "../assets/girl.png";
import leafImage from "../assets/leaf.png";

const healthGoals = [
  { value: "PCOS Management", icon: "🌸" },
  { value: "Period Tracking", icon: "🩸" },
  { value: "Pregnancy Care", icon: "🤰" },
  { value: "Weight Loss", icon: "🏃‍♀️" },
  { value: "General Wellness", icon: "🍃" },
];

const features = [
  { label: "Period Tracking", icon: "PT" },
  { label: "Pregnancy Care", icon: "PC" },
  { label: "Weight Loss", icon: "WL" },
  { label: "Wellness Tips", icon: "WT" },
];

export default function ProfileSetup() {
  return (
    <div className={styles.screen}>
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
            <div className={styles.innerForm}>
              <div className={styles.field}>
                <label htmlFor="age">Age</label>
                <input id="age" type="number" defaultValue="32" />
              </div>

              <div className={styles.dualFieldRow}>
                <div className={`${styles.field} ${styles.halfField}`}>
                  <label htmlFor="height">Height</label>
                  <input id="height" defaultValue="162 cm" />
                </div>
                <div className={`${styles.field} ${styles.halfField}`}>
                  <label htmlFor="weight">Weight</label>
                  <input id="weight" defaultValue="58 kg" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="city">City</label>
                <div className={styles.cityWrapper}>
                  <input id="city" defaultValue="New York" />
                  <span className={styles.cityIcon} aria-hidden />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="goal">Health Goal</label>
                <select id="goal" defaultValue={healthGoals[0].value}>
                  {healthGoals.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.icon} {goal.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="button" className={styles.continueBtn}>
                Continue
              </button>
              {/* <p className={styles.note}>You can update these details anytime.</p> */}
            </div>

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
