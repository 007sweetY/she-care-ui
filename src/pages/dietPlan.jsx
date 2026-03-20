import { useMemo, useState } from "react";

const USER_STATS = {
  age: 24,
  weight: 60,
  height: 165,
};

const GOAL_OPTIONS = ["Lose", "Maintain", "Gain"];
const ACTIVITY_LEVELS = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"];
const DIET_PREFERENCES = ["Veg", "Non-Veg", "Vegan"];
const HEALTH_CONDITIONS = ["None", "PCOS", "Thyroid", "Diabetes", "Iron Deficiency"];

const GOAL_ADJUSTMENTS = {
  Lose: -320,
  Maintain: 0,
  Gain: 320,
};

const ACTIVITY_BOOSTS = {
  Sedentary: -150,
  "Lightly Active": 0,
  "Moderately Active": 110,
  "Very Active": 210,
};

const MEAL_TEMPLATES = {
  Veg: {
    Breakfast: "Masala oats with grilled veggies & mint raita",
    Lunch: "Mixed dal, brown rice, sautéed greens, cucumber salad",
    Dinner: "Quinoa khichdi, lauki raita, roasted beets",
    Snacks: "Citrus spiced chana chaat",
  },
  "Non-Veg": {
    Breakfast: "Paneer bhurji toast + turmeric ginger tea",
    Lunch: "Herb chicken tikka bowl with millet pulao",
    Dinner: "Steamed fish curry with ragi roti & greens",
    Snacks: "Moong chilla rolls with coriander chutney",
  },
  Vegan: {
    Breakfast: "Idli with tomato-gudde & coconut mint chutney",
    Lunch: "Sprouted moong & bajra khichdi with veggies",
    Dinner: "Matar mushroom curry with millet rotis",
    Snacks: "Roasted masala makhana + hibiscus cooler",
  },
};

const MEAL_STRUCTURE = [
  { key: "Breakfast", icon: "🍳" },
  { key: "Lunch", icon: "🍛" },
  { key: "Dinner", icon: "🍲" },
  { key: "Snacks", icon: "🥜" },
];

const WEEKLY_OPPORTUNITIES = [
  { day: "Mon", focus: "Metabolism Reset" },
  { day: "Tue", focus: "Protein Focus" },
  { day: "Wed", focus: "Hydration Ritual" },
  { day: "Thu", focus: "Mindful Dining" },
  { day: "Fri", focus: "Joyful Movement" },
  { day: "Sat", focus: "Fiber Boost" },
  { day: "Sun", focus: "Rest & Recharge" },
];

const GOAL_TAGLINES = {
  Lose: "Lean, color-packed meals",
  Maintain: "Balanced, steady energy",
  Gain: "Nutrient-rich, protein-dense",
};

function getBMICategory(value) {
  if (value < 18.5) {
    return { label: "Underweight", description: "Add healthy volume", tone: "text-[#FF6B81]", badge: "bg-[#FFE1E7]" };
  }
  if (value < 25) {
    return { label: "Healthy", description: "Stay consistent", tone: "text-primary", badge: "bg-[#E6F0FF]" };
  }
  if (value < 30) {
    return { label: "Overweight", description: "Tune in to portions", tone: "text-[#FF8FA9]", badge: "bg-[#FFF0F5]" };
  }
  return { label: "Elevated", description: "Slow, steady progress", tone: "text-[#E85D2A]", badge: "bg-[#FFF8F4]" };
}

