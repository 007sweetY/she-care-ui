import { useState } from "react";
import { useNavigate } from "react-router-dom";
import girlImg from "../assets/girl.png";
import leafImg from "../assets/leaf.png";
import styles from "./dashboard.module.css";

// Static data that drives the mood grid, feature cards, and nav bar.
const feelings = [
  { emoji: "😀", title: "Great" },
  { emoji: "😊", title: "Happy" },
  { emoji: "😌", title: "Calm" },
  { emoji: "😕", title: "Tired" },
  { emoji: "😎", title: "Excited" },
];

const featureCards = [
  { icon: "🌙", title: "Cycle Tracker", subtitle: "Track your cycle", path: "/cycle" },
  { icon: "✨", title: "Symptoms", subtitle: "Log what matters", path: "/symptoms" },
  { icon: "🍓", title: "Diet Plan", subtitle: "Nutrition nudges", path: "/diet-plan" },
  { icon: "🧘", title: "Yoga", subtitle: "Mood-balancing flows", path: "/yoga" },
];

const navItems = [
  { label: "Home", icon: "🏠", active: true },
  { label: "Journal", icon: "📖" },
  { label: "Stats", icon: "📈" },
  { label: "Profile", icon: "👤" },
];

const Dashboard = () => {
  // Keep track of which mood button is highlighted.
  const [selectedMood, setSelectedMood] = useState("Great");
  const navigate = useNavigate();

  return (
      <div className={`page ${styles.pageWrapper}`}>
        {/* Top welcome banner + avatar */}
        <div className={styles.welcomeCard}>
        <img src={leafImg} className={styles.headerLeafTop} alt="decorative leaf" />
        <img src={leafImg} className={styles.headerLeafBottom} alt="decorative leaf" />
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

      {/* Period prediction snapshot */}
      <div className={styles.periodCard}>
        <img src={leafImg} className={styles.periodLeaf} alt="decorative leaf" />
        <p className={styles.sectionTitle}>Next Period In</p>
        <div className={styles.periodCircle}>
          <span>15 Days</span>
        </div>
        <p className={styles.cycleDay}>Cycle Day: 12</p>
      </div>

      {/* Mood selector grid */}
      <div className={styles.section}>
        <img src={leafImg} className={styles.sectionLeafMoodLeft} alt="decorative leaf" />
        <img src={leafImg} className={styles.sectionLeafMoodRight} alt="decorative leaf" />
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

      {/* Mind & body quick tags */}
      <div className={styles.section}>
        <img src={leafImg} className={styles.sectionLeafMind} alt="decorative leaf" />
        <img src={leafImg} className={styles.sectionLeafMindAlt} alt="decorative leaf" />
        <p className={styles.sectionTitle}>Mind & Body</p>
        <div className={styles.mindBodyRow}>
          {["Calm", "Happy", "Stressed", "Tired"].map((state) => (
            <span key={state} className={styles.stateChip}>
              {state}
            </span>
          ))}
        </div>
      </div>

      {/* Feature shortcut grid */}
      <div className={styles.actionsGridWrapper}>
        <img src={leafImg} className={styles.sectionLeafActions} alt="decorative leaf" />
        <div className={styles.actionsGrid}>
          {featureCards.map((card) => (
            <button
              key={card.title}
              type="button"
              className={styles.actionCard}
              onClick={() => navigate(card.path)}
            >
              <div className={styles.actionIcon}>{card.icon}</div>
              <p className={styles.actionTitle}>{card.title}</p>
              <p className={styles.actionSubtitle}>{card.subtitle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Progress card showing hydration */}
      <div className={styles.progressCard}>
        <img src={leafImg} className={styles.sectionLeafProgress} alt="decorative leaf" />
        <div className={styles.progressHeader}>
          <p>Today’s Progress</p>
          <span>Water Intake</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "75%" }} />
        </div>
        <p className={styles.progressValue}>1.5L / 2L</p>
      </div>

      {/* CTA inviting a new entry */}
      <div className={styles.ctaWrapper}>
        <img src={leafImg} className={styles.sectionLeafCta} alt="decorative leaf" />
        <button className={styles.ctaButton}>+ Add Entry</button>
        <p className={styles.ctaMeta}>Mood · Water · Symptoms</p>
      </div>

      <img src={leafImg} className={styles.sectionLeafNav} alt="decorative leaf" />

      {/* Bottom navigation bar */}
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
