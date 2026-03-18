import { useMemo, useState } from "react";
import leafImg from "../assets/leaf.png";
import styles from "./cycle.module.css";

const PERIOD_DAYS = [12, 13, 14, 15, 16];
const FERTILE_DAYS = [6, 7, 8, 9, 10];
const OVULATION_DAY = 8;
const WEEK_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MOOD_OPTIONS = ["😀", "😊", "😌", "😕", "😴", "😄"];
const SYMPTOM_OPTIONS = ["Cramps", "Bloating", "Fatigue", "Headache", "Backache"];
const NAV_ITEMS = [
  { label: "Home", icon: "🏠" },
  { label: "Cycle", icon: "📅", active: true },
  { label: "Insights", icon: "📊" },
  { label: "Profile", icon: "👤" },
];

const getPhaseLabel = (day) => {
  if (PERIOD_DAYS.includes(day)) return "Period Phase 🔴";
  if (day === OVULATION_DAY) return "Ovulation Phase 🟣";
  if (FERTILE_DAYS.includes(day)) return "Fertile Window 🌸";
  return "Luteal Phase";
};

const getMoodLabel = (phase) => {
  if (phase.includes("Period")) return "😊 Happy";
  if (phase.includes("Ovulation")) return "😄 Energized";
  if (phase.includes("Fertile")) return "😌 Calm";
  return "🙂 Balanced";
};

const getSymptomsLabel = (phase) => {
  if (phase.includes("Period")) return "Cramps, Fatigue";
  if (phase.includes("Ovulation")) return "Twinges, Tenderness";
  if (phase.includes("Fertile")) return "Light Headache";
  return "Subtle bloating";
};

