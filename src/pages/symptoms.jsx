import { useState } from "react";
import styles from "./symptoms.module.css";

const MOODS = ["😄", "😐", "😢", "😡", "😴", "😰"];

const SYMPTOM_CATEGORIES = [
  {
    title: "💢 Physical",
    items: [
      { label: "Cramps", emoji: "🤕" },
      { label: "Headache", emoji: "🤯" },
      { label: "Back Pain", emoji: "🦴" },
      { label: "Breast Tenderness", emoji: "💗" },
    ],
  },
  {
    title: "🧠 Emotional",
    items: [
      { label: "Mood Swings", emoji: "🎭" },
      { label: "Anxiety", emoji: "😰" },
      { label: "Irritability", emoji: "😤" },
      { label: "Low Motivation", emoji: "💤" },
    ],
  },
  {
    title: "🌿 Other",
    items: [
      { label: "Bloating", emoji: "🎈" },
      { label: "Acne", emoji: "🔴" },
      { label: "Fatigue", emoji: "😴" },
      { label: "Food Cravings", emoji: "🍫" },
    ],
  },
];

// const FLOW_OPTIONS = ["🩸 None", "🩸 Light", "🩸 Medium", "🩸 Heavy"];
const FLOW_OPTIONS = ["None", "Light", "Medium", "Heavy"];

const MoodSelector = ({ selectedMood, onSelect }) => (
  <div className={styles.moodGrid}>
    {MOODS.map((mood, index) => (
      <button
        key={index}
        type="button"
        className={`${styles.moodButton} ${
          selectedMood === mood ? styles.moodButtonActive : ""
        }`}
        onClick={() => onSelect(mood)}
      >
        {mood}
      </button>
    ))}
  </div>
);

const SymptomChips = ({ categories, selectedSymptoms, onToggle }) => (
  <div className={styles.categoriesWrapper}>
    {categories.map(({ title, items }) => (
      <div className={styles.categoryBlock} key={title}>
        <p className={styles.categoryTitle}>{title}</p>
        <div className={styles.chipsRow}>
          {items.map(({ label, emoji }) => {
            const isSelected = selectedSymptoms.includes(label);
            return (
              <button
                key={label}
                className={`${styles.chip} ${
                  isSelected ? styles.chipActive : ""
                }`}
                onClick={() => onToggle(label)}
              >
                {emoji} {label}
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>
);

const FlowSelector = ({ selectedFlow, onChange }) => (
  <div className={styles.flowGrid}>
    {FLOW_OPTIONS.map((option) => (
      <button
        key={option}
        className={`${styles.flowButton} ${
          selectedFlow === option ? styles.flowButtonActive : ""
        }`}
        onClick={() => onChange(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

const SymptomsPage = () => {
  const [mood, setMood] = useState(MOODS[0]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [flow, setFlow] = useState("🩸 Light");
  const [painLevel, setPainLevel] = useState(3);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((item) => item !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {/* HEADER */}
        <header className={styles.headerCard}>
          <p className={styles.title}>🌸 Symptoms</p>
          <p className={styles.subtitle}>Log what matters today</p>

          <div className={styles.headerMeta}>
            <p>March 18, 2026</p>
            <p><b>Day 12 • Luteal Phase</b></p>
          </div>
        </header>

        {/* MOOD */}
        <section className={styles.card}>
          <p className={styles.sectionTitle}>💖 How are you feeling?</p>
          <MoodSelector selectedMood={mood} onSelect={setMood} />
        </section>

        {/* SYMPTOMS */}
        <section className={styles.card}>
          <p className={styles.sectionTitle}>🌿 Symptoms</p>
          <p className={styles.sectionSubtitle}>
            Select anything you noticed today
          </p>

          <SymptomChips
            categories={SYMPTOM_CATEGORIES}
            selectedSymptoms={selectedSymptoms}
            onToggle={toggleSymptom}
          />
        </section>

        {/* FLOW */}
        <section className={styles.card}>
          <p className={styles.sectionTitle}>🩸 Flow</p>
          <FlowSelector selectedFlow={flow} onChange={setFlow} />
        </section>

        {/* PAIN */}
        <section className={styles.card}>
          {/* <p className={styles.sectionTitle}>😣 Pain Level: {painLevel}</p> */}
          <div className={styles.painHeader}>
            <span>😣 Pain Level</span>
            <span>{painLevel}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className={styles.slider}
          />
        </section>

        {/* NOTES */}
        <section className={styles.card}>
          <p className={styles.sectionTitle}>📝 Notes</p>
          <textarea
            className={styles.notesArea}
            placeholder="Add anything you want to remember..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        {/* BUTTON */}
        <button className={styles.saveButton}>
          💾 Save Entry
        </button>
      </div>
    </main>
  );
};

export default SymptomsPage;