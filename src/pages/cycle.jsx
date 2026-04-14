import { useEffect, useMemo, useState } from "react";
import styles from "./cycle.module.css";
import { useCycleData } from "../hooks/useCycleData";
import { saveCycleDays } from "../services/cycleService";

const PHASE_OPTIONS = [
  { label: "Period", value: 0 },
  { label: "Follicular", value: 1 },
  { label: "Ovulation", value: 2 },
  { label: "Luteal", value: 3 },
];

const MODE_OPTIONS = [
  { label: "Trying to Conceive", value: "TryingToConceive" },
  { label: "Avoid Pregnancy", value: "AvoidPregnancy" },
  { label: "Track Health Only", value: "TrackHealthOnly" },
];

const MODE_STORAGE_KEY = "shecareConceptionMode";
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MODE_SUGGESTIONS = {
  TryingToConceive: {
    title: "Trying to Conceive Guidance",
    points: ["Plan around fertile window days", "Prioritize sleep, hydration, and nutrition", "Track ovulation changes daily"],
  },
  AvoidPregnancy: {
    title: "Avoid Pregnancy Guidance",
    points: ["Avoid unprotected intercourse in fertile window", "Set reminders before predicted ovulation", "Monitor cycle shifts for safer planning"],
  },
  TrackHealthOnly: {
    title: "Track Health Guidance",
    points: ["Log cycle days consistently", "Watch regularity and symptom patterns", "Switch mode in Symptoms page for targeted guidance"],
  },
};

