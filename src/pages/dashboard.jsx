import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { getDashboardSummary } from "../services/dashboardService";

const moodOptions = ["Great", "Good", "Okay", "Low", "Stressed"];

const quickActions = [
  { title: "Cycle", subtitle: "Track cycle details", path: "/cycle" },
  { title: "Symptoms", subtitle: "Log your symptoms", path: "/symptoms" },
  { title: "Diet", subtitle: "See meal guidance", path: "/diet-plan" },
  { title: "Yoga", subtitle: "Start a routine", path: "/yoga" }
];

const navItems = [
  { label: "Home", path: "/dashboard" },
  { label: "Cycle", path: "/cycle" },
  { label: "Journal", path: "/symptoms" },
  { label: "Profile", path: "/profile-setup" }
];

const fallbackSummary = {
  userName: "SheCare Member",
  cycle: {
    nextPeriodInDays: 15,
    cycleDay: 12
  },
  hydration: {
    current: 1.5,
    goal: 2.0
  },
  pinned: [
    { id: "sleep", label: "Sleep", value: "7h 20m", note: "Last night" },
    { id: "steps", label: "Activity", value: "6,420", note: "Steps" },
    { id: "heart", label: "Resting HR", value: "71 bpm", note: "Average" },
    { id: "cycle", label: "Cycle", value: "Day 12", note: "Luteal phase" }
  ],
  highlights: [
    {
      id: "h1",
      title: "Resting Heart Rate",
      detail: "3 bpm lower than last week",
      trend: "improving"
    },
    {
      id: "h2",
      title: "Sleep Consistency",
      detail: "5 of 7 nights over 7 hours",
      trend: "stable"
    },
    {
      id: "h3",
      title: "Hydration",
      detail: "75% of daily goal by evening",
      trend: "improving"
    }
  ],
  trends: [
    { id: "t1", label: "Energy", value: "+12%" },
    { id: "t2", label: "Sleep", value: "+8%" },
    { id: "t3", label: "Stress", value: "-10%" }
  ]
};

const normalizeSummary = (data) => {
  if (!data || typeof data !== "object") {
    return fallbackSummary;
  }

  return {
    userName: data.userName ?? data.name ?? fallbackSummary.userName,
    cycle: {
      nextPeriodInDays:
        data?.cycle?.nextPeriodInDays ?? data.nextPeriodInDays ?? fallbackSummary.cycle.nextPeriodInDays,
      cycleDay: data?.cycle?.cycleDay ?? data.cycleDay ?? fallbackSummary.cycle.cycleDay
    },
    hydration: {
      current: data?.hydration?.current ?? data.waterIntake ?? fallbackSummary.hydration.current,
      goal: data?.hydration?.goal ?? data.waterGoal ?? fallbackSummary.hydration.goal
    },
    pinned: Array.isArray(data.pinned) && data.pinned.length > 0 ? data.pinned : fallbackSummary.pinned,
    highlights:
      Array.isArray(data.highlights) && data.highlights.length > 0
        ? data.highlights
        : fallbackSummary.highlights,
    trends: Array.isArray(data.trends) && data.trends.length > 0 ? data.trends : fallbackSummary.trends
  };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState("Great");
  const [summary, setSummary] = useState(fallbackSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    const loadSummary = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const data = await getDashboardSummary();

        if (!active) {
          return;
        }

        setSummary(normalizeSummary(data));
      } catch (error) {
        if (!active) {
          return;
        }

        setSummary(fallbackSummary);
        setLoadError("Live dashboard data is temporarily unavailable.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      active = false;
    };
  }, []);

  const hydrationPercent = useMemo(() => {
    const safeGoal = Number(summary?.hydration?.goal ?? 0);
    const safeCurrent = Number(summary?.hydration?.current ?? 0);

    if (safeGoal <= 0) {
      return 0;
    }

    return Math.min(100, Math.round((safeCurrent / safeGoal) * 100));
  }, [summary]);

  const handleAddEntry = () => {
    navigate("/add-entry");
  };

  return (
    <div className={`page ${styles.pageWrapper}`}>
      <header className={styles.topBar}>
        <div>
          <p className={styles.kicker}>Summary</p>
          <h1 className={styles.title}>Hello, {summary.userName}</h1>
          <p className={styles.subtitle}>Your health overview for today.</p>
        </div>
        <div className={styles.datePill}>{new Date().toLocaleDateString()}</div>
      </header>

      {loadError && <p className={styles.infoBanner}>{loadError}</p>}
      {isLoading && <p className={styles.infoBanner}>Loading dashboard...</p>}

      <section className={styles.primaryCard}>
        <div>
          <p className={styles.cardLabel}>Cycle Status</p>
          <h2 className={styles.metric}>{summary.cycle.nextPeriodInDays} days</h2>
          <p className={styles.metricMeta}>Next period estimate</p>
          <p className={styles.metricHint}>Cycle day {summary.cycle.cycleDay}</p>
        </div>
        <div className={styles.circleMeter}>
          <span>{summary.cycle.cycleDay}</span>
          <small>day</small>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Pinned Metrics</h3>
          <span>Today</span>
        </div>
        <div className={styles.pinnedGrid}>
          {summary.pinned.map((item) => (
            <article key={item.id} className={styles.pinnedItem}>
              <p className={styles.pinnedLabel}>{item.label}</p>
              <p className={styles.pinnedValue}>{item.value}</p>
              <p className={styles.pinnedNote}>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Highlights</h3>
          <span>Trends</span>
        </div>
        <div className={styles.highlightList}>
          {summary.highlights.map((item) => (
            <article key={item.id} className={styles.highlightItem}>
              <div>
                <p className={styles.highlightTitle}>{item.title}</p>
                <p className={styles.highlightDetail}>{item.detail}</p>
              </div>
              <span
                className={`${styles.trendBadge} ${
                  item.trend === "improving"
                    ? styles.trendUp
                    : item.trend === "stable"
                    ? styles.trendStable
                    : styles.trendDown
                }`}
              >
                {item.trend}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Trend Snapshot</h3>
          <span>7 days</span>
        </div>
        <div className={styles.moodRow}>
          {summary.trends.map((item) => (
            <span key={item.id} className={styles.trendBadge}>
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Hydration</h3>
          <span>{hydrationPercent}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${hydrationPercent}%` }} />
        </div>
        <p className={styles.progressLabel}>
          {summary.hydration.current}L / {summary.hydration.goal}L
        </p>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>How are you feeling?</h3>
          <span>Quick check-in</span>
        </div>
        <div className={styles.moodRow}>
          {moodOptions.map((mood) => (
            <button
              key={mood}
              type="button"
              className={`${styles.moodButton} ${selectedMood === mood ? styles.moodActive : ""}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.actionsSection}>
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            className={styles.actionCard}
            onClick={() => navigate(action.path)}
          >
            <p className={styles.actionTitle}>{action.title}</p>
            <p className={styles.actionSubtitle}>{action.subtitle}</p>
          </button>
        ))}
      </section>

      <div className={styles.ctaRow}>
        <button type="button" className={styles.primaryButton} onClick={handleAddEntry}>
          Add Daily Entry
        </button>
      </div>

      <nav className={styles.bottomNav}>
        {navItems.map((item) => {
          const active = item.path === "/dashboard";
          return (
            <button
              key={item.label}
              type="button"
              className={`${styles.navButton} ${active ? styles.navActive : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Dashboard;
