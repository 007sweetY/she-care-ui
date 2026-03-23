import { useState } from "react";
import styles from "./yoga.module.css";

const progressStats = [
  { label: "Streak", value: "12 days" },
  { label: "Minutes this week", value: "84 min" },
  { label: "Sessions completed", value: "6" },
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
    illustration: "🌿",
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

const cyclePhases = [
  {
    name: "Menstrual",
    focus: "Soothing, restorative postures",
    days: "Days 1-5",
    energy: "Low energy recovery",
    rituals: ["Cocooned breathwork", "Gentle hip openers"],
  },
  {
    name: "Follicular",
    focus: "Fresh air and energizing flows",
    days: "Days 6-14",
    energy: "Rising vitality",
    rituals: ["Dynamic sun salutations", "Breath of fire warms"],
  },
  {
    name: "Luteal",
    focus: "Balance and grounding",
    days: "Days 15-28",
    energy: "Settled, introspective",
    rituals: ["Deep twists", "Calming exhale holds"],
  },
];

const therapyTracks = [
  {
    title: "Balance Bloom",
    days: "Day 1 - 7",
    focus: "Hormone reset + breath pacing",
    sessions: "5 sessions",
    progress: "60% complete",
  },
  {
    title: "Radiant Flow",
    days: "Day 8 - 14",
    focus: "Strength + cycle-friendly cardio",
    sessions: "7 sessions",
    progress: "30% complete",
  },
  {
    title: "Calm River",
    days: "Day 15 - 21",
    focus: "Guided relaxation + restorative holds",
    sessions: "6 sessions",
    progress: "0% complete",
  },
];

const routineBlocks = [
  {
    title: "Morning Spark",
    focus: "Wake-up flow + breath sync",
    actions: [
      "Cycle–aware sun salutations",
      "3 rounds of inhalation + hold",
      "Hydration reminder",
    ],
  },
  {
    title: "Lunchtime Reset",
    focus: "Midday reset to soften tension",
    actions: [
      "Seated hip openers",
      "Micro-meditation (2 min)",
      "Gentle core teaser",
    ],
  },
  {
    title: "Evening Drift",
    focus: "Wind-down stretch + guided relaxation",
    actions: [
      "Supported bridges",
      "Slow exhale-counting",
      "Voice-guided relaxation cue",
    ],
  },
];

const voiceCues = ["Inhale slowly…", "Hold…", "Exhale…", "Flow into the next pose…"];
const unlockOptions = ["Audio breathing cues", "Pose transitions", "Guided relaxation"];

const YogaHeader = ({ durationBadge, subtitle, onStart }) => (
  <div className={styles.heroCard}>
    <p className={styles.heroLabel}>SheCare</p>
    <h1 className={styles.heroTitle}>Cycle-Synced Yoga Engine ⭐</h1>
    <p className={styles.heroSubtitle}>{subtitle}</p>
    <div className={styles.heroActions}>
      <span className={styles.badge}>{durationBadge}</span>
      <button type="button" onClick={onStart} className={styles.ctaButton}>
        Start Today's Session
      </button>
    </div>
    <p className={styles.heroExtra}>
      Huge perceived value boost with audio breathing cues, pose transitions, and guided relaxation.
    </p>
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

const TherapyTrackCard = ({ track }) => (
  <article className={styles.therapyCard}>
    <p className={styles.therapyMeta}>{track.days}</p>
    <h3 className={styles.therapyTitle}>{track.title}</h3>
    <p className={styles.therapyFocus}>{track.focus}</p>
    <div className={styles.therapyFooter}>
      <span>{track.sessions}</span>
      <span className={styles.therapyProgress}>{track.progress}</span>
    </div>
  </article>
);

const RoutineBlock = ({ block }) => (
  <div className={styles.routineCard}>
    <p className={styles.routineSubtitle}>{block.title}</p>
    <p className={styles.routineFocus}>{block.focus}</p>
    <ul className={styles.routineList}>
      {block.actions.map((action) => (
        <li key={action}>{action}</li>
      ))}
    </ul>
  </div>
);

const VoiceGuidedMode = () => (
  <div className={styles.voiceCard}>
    <div>
      <p className={styles.routineSubtitle}>Voice-Guided Yoga Mode 🎧</p>
      <h3 className={styles.sessionTitle}>Unlock immersive guidance</h3>
      <p className={styles.voiceCopy}>
        Voice cues sync your breath, transitions, and restorative relaxations. Turn it on for
        hands-free alignment and mindful pacing.
      </p>
      <div className={styles.voiceCueList}>
        {voiceCues.map((cue) => (
          <span key={cue}>{cue}</span>
        ))}
      </div>
    </div>
    <div className={styles.unlockCard}>
      <p className={styles.unlockTitle}>Unlock:</p>
      <ul className={styles.unlockList}>
        {unlockOptions.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
      <button type="button" className={styles.unlockButton}>
        Enable Voice Mode
      </button>
    </div>
  </div>
);

const CyclePhaseCard = ({ phase, isActive, onSelect }) => {
  const pillClass = [styles.cycleChip, isActive ? styles.cycleChipActive : ""].join(" ");
  return (
    <button type="button" className={pillClass} onClick={() => onSelect(phase)}>
      <div className={styles.cycleName}>{phase.name}</div>
      <span className={styles.cycleDays}>{phase.days}</span>
    </button>
  );
};

function YogaPage() {
  const [activeCategory, setActiveCategory] = useState("Hormone Balance");
  const [activePhase, setActivePhase] = useState(cyclePhases[1]);

  return (
    <div className={styles.pageShell}>
      <div className={styles.pageContent}>
        <YogaHeader
          subtitle="Personalized routines for hormonal balance & wellness"
          durationBadge="12 min · Beginner"
          onStart={() => {
            /** placeholder */
          }}
        />

        <section className={styles.cycleSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Cycle-Synced Yoga Engine</h2>
            <span className={styles.sectionMeta}>Live phase support</span>
          </div>
          <div className={styles.cycleChipRow}>
            {cyclePhases.map((phase) => (
              <CyclePhaseCard
                key={phase.name}
                phase={phase}
                isActive={phase.name === activePhase.name}
                onSelect={setActivePhase}
              />
            ))}
          </div>
          <div className={styles.cycleDetailCard}>
            <div>
              <p className={styles.heroSubtitle}>{activePhase.focus}</p>
              <p className={styles.cycleEnergy}>{activePhase.energy}</p>
              <div className={styles.cycleRituals}>
                {activePhase.rituals.map((ritual) => (
                  <span key={ritual}>{ritual}</span>
                ))}
              </div>
            </div>
            <button type="button" className={styles.ctaButton}>
              Align to this phase
            </button>
          </div>
        </section>

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
            <h2 className={styles.sectionTitle}>21-Day Therapy Tracks</h2>
            <span className={styles.sectionMeta}>Structured support</span>
          </div>
          <div className={styles.therapyGrid}>
            {therapyTracks.map((track) => (
              <TherapyTrackCard key={track.title} track={track} />
            ))}
          </div>
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
            <h2 className={styles.sectionTitle}>Smart Daily Routine Generator</h2>
            <span className={styles.sectionMeta}>Plan your day</span>
          </div>
          <div className={styles.routineGrid}>
            {routineBlocks.map((block) => (
              <RoutineBlock key={block.title} block={block} />
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
            <h2 className={styles.sectionTitle}>Voice-Guided Yoga Mode</h2>
            <span className={styles.sectionMeta}>Audio companion</span>
          </div>
          <VoiceGuidedMode />
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

