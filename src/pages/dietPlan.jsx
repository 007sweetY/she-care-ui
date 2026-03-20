import { motion } from "framer-motion";
import { useMemo } from "react";
import styles from "./dietPlan.module.css";

const MOCK_DATA = {
  weight: 60,
  height: 165,
  goal: "lose",
  activity: "moderate",
  diet: "veg",
  stats: {
    streak: 7,
    weightChange: -2.5,
    water: 1.8,
    waterGoal: 2.5,
    adherence: 85,
  },
};

const GOAL_ADJUSTMENTS = {
  lose: -320,
  maintain: 0,
  gain: 320,
};

const ACTIVITY_BOOSTS = {
  gentle: -80,
  moderate: 0,
  intense: 120,
};

const MEAL_TEMPLATES = {
  veg: [
    { title: "Breakfast", food: "Masala oats with grilled veggies", detail: "Fiber + spice" },
    { title: "Lunch", food: "Mixed dal with red rice", detail: "Protein forward" },
    { title: "Dinner", food: "Quinoa & beetroot khichdi", detail: "Gentle digestion" },
  ],
  "non-veg": [
    { title: "Breakfast", food: "Paneer bhurji toast", detail: "Protein + immunity" },
    { title: "Lunch", food: "Herb chicken bowl", detail: "Lean strength" },
    { title: "Dinner", food: "Steamed fish stew", detail: "Omega lift" },
  ],
  vegan: [
    { title: "Breakfast", food: "Idli + coconut chutney", detail: "Fermented lift" },
    { title: "Lunch", food: "Sprouted moong & bajra", detail: "Slow carbs" },
    { title: "Dinner", food: "Mushroom curry & millet", detail: "Magnesium glow" },
  ],
};

const WEEKLY_FOCUS = [
  { day: "Mon", focus: "Metabolism Reset 😻" },
  { day: "Tue", focus: "Protein Focus 🥜" },
  { day: "Wed", focus: "Hydration Ritual💧" },
  { day: "Thu", focus: "Mindful Dining 🥗" },
  { day: "Fri", focus: "Joyful Movement 🍜" },
  { day: "Sat", focus: "Fiber Boost 💪" },
  { day: "Sun", focus: "Rest & Recharge 🏋️‍♀️" },
];

const motionContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const motionCard = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const DietPlanPage = () => {
  const calories = useMemo(() => {
    const base = 2000 + (GOAL_ADJUSTMENTS[MOCK_DATA.goal] ?? 0);
    const activity = ACTIVITY_BOOSTS[MOCK_DATA.activity] ?? 0;
    return base + activity;
  }, []);

  const bmi = useMemo(() => {
    const { weight, height } = MOCK_DATA;
    const raw = weight / ((height / 100) ** 2);
    return Number(raw.toFixed(1));
  }, []);

  const waterIntake = useMemo(() => Number((MOCK_DATA.weight * 0.033).toFixed(1)), []);

  const goalCompletion = useMemo(() => {
    const base = MOCK_DATA.goal === "lose" ? 72 : MOCK_DATA.goal === "gain" ? 60 : 68;
    const activityIndex = Object.keys(ACTIVITY_BOOSTS).indexOf(MOCK_DATA.activity);
    return Math.min(100, base + activityIndex * 5);
  }, []);

  const mealPlan = MEAL_TEMPLATES[MOCK_DATA.diet] || MEAL_TEMPLATES.veg;

  const topStats = [
    {
      id: "streak",
      title: `${MOCK_DATA.stats.streak}-Day Streak`,
      subtitle: "You're on track!",
      detail: `${MOCK_DATA.stats.streak}`,
      icon: "🔥",
    },
    {
      id: "weight",
      title: `${MOCK_DATA.stats.weightChange} kg this month`,
      subtitle: "Weight progress",
      detail: `${MOCK_DATA.stats.weightChange > 0 ? "+" : ""}${MOCK_DATA.stats.weightChange.toFixed(1)} kg`,
      indicator: "progress",
    },
    {
      id: "hydration",
      title: `${MOCK_DATA.stats.water}L / ${MOCK_DATA.stats.waterGoal}L`,
      subtitle: "Hydration",
      indicator: "bar",
    },
    {
      id: "adherence",
      title: `${MOCK_DATA.stats.adherence}% followed`,
      subtitle: "Diet adherence",
      detail: `${MOCK_DATA.stats.adherence}%`,
      indicator: "ring",
    },
  ];

  return (
    <motion.div
      className={`page ${styles.pageContainer}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={motionContainer}
    >
      <FloatingHalo />
      <div className={styles.content}>
        <motion.section variants={motionCard}>
          <TopStatsStrip stats={topStats} />
        </motion.section>

        <motion.section variants={motionCard} className={styles.sectionHeading}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradientText}>Your Personalized</span> Diet Plan
          </h1>
          <p className={styles.heroSubtitle}>Crafted intelligently for your body & lifestyle</p>
        </motion.section>

        <motion.section variants={motionCard}>
          <div className={styles.glassCard}>
            <div className={styles.sectionLabelWrap}>
              <p className={styles.sectionTitle}>Key metrics</p>
              <span className={styles.sectionHint}>Auto-updates with your choices</span>
            </div>
            <div className={styles.metrics}>
              <MetricCard label="Calories" value={`${calories} kcal`} description="Daily energy target" icon="🔥" />
              <MetricCard label="BMI" value={bmi} description="Healthy zone" icon="🧮" />
              <MetricCard label="Water Intake" value={`${waterIntake} L`} description="Hydration goal" icon="💧" />
            </div>
          </div>
        </motion.section>

        <motion.section variants={motionCard}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionTitle}>Today's meals</p>
            <button type="button" className={styles.sectionHint}>
              Edit plan ✏️
            </button>
          </div>
          <div className={styles.meals}>
            {mealPlan.map((meal) => (
              <MealCard key={meal.title} meal={meal} />
            ))}
          </div>
        </motion.section>

        <motion.section variants={motionCard}>
          <div className={styles.sectionLabelWrap}>
            <p className={styles.sectionTitle}>Weekly Rhythm</p>
            <span className={styles.sectionHint}>Swipe through for quick focus</span>
          </div>
          <WeeklyCarousel items={WEEKLY_FOCUS} />
        </motion.section>

        <motion.section variants={motionCard}>
          <p className={styles.sectionTitle}>Progress & momentum 📈</p>
          <ProgressVisualization completion={goalCompletion} weightChange={MOCK_DATA.stats.weightChange} />
        </motion.section>
      </div>
    </motion.div>
  );
};

const FloatingHalo = () => (
  <motion.div
    className={styles.floatingHalo}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1.1 }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
  />
);

const TopStatsStrip = ({ stats }) => (
  <motion.div
    className={styles.topStatsStrip}
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.08,
        },
      },
    }}
  >
    {stats.map((stat) => (
      <motion.div
        key={stat.id}
        className={styles.statCard}
        whileHover={{ y: -6, scale: 1.02 }}
        variants={motionCard}
      >
        <div className={styles.statTitle}>
          <span className={styles.liveLabel}>{stat.icon}</span> {stat.title}
          <span className={styles.liveLabel}>Live</span>
        </div>
        <p className={styles.statDetail}>{stat.detail}</p>
        <p className={styles.statSubtitle}>{stat.subtitle}</p>
        {stat.indicator === "progress" && (
          <div className={styles.statBarWrapper}>
            <div className={styles.statBar} />
          </div>
        )}
        {stat.indicator === "bar" && (
          <div className={styles.statBarWrapper}>
            <div
              className={styles.statBar}
              style={{ width: `${(MOCK_DATA.stats.water / MOCK_DATA.stats.waterGoal) * 100}%` }}
            />
          </div>
        )}
        {stat.indicator === "ring" && (
          <div className={styles.ring}>
            <div className={styles.ringBadge}>{stat.detail?.replace("% followed", "")}</div>
          </div>
        )}
      </motion.div>
    ))}
  </motion.div>
);

const MetricCard = ({ label, value, description, icon }) => (
  <motion.div className={styles.metricCard} whileHover={{ scale: 1.01 }}>
    <div className={styles.metricInfo}>
      <p className={styles.sectionTitle}>{label}</p>
      <p className={styles.metricValue}>{value}</p>
      <p className={styles.metricDescription}>{description}</p>
    </div>
    <div className={styles.metricIcon}>{icon}</div>
  </motion.div>
);

const MealCard = ({ meal }) => (
  <motion.div className={styles.mealCard} whileHover={{ y: -4 }}>
    <div className={styles.mealHeader}>
      <p className={styles.mealTitle}>{meal.title}</p>
      <button type="button" className={styles.mealSwap}>
        Swap Meal 😋
      </button>
    </div>
    <p className={styles.mealName}>{meal.food}</p>
    <p className={styles.mealDetail}>{meal.detail}</p>
  </motion.div>
);

const WeeklyCarousel = ({ items }) => (
  <div className={styles.weeklyStrip}>
    {items.map((item) => (
      <motion.div
        key={item.day}
        className={styles.weekItem}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <p className={styles.weekDay}>{item.day}</p>
        <p className={styles.weekFocus}>{item.focus}</p>
      </motion.div>
    ))}
  </div>
);

const ProgressVisualization = ({ completion, weightChange }) => {
  const percentStyle = {
    background: `conic-gradient(from 0deg, var(--primary) ${completion}%, var(--soft) ${completion}% 100%)`,
  };

  return (
    <motion.div className={styles.progressPanel} whileHover={{ scale: 1.01 }}>
      <div className={styles.progressCircle} style={percentStyle}>
        <motion.div className={styles.progressInner} initial={{ scale: 0.96 }} animate={{ scale: 1 }}>
          {completion}% <span className={styles.metricDescription}>complete</span>
        </motion.div>
      </div>
      <div className={styles.progressFooter}>
        <p>Weight trend: {weightChange > 0 ? `+${weightChange}` : weightChange} kg this month</p>
        <span className={styles.momentumBadge}>Momentum</span>
      </div>
    </motion.div>
  );
};

export default DietPlanPage;
