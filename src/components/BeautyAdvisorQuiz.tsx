"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { services, type Service } from "@/data/services";

type Answers = {
  focus: string;
  style: string;
  time: string;
  goal: string;
};

type Question = {
  key: keyof Answers;
  title: string;
  subtitle: string;
  options: { label: string; value: string; icon: string }[];
};

const questions: Question[] = [
  {
    key: "focus",
    title: "מה הכי חשוב לך לשפר כרגע?",
    subtitle: "בחרי את האזור או התחושה שהכי חשובים לך היום.",
    options: [
      { label: "עור הפנים", value: "facial", icon: "✨" },
      { label: "גבות וריסים", value: "brows", icon: "◌" },
      { label: "מראה לאירוע", value: "makeup", icon: "★" },
      { label: "טיפוח כללי", value: "beauty", icon: "♡" },
    ],
  },
  {
    key: "style",
    title: "איזה סגנון הכי מדבר אלייך?",
    subtitle: "הסגנון עוזר לנו להבין אם ללכת על טבעי, זוהר או מינימליסטי.",
    options: [
      { label: "טבעי ועדין", value: "soft", icon: "🌸" },
      { label: "יוקרתי ומודגש", value: "glam", icon: "✦" },
      { label: "נקי ומינימליסטי", value: "clean", icon: "□" },
      { label: "זוהר לאירוע", value: "event", icon: "◆" },
    ],
  },
  {
    key: "time",
    title: "כמה זמן פנוי יש לך לטיפול?",
    subtitle: "נציע טיפול שמתאים גם ללוח הזמנים שלך.",
    options: [
      { label: "עד 30 דקות", value: "short", icon: "30" },
      { label: "עד שעה", value: "medium", icon: "60" },
      { label: "יותר משעה", value: "long", icon: "+" },
    ],
  },
  {
    key: "goal",
    title: "מה המטרה של הטיפול?",
    subtitle: "הבחירה הזו מדייקת את ההמלצה הסופית.",
    options: [
      { label: "רענון מהיר", value: "refresh", icon: "↺" },
      { label: "טיפול עמוק", value: "deep", icon: "✺" },
      { label: "הכנה לאירוע", value: "event", icon: "★" },
      { label: "תחזוקה קבועה", value: "maintenance", icon: "✓" },
    ],
  },
];

const initialAnswers: Answers = {
  focus: "",
  style: "",
  time: "",
  goal: "",
};

function scoreService(service: Service, answers: Answers) {
  let score = 0;

  if (answers.focus === service.category) {
    score += 6;
  }

  if (answers.focus === "beauty" && service.category === "beauty") {
    score += 5;
  }

  if (answers.style === "glam" && service.category === "makeup") {
    score += 4;
  }

  if (answers.style === "event" && service.category === "makeup") {
    score += 5;
  }

  if (answers.style === "soft" && ["facial", "brows"].includes(service.category)) {
    score += 3;
  }

  if (answers.style === "clean" && ["facial", "nails", "brows"].includes(service.category)) {
    score += 3;
  }

  if (answers.time === "short" && service.durationMinutes <= 30) {
    score += 4;
  }

  if (answers.time === "medium" && service.durationMinutes <= 60) {
    score += 3;
  }

  if (answers.time === "long" && service.durationMinutes > 60) {
    score += 4;
  }

  if (answers.goal === "deep" && service.category === "facial") {
    score += 5;
  }

  if (answers.goal === "event" && service.category === "makeup") {
    score += 5;
  }

  if (answers.goal === "maintenance" && ["brows", "nails", "beauty"].includes(service.category)) {
    score += 4;
  }

  if (answers.goal === "refresh" && service.durationMinutes <= 45) {
    score += 3;
  }

  if (service.isPopular) {
    score += 1;
  }

  return score;
}

function getRecommendationReason(service: Service, answers: Answers) {
  if (answers.goal === "event" || service.category === "makeup") {
    return "הטיפול מתאים למראה מוקפד, זוהר ומוכן לצילומים או אירוע, בלי לוותר על תחושה אלגנטית ונקייה.";
  }

  if (service.category === "facial") {
    return "הבחירה הזו מתאימה לשיפור תחושת העור, רעננות ומראה נקי, בריא ומואר יותר.";
  }

  if (service.category === "brows") {
    return "הטיפול מדויק למי שרוצה מסגרת פנים נקייה, טבעית ומחמיאה בלי מראה מוגזם.";
  }

  if (service.category === "nails") {
    return "בחירה אלגנטית לתחזוקה נשית, נקייה ומסודרת לאורך זמן, עם גימור מוקפד.";
  }

  return "בחירה טובה כנקודת פתיחה חכמה לבניית תכנית טיפוח אישית ומאוזנת.";
}