const formatDate = (value) => {
  if (!value) return "Not enough cycle data yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not enough cycle data yet";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatTimeAgo = () => "just now";
const getSavedMode = () => localStorage.getItem(MODE_STORAGE_KEY) ?? "TrackHealthOnly";

const getDatesInRange = (startDate, endDate) => {
  if (!startDate || !endDate) return new Set();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return new Set();

  const bucket = new Set();
  const cursor = new Date(start);
  while (cursor <= end) {
    bucket.add(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return bucket;
};

const isInvalidCycleLength = (value) => typeof value !== "number" || value <= 0;

const getChancePercent = (value) => {
  if (!value) return 0;
  if (value.toLowerCase() === "high") return 76;
  if (value.toLowerCase() === "medium") return 52;
  if (value.toLowerCase() === "low") return 24;
  return 0;
};

const getBadgeTone = (value) => {
  if (!value) return styles.badgeMuted;
  const text = String(value).toLowerCase();
  if (text.includes("high") || text.includes("on track") || text.includes("regular")) return styles.badgeSuccess;
  if (text.includes("medium") || text.includes("moderate")) return styles.badgeWarning;
  if (text.includes("low") || text.includes("late") || text.includes("irregular")) return styles.badgeDanger;
  return styles.badgeMuted;
};

const icon = {
  calendar: "📅",
  ovulation: "🩺",
  fertile: "🌱",
  shield: "🛡️",
  alert: "⚠️",
  pulse: "💓",
  clock: "🕒",
  sync: "🔄",
  target: "🎯",
};

const SkeletonCard = ({ lines = 3 }) => (
  <div className={`${styles.card} ${styles.skeletonCard}`} aria-hidden="true">
    <div className={styles.skeletonTitle} />
    {Array.from({ length: lines }).map((_, idx) => (
      <div key={idx} className={styles.skeletonLine} />
    ))}
  </div>
);

const CyclePage = () => {
  const [selectedDatesByMonth, setSelectedDatesByMonth] = useState({});
  const [phase, setPhase] = useState(0);
  const [mode, setMode] = useState(getSavedMode());
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");
  const [savingCycle, setSavingCycle] = useState(false);
  const [monthOffset, setMonthOffset] = useState(0);
  const [riskExpanded, setRiskExpanded] = useState(false);

  // Future-ready metadata shape for backend expansion (do not submit yet).
  const [futureEntryFields] = useState({
    symptoms: [],
    mood: "",
    notes: "",
    flowIntensity: 0,
  });

  const { nextPeriod, ovulationWindow, fertileWindow, latePeriod, irregular, riskAnalysis, pregnancyChance, notifications, hasError, loading, refreshCycleData } =
    useCycleData();

  useEffect(() => {
    const updateFromStorage = () => setMode(getSavedMode());
    window.addEventListener("storage", updateFromStorage);
    window.addEventListener("focus", updateFromStorage);
    return () => {
      window.removeEventListener("storage", updateFromStorage);
      window.removeEventListener("focus", updateFromStorage);
    };
  }, []);

  const visibleMonth = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  }, [monthOffset]);

  const activeMonthKey = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, "0")}`;
  const selectedDates = selectedDatesByMonth[activeMonthKey] ?? [];

  const monthLabel = visibleMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
  const totalDays = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();

  const fertileMarkers = useMemo(
    () => getDatesInRange(fertileWindow?.fertileWindowStart, fertileWindow?.fertileWindowEnd),
    [fertileWindow]
  );

  const ovulationDateKey = useMemo(() => {
    if (!ovulationWindow?.predictedOvulationDate) return "";
    const raw = new Date(ovulationWindow.predictedOvulationDate);
    if (Number.isNaN(raw.getTime())) return "";
    return raw.toISOString().slice(0, 10);
  }, [ovulationWindow]);

  const todayDateKey = new Date().toISOString().slice(0, 10);
  const pregnancyChancePercent = getChancePercent(pregnancyChance?.pregnancyChance);
  const shouldShowPregnancyCard = mode === "TryingToConceive" || mode === "AvoidPregnancy";
  const suggestion = MODE_SUGGESTIONS[mode] ?? MODE_SUGGESTIONS.TrackHealthOnly;

  const toggleDateSelection = (day) => {
    const dateKey = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day).toISOString().slice(0, 10);
    setSaveSuccess("");
    setSaveError("");
    setSelectedDatesByMonth((prev) => {
      const monthDates = prev[activeMonthKey] ?? [];
      const updatedMonthDates = monthDates.includes(dateKey)
        ? monthDates.filter((item) => item !== dateKey)
        : [...monthDates, dateKey];
      return { ...prev, [activeMonthKey]: updatedMonthDates };
    });
  };

  const handleSaveCycle = async () => {
    if (!selectedDates.length) {
      setSaveError("Select at least one date.");
      return;
    }

    setSavingCycle(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const payload = {
        dates: selectedDates.map((date) => new Date(`${date}T00:00:00.000Z`).toISOString()),
        phase,
      };

      await saveCycleDays(payload);
      setSaveSuccess("Cycle days saved successfully ✅");
      setSelectedDatesByMonth((prev) => ({ ...prev, [activeMonthKey]: [] }));
      await refreshCycleData();
    } catch {
      setSaveError("Unable to fetch cycle insights");
    } finally {
      setSavingCycle(false);
    }
  };

  const days = Array.from({ length: firstDay + totalDays }, (_, index) => {
    if (index < firstDay) return null;
    return index - firstDay + 1;
  });

  return (
    <div className={`page ${styles.pageWrapper}`}>
      <section className={styles.heroHeader}>
        <div>
          <h1 className={styles.pageTitle}>Cycle Insights</h1>
          <p className={styles.pageSubtitle}>A calm, predictive view of your cycle health.</p>
          <p className={styles.lastSync}>
            <span>{icon.clock}</span> Last synced {formatTimeAgo()}
          </p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.modeBadge}>
            Mode: {MODE_OPTIONS.find((item) => item.value === mode)?.label ?? "Track Health Only"}
          </span>
          {loading ? (
            <span className={styles.refreshing}>
              <span className={styles.spinner} /> {icon.sync} Syncing
            </span>
          ) : null}
        </div>
      </section>
      <div className={styles.divider} />

      {(hasError || saveError) && (
        <div className={styles.errorBanner} role="alert">
          <div>
            <p className={styles.errorTitle}>Unable to load cycle insights</p>
            <p className={styles.errorText}>Try again later</p>
          </div>
          <button type="button" className={styles.retryButton} onClick={refreshCycleData}>
            Retry
          </button>
        </div>
      )}
      {futureEntryFields && <div className={styles.hiddenSupport} aria-hidden="true" />}

      <section className={styles.calendarCard}>
        <h2 className={styles.sectionTitle}>Interactive Calendar</h2>
        {loading ? (
          <div className={styles.calendarSkeleton} />
        ) : (
          <>
            <div className={styles.calendarTop}>
              <button type="button" className={styles.monthButton} onClick={() => setMonthOffset((prev) => prev - 1)}>
                Prev
              </button>
              <p className={styles.monthLabel}>{monthLabel}</p>
              <button type="button" className={styles.monthButton} onClick={() => setMonthOffset((prev) => prev + 1)}>
                Next
              </button>
            </div>

            <div className={styles.gridLabels}>
              {WEEK_DAYS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {days.map((day, index) => {
                if (!day) return <div key={`empty-${index}`} className={styles.emptyCell} />;
                const dateKey = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day).toISOString().slice(0, 10);
                const selected = selectedDates.includes(dateKey);
                const fertile = fertileMarkers.has(dateKey);
                const ovulation = ovulationDateKey === dateKey;
                const today = todayDateKey === dateKey;
                const isPeriod = phase === 0 && selected;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={`${styles.dayButton} ${selected ? styles.daySelected : ""} ${
                      fertile ? styles.dayFertile : ""
                    } ${ovulation ? styles.dayOvulation : ""} ${today ? styles.dayToday : ""} ${
                      isPeriod ? styles.dayPeriod : ""
                    }`}
                    onClick={() => toggleDateSelection(day)}
                    aria-label={`Select ${day} ${monthLabel}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}
        <div className={styles.legend}>
          <span><i className={`${styles.dot} ${styles.periodDot}`} /> Period</span>
          <span><i className={`${styles.dot} ${styles.fertileDot}`} /> Fertile Window</span>
          <span><i className={`${styles.dot} ${styles.ovulationDot}`} /> Ovulation</span>
        </div>

        <div className={styles.actionsRow}>
          <select className={styles.select} value={phase} onChange={(event) => setPhase(Number(event.target.value))}>
            {PHASE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button type="button" className={styles.primaryButton} onClick={handleSaveCycle} disabled={savingCycle}>
            {savingCycle ? "Saving..." : "Save Cycle"}
          </button>
        </div>
        {saveSuccess && <p className={styles.successText}>{saveSuccess}</p>}
      </section>

      <section className={styles.sectionGroup}>
        <h2 className={styles.groupTitle}>Personalized Suggestions</h2>
        <article className={styles.card}>
          <p className={styles.cardIcon}>{icon.target}</p>
          <h3 className={styles.cardTitle}>{suggestion.title}</h3>
          <ul className={styles.riskList}>
            {suggestion.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.sectionGroup}>
        <h2 className={styles.groupTitle}>Prediction Section</h2>
        {loading ? (
          <div className={styles.predictionGrid}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className={styles.predictionGrid}>
            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.calendar}</p>
              <h3 className={styles.cardTitle}>Next Period Prediction</h3>
              {isInvalidCycleLength(nextPeriod?.averageCycleLength) ? (
                <p className={styles.fallback}>Insufficient cycle history</p>
              ) : (
                <>
                  <p className={styles.metricText}>{formatDate(nextPeriod?.predictedNextPeriodDate)}</p>
                  <p className={styles.caption}>Based on average cycle length: {nextPeriod?.averageCycleLength} days</p>
                  <span className={`${styles.badge} ${styles.badgeSuccess}`}>Reliable</span>
                </>
              )}
            </article>

            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.ovulation}</p>
              <h3 className={styles.cardTitle}>Ovulation Window</h3>
              <p className={styles.metricText}>{formatDate(ovulationWindow?.predictedOvulationDate)}</p>
              <p className={styles.caption}>
                {formatDate(ovulationWindow?.fertileWindowStart)} - {formatDate(ovulationWindow?.fertileWindowEnd)}
              </p>
              <span className={`${styles.badge} ${styles.badgeWarning}`}>Prediction</span>
            </article>

            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.fertile}</p>
              <h3 className={styles.cardTitle}>Fertile Window Confidence</h3>
              <p className={styles.metricText}>{formatDate(fertileWindow?.ovulationDate)}</p>
              <p className={styles.caption}>
                {formatDate(fertileWindow?.fertileWindowStart)} - {formatDate(fertileWindow?.fertileWindowEnd)}
              </p>
              <span className={`${styles.badge} ${getBadgeTone(fertileWindow?.confidence)} ${styles.shimmer}`}>
                {fertileWindow?.confidence ?? "Not enough cycle data yet"}
              </span>
            </article>
          </div>
        )}
      </section>

      <section className={styles.sectionGroup}>
        <h2 className={styles.groupTitle}>Health Insights Section</h2>
        {loading ? (
          <div className={styles.insightsGrid}>
            <SkeletonCard />
            <SkeletonCard />
            {shouldShowPregnancyCard ? <SkeletonCard /> : null}
            <SkeletonCard />
          </div>
        ) : (
          <div className={styles.insightsGrid}>
            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.clock}</p>
              <h3 className={styles.cardTitle}>Late Period Status</h3>
              {!latePeriod ? (
                <p className={styles.fallback}>Not enough cycle data yet</p>
              ) : latePeriod.isLate ? (
                <>
                  <p className={styles.metricText}>Late by {latePeriod.lateByDays ?? 0} days</p>
                  <p className={styles.caption}>{latePeriod.recommendation ?? "Not enough cycle data yet"}</p>
                  <span className={`${styles.badge} ${styles.badgeDanger}`}>Delayed</span>
                </>
              ) : (
                <>
                  <p className={styles.metricText}>Cycle on track</p>
                  <span className={`${styles.badge} ${styles.badgeSuccess}`}>Stable</span>
                </>
              )}
            </article>

            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.pulse}</p>
              <h3 className={styles.cardTitle}>Cycle Regularity</h3>
              {!irregular ? (
                <p className={styles.fallback}>Not enough cycle data yet</p>
              ) : (
                <>
                  <p className={styles.metricText}>{irregular.isIrregular ? "Irregular" : "Regular"}</p>
                  <p className={styles.caption}>Variation: {irregular.variation ?? 0} days</p>
                  <div className={styles.progressTrack}>
                    <span className={styles.progressFill} style={{ width: `${Math.min(Number(irregular.variation ?? 0), 100)}%` }} />
                  </div>
                  <span className={`${styles.badge} ${getBadgeTone(irregular.confidence)}`}>
                    Confidence: {irregular.confidence ?? "Not enough cycle data yet"}
                  </span>
                </>
              )}
            </article>

            {shouldShowPregnancyCard ? (
              <article className={styles.heroCard}>
                <div className={styles.heroTop}>
                  <p className={styles.cardIcon}>{icon.shield}</p>
                  <span className={styles.heroLabel}>Featured Insight</span>
                </div>
                <h3 className={styles.cardTitle}>Pregnancy Chance</h3>
                {!pregnancyChance ? (
                  <p className={styles.fallback}>Not enough cycle data yet</p>
                ) : (
                  <div className={styles.heroContent}>
                    <div className={styles.ring} style={{ "--progress": `${Math.round((pregnancyChancePercent / 100) * 360)}deg` }}>
                      <span>{pregnancyChance.pregnancyChance ?? "N/A"}</span>
                    </div>
                    <div>
                      <p className={styles.metricText}>{pregnancyChance.reason ?? "Not enough cycle data yet"}</p>
                      <p className={styles.caption}>Ovulation: {formatDate(pregnancyChance.ovulationDate)}</p>
                    </div>
                  </div>
                )}
              </article>
            ) : null}

            <article className={styles.card}>
              <p className={styles.cardIcon}>{icon.alert}</p>
              <h3 className={styles.cardTitle}>Risk Analysis</h3>
              {!riskAnalysis ? (
                <p className={styles.fallback}>Not enough cycle data yet</p>
              ) : (
                <>
                  <p className={styles.metricText}>{riskAnalysis.severity ?? "Not enough cycle data yet"} Risk</p>
                  <span className={`${styles.badge} ${getBadgeTone(riskAnalysis.severity)}`}>
                    {riskAnalysis.severity ?? "Unknown"}
                  </span>
                  <button
                    type="button"
                    className={styles.learnMore}
                    onClick={() => setRiskExpanded((prev) => !prev)}
                    aria-expanded={riskExpanded}
                  >
                    {riskExpanded ? "Hide details" : "Learn more"}
                  </button>
                  <div className={`${styles.accordion} ${riskExpanded ? styles.accordionOpen : ""}`}>
                    {Array.isArray(riskAnalysis.risks) && riskAnalysis.risks.length ? (
                      <ul className={styles.riskList}>
                        {riskAnalysis.risks.map((risk) => (
                          <li key={risk}>{risk}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.caption}>No risk details available yet.</p>
                    )}
                  </div>
                </>
              )}
            </article>
          </div>
        )}
      </section>

      <section className={styles.sectionGroup}>
        <h2 className={styles.groupTitle}>Notifications Panel</h2>
        {loading ? (
          <SkeletonCard lines={4} />
        ) : (
          <div className={styles.card}>
            <div className={styles.notificationsWrap}>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                <ul className={styles.timeline}>
                  {notifications.map((item, index) => (
                    <li key={`${item}-${index}`} style={{ "--delay": `${index * 90}ms` }}>
                      <span className={styles.timelineDot} />
                      <div>
                        <p className={styles.timelineText}>{item}</p>
                        <p className={styles.timelineTime}>Moments ago</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyArt} />
                  <p className={styles.cardText}>No alerts right now</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CyclePage;