function SummaryCard({ icon, label, value, description }) {
  return (
    <div className="bg-card rounded-[28px] border border-white/30 shadow-soft-card p-5 transition-transform duration-300 ease-out hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]">{label}</div>
      </div>
      <div className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">{value}</div>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function PreferencePanel({ goal, activity, diet, condition, setGoal, setActivity, setDiet, setCondition }) {
  return (
    <div className="space-y-4 rounded-3xl bg-card p-5 shadow-soft-card">
      <PreferenceRow label="Goal" options={GOAL_OPTIONS} value={goal} setter={setGoal} />
      <PreferenceRow label="Activity Level" options={ACTIVITY_LEVELS} value={activity} setter={setActivity} columns={4} />
      <PreferenceRow label="Diet Preference" options={DIET_PREFERENCES} value={diet} setter={setDiet} />
      <PreferenceRow label="Health Condition" options={HEALTH_CONDITIONS} value={condition} setter={setCondition} columns={3} />
    </div>
  );
}

function PreferenceRow({ label, options, value, setter, columns = 3 }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[var(--text-secondary)]">{label}</p>
      <div className={columns === 4 ? "grid gap-2 grid-cols-2 sm:grid-cols-4" : "grid gap-2 grid-cols-2 sm:grid-cols-3"}>
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setter(option)}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-sm shadow-primary/40"
                  : "border-[var(--border-soft)] bg-white text-[var(--text-secondary)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatBadge({ label, value, description, accent }) {
  return (
    <div className="flex flex-col gap-2 rounded-[26px] border border-[var(--border-soft)] bg-card p-4 shadow-soft-card transition hover:-translate-y-1">
      <span className="text-xs uppercase tracking-[0.4em] text-[var(--text-secondary)]">{label}</span>
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
      <p className="text-xs text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function ResultDashboard({
  calories,
  bmi,
  bmiBadge,
  water,
  mealPlan,
  weeklyPlan,
  progressPercent,
  goalTagline,
  condition,
  stats,
}) {
  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard icon="🔥" label="Calories" value={`${calories} kcal`} description="guided energy target" />
        <SummaryCard icon="📊" label="BMI" value={bmi} description={`${bmiBadge.label} category`} />
        <SummaryCard icon="💧" label="Water" value={`${water} L`} description="daily hydration" />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-4 shadow-soft-card">
        <span className="rounded-full bg-[var(--text-secondary)]/10 px-3 py-1 text-xs font-semibold uppercase text-[var(--text-secondary)]">
          {bmiBadge.label}
        </span>
        <p className="text-sm text-[var(--text-secondary)]">
          {bmiBadge.description} • Goal: {goalTagline}
        </p>
        <span className="ml-auto rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs uppercase text-[var(--text-secondary)]">
          Condition: {condition}
        </span>
      </div>

      <div className="rounded-3xl bg-card p-5 shadow-soft-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Meal Plan</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{goalTagline}</h3>
          </div>
          <button
            type="button"
            className="rounded-full bg-gradient-to-br from-primary to-secondary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-secondary/40 transition hover:-translate-y-0.5"
          >
            Swap Meal
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {mealPlan.map((meal) => (
            <div key={meal.key} className="rounded-2xl border border-[var(--border-soft)] p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg">
                  <span>{meal.icon}</span>
                  <span className="text-base font-semibold text-[var(--text-primary)]">{meal.key}</span>
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{meal.focusTag}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{meal.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatBadge key={stat.label} {...stat} />
        ))}
      </div>

      <div className="rounded-3xl bg-card p-5 shadow-soft-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Weekly Rhythm</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Stay on track</h3>
          </div>
          <span className="text-xs uppercase text-[var(--text-secondary)]">7-day grid</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {weeklyPlan.map((day) => (
            <div key={day.day} className="rounded-2xl border border-[var(--border-soft)] p-4 transition hover:-translate-y-1">
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--text-secondary)]">
                <span>{day.day}</span>
                <span className="text-[var(--text-primary)]">{day.focus}</span>
              </div>
              <p className="mt-2 text-xs text-[var(--text-secondary)]">{day.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-card p-5 shadow-soft-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">Progress</p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Weight journey</h3>
          </div>
          <span className="text-sm font-semibold text-[var(--text-primary)]">{progressPercent}% complete</span>
        </div>
        <div className="mt-4 h-3 w-full rounded-full bg-gradient-to-r from-primary/20 to-secondary/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-soft-card"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          Consistency wins. The plan adapts as you update goal or activity.
        </p>
      </div>
    </section>
  );
}

export default function DietPlanPage() {
  const [goal, setGoal] = useState("Lose");
  const [activity, setActivity] = useState("Lightly Active");
  const [diet, setDiet] = useState("Veg");
  const [condition, setCondition] = useState("None");

  const bmi = useMemo(() => {
    const { weight, height } = USER_STATS;
    const rawBMI = weight / ((height / 100) ** 2);
    return Number(rawBMI.toFixed(1));
  }, []);

  const bmiCategory = useMemo(() => getBMICategory(bmi), [bmi]);

  const calories = useMemo(() => {
    const base = 2000 + (GOAL_ADJUSTMENTS[goal] ?? 0);
    const boost = ACTIVITY_BOOSTS[activity] ?? 0;
    return Math.round(base + boost);
  }, [goal, activity]);

  const waterIntake = useMemo(() => Number((USER_STATS.weight * 0.033).toFixed(1)), []);

  const mealPlan = useMemo(() => {
    const template = MEAL_TEMPLATES[diet];
    return MEAL_STRUCTURE.map((meal) => ({
      ...meal,
      description: template[meal.key],
      focusTag: goal === "Lose" ? "Light" : goal === "Gain" ? "Energy" : "Balance",
    }));
  }, [diet, goal]);

  const weeklyPlan = useMemo(() => {
    return WEEKLY_OPPORTUNITIES.map((entry) => ({
      ...entry,
      note: `${goal} • ${activity === "Very Active" ? "Active" : activity}`,
    }));
  }, [goal, activity]);

  const progressPercent = useMemo(() => {
    const base = goal === "Lose" ? 52 : goal === "Gain" ? 40 : 72;
    const activityIndex = ACTIVITY_LEVELS.indexOf(activity);
    return Math.min(96, base + activityIndex * 5);
  }, [goal, activity]);

  const stats = useMemo(() => {
    const activityIndex = ACTIVITY_LEVELS.indexOf(activity);
    const complianceMap = { Lose: 86, Maintain: 78, Gain: 84 };
    const macros = { Lose: "62g", Maintain: "70g", Gain: "82g" };
    const streak = 2 + Math.max(0, activityIndex);
    return [
      {
        label: "Meals logged",
        value: `${Math.min(9, 6 + activityIndex)}/9`,
        description: "Today",
        accent: "text-primary",
      },
      {
        label: "Compliance",
        value: `${Math.min(99, complianceMap[goal] + activityIndex * 2)}%`,
        description: "Goal alignment",
        accent: "text-secondary",
      },
      {
        label: "Protein on target",
        value: `${macros[goal]} daily`,
        description: "Macro-rich Indian plates",
        accent: "text-primary",
      },
      {
        label: "Week streak",
        value: `${Math.min(7, streak + 1)} days`,
        description: "No skips",
        accent: "text-secondary",
      },
    ];
  }, [goal, activity]);

  return (
    <div className="min-h-screen bg-bgSoft px-4 py-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 p-6 shadow-soft-card backdrop-blur transition hover:-translate-y-1">
          <div className="pointer-events-none absolute -right-10 top-6 h-48 w-48 rounded-full bg-[var(--gradient-accent)] opacity-40 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-12 left-4 h-64 w-64 rounded-full bg-[var(--secondary)]/30 blur-[140px]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.5em] text-[var(--text-secondary)]">Your Plan</p>
            <h1 className="mt-3 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Your Personalized Diet Plan</h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">Tailored to your body and lifestyle with Indian flavours and smart summary metrics.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 text-white shadow-soft-card">
                <p className="text-sm uppercase tracking-[0.3em]">Live Insight</p>
                <p className="text-2xl font-semibold">{goal}</p>
                <p className="text-xs text-white/80">Auto-updates with your choices</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-soft)] p-4 bg-white/70">
                <p className="text-sm text-[var(--text-secondary)]">Current focus</p>
                <p className="text-xl font-semibold text-[var(--text-primary)]">{GOAL_TAGLINES[goal]}</p>
                <p className="text-xs text-[var(--text-secondary)]">Indian comfort meets macro science</p>
              </div>
            </div>
          </div>
        </section>

        <UserSummaryCard user={USER_STATS} />

        <PreferencePanel
          goal={goal}
          activity={activity}
          diet={diet}
          condition={condition}
          setGoal={setGoal}
          setActivity={setActivity}
          setDiet={setDiet}
          setCondition={setCondition}
        />

        <ResultDashboard
          calories={calories}
          bmi={bmi}
          water={waterIntake}
          mealPlan={mealPlan}
          weeklyPlan={weeklyPlan}
          progressPercent={progressPercent}
          bmiBadge={bmiCategory}
          goalTagline={GOAL_TAGLINES[goal]}
          condition={condition}
          stats={stats}
        />
      </div>
    </div>
  );
}

function UserSummaryCard({ user }) {
  return (
    <div className="grid gap-4 rounded-[28px] border border-[var(--border-medium)] bg-card p-5 shadow-soft-card sm:grid-cols-3">
      {[
        { label: "Age", value: `${user.age} yrs`, icon: "🧠" },
        { label: "Weight", value: `${user.weight} kg`, icon: "⚖️" },
        { label: "Height", value: `${user.height} cm`, icon: "📏" },
      ].map((item) => (
        <div key={item.label} className="space-y-1 text-center">
          <div className="text-2xl">{item.icon}</div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">{item.label}</p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