export function BeautyAdvisorQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = Math.round(((currentStep + 1) / questions.length) * 100);

  const recommendations = useMemo(() => {
    return [...services]
      .sort((a, b) => scoreService(b, answers) - scoreService(a, answers))
      .slice(0, 3);
  }, [answers]);

  const primaryRecommendation = recommendations[0];
  const secondaryRecommendations = recommendations.slice(1);

  function selectAnswer(value: string) {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.key]: value,
    };

    setAnswers(updatedAnswers);

    if (currentStep === questions.length - 1) {
      setShowResults(true);
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function resetQuiz() {
    setAnswers(initialAnswers);
    setCurrentStep(0);
    setShowResults(false);
  }

  return (
    <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1f1719] via-[#6f2c45] to-[#c29a54] p-1 shadow-soft">
      <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-gold-100/25 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-blush-200/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_24rem)]" />
      <div className="absolute inset-0 bg-espresso/25" />

      <div className="relative rounded-[2.8rem] border border-white/20 bg-white/10 p-6 text-white shadow-soft backdrop-blur-xl md:p-10">
        <div className="mb-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-gold-100 drop-shadow-sm">יועצת יופי דיגיטלית</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white drop-shadow-sm md:text-5xl">
              חוויית התאמה חכמה שמובילה אותך לטיפול הנכון.
            </h2>
          </div>
          <p className="rounded-[2rem] border border-white/15 bg-white/10 p-5 leading-9 text-cream shadow-sm backdrop-blur-md">
            עני על כמה שאלות קצרות וקבלי המלצה אישית לטיפול שמתאים למטרה, לסגנון ולזמן שלך. הכל קורה באתר, בלי API חיצוני וללא תשלום.
          </p>
        </div>

        {!showResults ? (
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="rounded-[2rem] border border-white/20 bg-white/15 p-6 shadow-sm backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between text-sm font-black text-cream">
                <span>שאלה {currentStep + 1} מתוך {questions.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/25">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-l from-gold-100 via-cream to-blush-100 shadow-[0_0_18px_rgba(248,239,217,0.45)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
              <p className="mt-6 text-sm leading-7 text-white/85">
                כל בחירה מדייקת את ההמלצה ומקרבת אותך לטיפול הנכון עבורך.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.key}
                initial={{ opacity: 0.85, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.85, x: 16 }}
                transition={{ duration: 0.28 }}
                className="rounded-[2rem] bg-pearl p-6 text-espresso shadow-soft ring-1 ring-white/70"
              >
                <p className="text-sm font-black text-blush-700">שלב {currentStep + 1}</p>
                <h3 className="mt-2 text-3xl font-black text-espresso">{currentQuestion.title}</h3>
                <p className="mt-3 leading-7 text-espresso/65">{currentQuestion.subtitle}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectAnswer(option.value)}
                      className="flex items-center gap-4 rounded-[1.5rem] border border-beige/70 bg-white px-5 py-5 text-right text-lg font-black text-espresso shadow-sm transition hover:border-gold-300 hover:bg-blush-50"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blush-100 to-gold-100 text-sm text-blush-700 shadow-sm">
                        {option.icon}
                      </span>
                      <span>{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0.9, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black text-gold-100 drop-shadow-sm">התאמה אישית עבורך</p>
                <h3 className="mt-2 text-4xl font-black text-white drop-shadow-sm">ההמלצה החכמה של יולי קוסמטיקס</h3>
              </div>
              <button type="button" onClick={resetQuiz} className="rounded-full border border-white/30 bg-white/15 px-6 py-3 font-black text-white shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white/25">
                התחילי מחדש
              </button>
            </div>

            {primaryRecommendation && (
              <div className="mb-5 rounded-[2.5rem] bg-pearl p-6 text-espresso shadow-soft md:p-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <div className="mb-4 inline-flex rounded-full bg-gold-100 px-4 py-2 text-xs font-black text-gold-700">
                      ההמלצה המובילה עבורך
                    </div>
                    <h4 className="text-3xl font-black text-espresso">{primaryRecommendation.name}</h4>
                    <p className="mt-4 leading-8 text-espresso/70">{getRecommendationReason(primaryRecommendation, answers)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm font-black text-espresso">
                    <div className="rounded-2xl bg-cream p-4">{primaryRecommendation.durationMinutes} דקות</div>
                    <div className="rounded-2xl bg-cream p-4">החל מ־₪{primaryRecommendation.price}</div>
                    <Link href={`/booking?service=${primaryRecommendation.id}`} className="col-span-2 rounded-full bg-espresso px-5 py-4 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
                      קבעי תור לטיפול המומלץ
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {secondaryRecommendations.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0.9, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-[2rem] bg-white/90 p-6 text-espresso shadow-soft"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gold-100 px-4 py-2 text-xs font-black text-gold-700">
                    אפשרות נוספת
                  </div>
                  <h4 className="text-2xl font-black text-espresso">{service.name}</h4>
                  <p className="mt-3 min-h-20 leading-7 text-espresso/70">{getRecommendationReason(service, answers)}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-black text-espresso">
                    <div className="rounded-2xl bg-cream p-3">{service.durationMinutes} דקות</div>
                    <div className="rounded-2xl bg-cream p-3">החל מ־₪{service.price}</div>
                  </div>
                  <Link href={`/booking?service=${service.id}`} className="mt-5 flex rounded-full bg-espresso px-5 py-3 text-center text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blush-700">
                    קבעי תור לטיפול
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
