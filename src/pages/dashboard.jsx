import girlImg from "../assets/girl.png";
import styles from "./dashboard.module.css";

const feelings = [
  { emoji: "😀", title: "Great" },
  { emoji: "😊", title: "Happy" },
  { emoji: "😌", title: "Calm" },
  { emoji: "😕", title: "Tired" },
  { emoji: "😎", title: "Excited" },
];

const mindBodyStates = ["Calm", "Happy", "Stressed", "Tired"];

const actions = [
  { name: "Cycle Tracker", icon: "📊" },
  { name: "Symptoms", icon: "📋" },
  { name: "Diet Plan", icon: "🍓" },
  { name: "Yoga", icon: "🧘" },
];

const navItems = [
  { label: "Home", icon: "🏠" },
  { label: "Journal", icon: "📖" },
  { label: "Stats", icon: "📈" },
  { label: "Profile", icon: "👤" },
];

const Dashboard = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.welcomeCard}>
        <div>
          <p className={styles.welcomeTitle}>
            Welcome to <span>SheCare</span> 🌸
          </p>
          <p className={styles.welcomeSubtitle}>Your wellness journey continues</p>
        </div>
        <div className={styles.avatarRow}>
          <img src={girlImg} alt="SheCare Girl" />
          <div className={styles.avatarLabel}>SheCare Girl</div>
        </div>
      </div>

      <div className={styles.periodCard}>
        <p className={styles.periodLabel}>Next Period In</p>
        <div className={styles.periodCircle}>
          <span>15 Days</span>
        </div>
        <p className={styles.cycleDay}>Cycle Day: 12</p>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>How are you feeling today?</p>
        <div className={styles.feelingsRow}>
          {feelings.map((item) => (
            <button key={item.title} className={styles.feelingBtn}>
              <span className={styles.emoji} role="img" aria-label={item.title}>
                {item.emoji}
              </span>
              <span className={styles.emojiLabel}>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Mind & Body</p>
        <div className={styles.mindBodyRow}>
          {mindBodyStates.map((state) => (
            <span key={state} className={styles.stateChip}>
              {state}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <div key={action.name} className={styles.actionCard}>
            <div className={styles.actionIcon}>{action.icon}</div>
            <p>{action.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <p>Today’s Progress</p>
          <span>Water Intake</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "75%" }} />
        </div>
        <p className={styles.progressValue}>1.5L / 2L</p>
      </div>

      <nav className={styles.bottomNav}>
        {navItems.map((item) => (
          <button key={item.label} className={styles.navButton}>
            <span aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
