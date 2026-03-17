import { useState } from "react";
import girlImg from "../assets/girl.png";
import styles from "./dashboard.module.css";

const feelings = [
  { emoji: "😀", title: "Great" },
  { emoji: "😊", title: "Happy" },
  { emoji: "😌", title: "Calm" },
  { emoji: "😕", title: "Tired" },
  { emoji: "😎", title: "Excited" },
];

const featureCards = [
  { icon: "🌙", title: "Cycle Tracker", subtitle: "Track your cycle" },
  { icon: "✨", title: "Symptoms", subtitle: "Log what matters" },
  { icon: "🍓", title: "Diet Plan", subtitle: "Nutrition nudges" },
  { icon: "🧘", title: "Yoga", subtitle: "Mood-balancing flows" },
];

const navItems = [
  { label: "Home", icon: "🏠", active: true },
  { label: "Journal", icon: "📖" },
  { label: "Stats", icon: "📈" },
  { label: "Profile", icon: "👤" },
];

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState("Great");

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
        <p className={styles.sectionTitle}>Next Period In</p>
        <div className={styles.periodCircle}>
          <span>15 Days</span>
        </div>
        <p className={styles.cycleDay}>Cycle Day: 12</p>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>How are you feeling today?</p>
        <div className={styles.feelingsRow}>
          {feelings.map((item) => {
            const isActive = selectedMood === item.title;
            return (
              <button
                key={item.title}
                className={`${styles.feelingBtn} ${isActive ? styles.activeMood : ""}`}
                onClick={() => setSelectedMood(item.title)}
                aria-pressed={isActive}
              >
                <span className={styles.emoji} role="img" aria-label={item.title}>
                  {item.emoji}
                </span>
                <span className={styles.emojiLabel}>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Mind & Body</p>
        <div className={styles.mindBodyRow}>
          {["Calm", "Happy", "Stressed", "Tired"].map((state) => (
            <span key={state} className={styles.stateChip}>
              {state}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actionsGrid}>
        {featureCards.map((card) => (
          <div key={card.title} className={styles.actionCard}>
            <div className={styles.actionIcon}>{card.icon}</div>
            <p className={styles.actionTitle}>{card.title}</p>
            <p className={styles.actionSubtitle}>{card.subtitle}</p>
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

      <div className={styles.ctaWrapper}>
        <button className={styles.ctaButton}>+ Add Entry</button>
        <p className={styles.ctaMeta}>Mood · Water · Symptoms</p>
      </div>

      <nav className={styles.bottomNav}>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`${styles.navButton} ${item.active ? styles.navActive : ""}`}
          >
            <span aria-hidden>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
