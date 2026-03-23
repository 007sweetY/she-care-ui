
import { useState } from "react";
import styles from "./yoga.module.css";

const progressStats = [
  { label: "🔥 Streak", value: "12 days" },
  { label: "⏱️ Minutes this week", value: "84 min" },
  { label: "✅ Sessions completed", value: "6" },
];

const categoryList = [
  "PCOS Support",
  "Weight Loss",
  "Period Relief",
  "Stress Relief",
  "Hormone Balance",
  "Beginner Friendly",
];

const recommendedSessions = [
  {
    title: "Morning PCOS Flow",
    duration: "15 min",
    difficulty: "Beginner",
    illustration: "🧘‍♀️",
  },
  {
    title: "Lunar Stress Release",
    duration: "18 min",
    difficulty: "All Levels",
    illustration: "🌙",
  },
  {
    title: "Evening Hormone Reset",
    duration: "22 min",
    difficulty: "Intermediate",
    illustration: "🌟",
  },
];

const poseLibrary = [
  {
    name: "Bhujangasana",
    benefit: "Improves hormonal balance",
    duration: "30 sec",
    difficulty: "Beginner",
  },
  {
    name: "Utkatasana",
    benefit: "Builds lower body strength",
    duration: "45 sec",
    difficulty: "Intermediate",
  },
  {
    name: "Setu Bandhasana",
    benefit: "Supports menstrual comfort",
    duration: "40 sec",
    difficulty: "Beginner",
  },
  {
    name: "Viparita Karani",
    benefit: "Relieves fatigue & stress",
    duration: "1 min",
    difficulty: "All Levels",
  },
  {
    name: "Anjaneyasana",
    benefit: "Opens hips gently",
    duration: "35 sec",
    difficulty: "Beginner",
  },
  {
    name: "Janu Sirsasana",
    benefit: "Calms the nervous system",
    duration: "50 sec",
    difficulty: "Intermediate",
  },
];

const savedSessionList = [
  {
    title: "Sleep Relaxation Yoga",
    subtitle: "Wind down flow",
  },
  {
    title: "Evening Stretch Flow",
    subtitle: "Gentle mobility",
  },
  {
    title: "Hormone Reset Mini",
    subtitle: "Quick midday break",
  },
];

const YogaHeader = ({ durationBadge, subtitle, onStart }) => (
  <div className={styles.heroCard}>
    <p className={styles.heroLabel}>SheCare</p>
    <h1 className={styles.heroTitle}>Yoga for You Today</h1>
    <p className={styles.heroSubtitle}>{subtitle}</p>
    <div className={styles.heroActions}>
      <span className={styles.badge}>{durationBadge}</span>
      <button type="button" onClick={onStart} className={styles.ctaButton}>
        Start Today's Session
      </button>
    </div>
  </div>
);

const ProgressTracker = ({ stats }) => (
  <div className={styles.progressCard}>
    <div className={styles.progressHeader}>
      <h2 className={styles.sectionTitle}>Progress Tracker</h2>
      <span className={styles.sectionMeta}>Weekly</span>
    </div>
    <div className={styles.progressGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.progressItem}>
          <p className={styles.progressValue}>{stat.value}</p>
          <p className={styles.progressLabel}>{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const CategoryChips = ({ categories, active, onSelect }) => (
  <div className={styles.chipScroll}>
    {categories.map((category) => {
      const chipClass = [styles.chip, category === active ? styles.activeChip : ""].join(" ");
      return (
        <button
          key={category}
          type="button"
          className={chipClass}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      );
    })}
  </div>
);

const SessionCard = ({ session }) => (
  <div className={styles.sessionCard}>
    <div className={styles.sessionHeader}>
      <span className={styles.sessionIllustration}>{session.illustration}</span>
      <div>
        <p className={styles.sessionDifficulty}>{session.difficulty}</p>
        <h3 className={styles.sessionTitle}>{session.title}</h3>
      </div>
    </div>
    <div className={styles.sessionFooter}>
      <span>{session.duration}</span>
      <button className={styles.sessionStart} type="button">
        Start
      </button>
    </div>
  </div>
);

const PoseCard = ({ pose }) => (
  <article className={styles.poseCard}>
    <div className={styles.sessionHeader}>
      <h4 className={styles.sessionTitle}>{pose.name}</h4>
      <span className={styles.poseDifficulty}>{pose.difficulty}</span>
    </div>
    <p className={styles.poseBenefit}>{pose.benefit}</p>
    <p className={styles.poseDuration}>{pose.duration}</p>
  </article>
);

const SavedSessions = ({ sessions }) => (
  <div className={styles.savedScroll}>
    <div className={styles.savedRow}>
      {sessions.map((session) => (
        <div key={session.title} className={styles.savedCard}>
          <p className={styles.savedSubtitle}>{session.subtitle}</p>
          <h3 className={styles.savedTitle}>{session.title}</h3>
          <button type="button" className={styles.savedButton}>
            Continue
          </button>
        </div>
      ))}
    </div>
  </div>
);

function YogaPage() {
  const [activeCategory, setActiveCategory] = useState("Hormone Balance");

  return (
    <div className={styles.pageShell}>
      <div className={styles.pageContent}>
        <YogaHeader
          subtitle="Personalized routines for hormonal balance & wellness"
          durationBadge="12 min - Beginner"
          onStart={() => {
            /** placeholder */
          }}
        />

        <ProgressTracker stats={progressStats} />

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <span className={styles.sectionMeta}>Scroll</span>
          </div>
          <CategoryChips categories={categoryList} active={activeCategory} onSelect={setActiveCategory} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended for You</h2>
            <span className={styles.sectionMeta}>Fresh picks</span>
          </div>
          <div className={styles.sessionGrid}>
            {recommendedSessions.map((session) => (
              <SessionCard key={session.title} session={session} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pose Library</h2>
            <span className={styles.sectionMeta}>Quick reference</span>
          </div>
          <div className={styles.poseGrid}>
            {poseLibrary.map((pose) => (
              <PoseCard key={pose.name} pose={pose} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Saved Sessions</h2>
            <span className={styles.sectionMeta}>Your shelf</span>
          </div>
          <SavedSessions sessions={savedSessionList} />
        </section>
      </div>
    </div>
  );
}

export default YogaPage;