const Cycle = () => {
  const [selectedDay, setSelectedDay] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState(MOOD_OPTIONS[1]);
  const [currentSymptoms, setCurrentSymptoms] = useState([SYMPTOM_OPTIONS[0]]);
  const [notes, setNotes] = useState("Feeling low energy");

  const calendarWeeks = useMemo(() => {
    const year = 2026;
    const month = 2; // March (0-indexed)
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const weeks = [];
    let currentDay = 1;

    for (let week = 0; week < 6; week += 1) {
      const days = [];
      for (let weekday = 0; weekday < 7; weekday += 1) {
        if (week === 0 && weekday < firstDayIndex) {
          days.push(null);
          continue;
        }
        if (currentDay > totalDays) {
          days.push(null);
          continue;
        }
        days.push(currentDay);
        currentDay += 1;
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const toggleSymptom = (symptom) => {
    setCurrentSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const phaseLabel = getPhaseLabel(selectedDay);

  return (
    <div className={`page ${styles.pageWrapper}`}>
      <img src={leafImg} className={styles.leafTopLeft} alt="leaf decoration" />
      <img src={leafImg} className={styles.leafTopRight} alt="leaf decoration" />

      <header className={styles.header}>
        <p className={styles.pageTitle}>My Cycle 🌸</p>
        <p className={styles.pageSubtitle}>Track and understand your cycle</p>
      </header>

      <section className={`${styles.card} ${styles.predictionCard}`}>
        <div className={styles.predictionHeader}>
          <p className={styles.cardTitle}>Prediction</p>
          <span className={styles.cardEmoji}>✨</span>
        </div>
        <div className={styles.predictionRow}>
          <div>
            <p className={styles.predictionLabel}>Next Period</p>
            <p className={styles.predictionValue}>15 March</p>
          </div>
          <div>
            <p className={styles.predictionLabel}>Ovulation</p>
            <p className={styles.predictionValue}>8 March</p>
          </div>
          <div>
            <p className={styles.predictionLabel}>Fertile Window</p>
            <p className={styles.predictionValue}>6–10 March</p>
          </div>
        </div>
      </section>

      <section className={`${styles.card} ${styles.calendarCard}`}>
        <div className={styles.calendarHeader}>
          <p className={styles.cardTitle}>March 2026</p>
          <span className={styles.calendarNote}>Stay hydrated 💧</span>
        </div>
        <div className={styles.weekHeaders}>
          {WEEK_HEADERS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className={styles.calendarGrid}>
          {calendarWeeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className={styles.weekRow}>
              {week.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${weekIndex}-${index}`} className={styles.emptyCell} />;
                }
                const isSelected = selectedDay === day;
                const dayStatusClass = PERIOD_DAYS.includes(day)
                  ? styles.periodDay
                  : day === OVULATION_DAY
                  ? styles.ovulationDay
                  : FERTILE_DAYS.includes(day)
                  ? styles.fertileDay
                  : styles.normalDay;

                return (
                  <button
                    key={day}
                    type="button"
                    className={`${styles.dayCell} ${dayStatusClass} ${isSelected ? styles.selectedDay : ""}`}
                    onClick={() => setSelectedDay(day)}
                    aria-pressed={isSelected}
                  >
                    <span>{day}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.card} ${styles.detailsCard}`}>
        <p className={styles.cardTitle}>Selected Day</p>
        <p className={styles.detailsDate}>{`${selectedDay} March`}</p>
        <div className={styles.detailsRow}>
          <div>
            <p className={styles.detailsLabel}>Cycle Day</p>
            <p className={styles.detailsValue}>{selectedDay}</p>
          </div>
          <div>
            <p className={styles.detailsLabel}>Phase</p>
            <p className={styles.detailsValue}>{phaseLabel}</p>
          </div>
        </div>
        <div className={styles.detailsRow}>
          <div>
            <p className={styles.detailsLabel}>Mood</p>
            <p className={styles.detailsValue}>{getMoodLabel(phaseLabel)}</p>
          </div>
          <div>
            <p className={styles.detailsLabel}>Symptoms</p>
            <p className={styles.detailsValue}>{getSymptomsLabel(phaseLabel)}</p>
          </div>
        </div>
        <p className={styles.detailsLabel}>Notes</p>
        <p className={styles.detailsNotes}>{notes}</p>
      </section>

      <section className={`${styles.card} ${styles.summaryCard}`}>
        <div>
          <p className={styles.cardTitle}>Cycle Summary</p>
        </div>
        <div className={styles.summaryRow}>
          <div>
            <p className={styles.summaryLabel}>Cycle Length</p>
            <p className={styles.summaryValue}>28 days</p>
          </div>
          <div>
            <p className={styles.summaryLabel}>Last Period</p>
            <p className={styles.summaryValue}>15 Feb</p>
          </div>
          <div>
            <p className={styles.summaryLabel}>Regularity</p>
            <p className={styles.summaryValue}>Normal 👍</p>
          </div>
        </div>
      </section>

      <section className={`${styles.card} ${styles.insightsCard}`}>
        <p className={styles.cardTitle}>Insights</p>
        <ul className={styles.insightsList}>
          <li>Your cycle is regular</li>
          <li>Mood drops before period</li>
          <li>Drink more water 💧</li>
        </ul>
      </section>

      <button className={styles.addEntryButton} type="button" onClick={() => setModalOpen(true)}>
        + Add Entry
      </button>

      {modalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <p>Add Mood & Symptoms</p>
              <button type="button" className={styles.modalClose} onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}>Mood</p>
              <div className={styles.moodRow}>
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    className={`${styles.modalMood} ${currentMood === mood ? styles.modalMoodSelected : ""}`}
                    onClick={() => setCurrentMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}>Symptoms</p>
              <div className={styles.symptomRow}>
                {SYMPTOM_OPTIONS.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    className={`${styles.symptomChip} ${
                      currentSymptoms.includes(symptom) ? styles.symptomSelected : ""
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.modalSection}>
              <p className={styles.modalLabel}>Notes</p>
              <textarea
                className={styles.modalTextarea}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
              />
            </div>
            <button type="button" className={styles.modalSave} onClick={() => setModalOpen(false)}>
              Save Entry
            </button>
          </div>
        </div>
      )}

      <nav className={styles.bottomNav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.navButton} ${item.active ? styles.navActive : ""}`}
            aria-pressed={item.active ?? false}
          >
            <span
              className={`${styles.navIconWrapper} ${item.active ? styles.navIconActive : styles.navIconInactive}`}
              aria-hidden
            >
              {item.icon}
            </span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Cycle;
