"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    key: "focus",
    title: "מה הכי חשוב לך לשפר?",
    options: [
      { label: "עור הפנים", value: "facial" },
      { label: "גבות וריסים", value: "brows" },
      { label: "מראה לאירוע", value: "makeup" },
      { label: "טיפוח כללי", value: "beauty" },
    ],
  },
  {
    key: "style",
    title: "איזה סגנון את אוהבת?",
    options: [
      { label: "טבעי ועדין", value: "soft" },
      { label: "יוקרתי ומודגש", value: "glam" },
      { label: "נקי ומינימליסטי", value: "clean" },
      { label: "זוהר לאירוע", value: "event" },
    ],
  },
  {
    key: "time",
    title: "כמה זמן יש לך?",
    options: [
      { label: "עד 30 דקות", value: "short" },
      { label: "עד שעה", value: "medium" },
      { label: "יותר משעה", value: "long" },
    ],
  },
  {
    key: "goal",
    title: "מה המטרה שלך?",
    options: [
      { label: "רענון מהיר", value: "refresh" },
      { label: "טיפול עמוק", value: "deep" },
      { label: "הכנה לאירוע", value: "event" },
      { label: "תחזוקה קבועה", value: "maintenance" },
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
    score += 5;
  }

  if (answers.focus === "beauty" && service.category === "beauty") {
    score += 4;
  }

  if (answers.style === "glam" && service.category === "makeup") {
    score += 3;
  }

  if (answers.style === "event" && service.category === "makeup") {
    score += 4;
  }

  if (answers.style === "soft" && ["facial", "brows"].includes(service.category)) {
    score += 2;
  }

  if (answers.style === "clean" && ["facial", "nails", "brows"].includes(service.category)) {
    score += 2;
  }

  if (answers.time === "short" && service.durationMinutes <= 30) {
    score += 3;
  }

  if (answers.time === "medium" && service.durationMinutes <= 60) {
    score += 2;
  }

  if (answers.time === "long" && service.durationMinutes > 60) {
    score += 3;
  }

  if (answers.goal === "deep" && service.category === "facial") {
    score += 4;
  }

  if (answers.goal === "event" && service.category === "makeup") {
    score += 4;
  }

  if (answers.goal === "maintenance" && ["brows", "nails", "beauty"].includes(service.category)) {
    score += 3;
  }

  if (answers.goal === "refresh" && service.durationMinutes <= 45) {
    score += 2;
  }

  if (service.isPopular) {
    score += 1;
  }

  return score;
}

function getRecommendationReason(service: Service, answers: Answers) {
  if (answers.goal === "event" || service.category === "makeup") {
    return "מתאים במיוחד למראה מוקפד, זוהר ומוכן לצילומים או אירוע.";
  }

  if (service.category === "facial") {
    return "בחירה טובה לשיפור תחושת העור, רעננות ומראה נקי ובריא.";
  }

  if (service.category === "brows") {
    return "מומלץ ליצירת מסגרת פנים נקייה, טבעית ומחמיאה.";
  }

  if (service.category === "nails") {
    return "בחירה אלגנטית לתחזוקה נשית, נקייה ומסודרת לאורך זמן.";
  }

  return "מתאים כנקודת פתיחה חכמה לבניית תכנית טיפוח אישית.";
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
    <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-l from-espresso via-blush-700 to-gold-700 p-1 shadow-soft">
      <div className="absolute -left-16 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-44 w-44 rounded-full bg-gold-100/20 blur-3xl" />
      <div className="absolute inset-0 bg-espresso/20" />

      <div className="relative rounded-[2.8rem] border border-white/20 bg-white/10 p-6 text-white shadow-soft backdrop-blur-xl md:p-10">
        <div className="mb-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-gold-100 drop-shadow-sm">יועצת יופי דיגיטלית</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white drop-shadow-sm md:text-5xl">
              עני על כמה שאלות וקבלי המלצה חכמה לטיפול שמתאים לך.
            </h2>
          </div>
          <p className="rounded-[2rem] border border-white/15 bg-white/10 p-5 leading-9 text-cream shadow-sm backdrop-blur-md">
            חוויה אינטראקטיבית קצרה שמרגישה כמו ייעוץ אישי. כרגע ההמלצה מבוססת על כללים חכמים בצד הלקוח, ללא API חיצוני.
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
                  className="h-full rounded-full bg-gradient-to-l from-gold-100 to-blush-100"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
              <p className="mt-6 text-sm leading-7 text-white/85">
                כל תשובה עוזרת לדייק את ההמלצה לפי מטרה, זמן וסגנון אישי.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.key}
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 28 }}
                transition={{ duration: 0.35 }}
                className="rounded-[2rem] bg-pearl p-6 text-espresso shadow-soft"
              >
                <h3 className="text-3xl font-black text-espresso">{currentQuestion.title}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectAnswer(option.value)}
                      className="rounded-[1.5rem] border border-beige/70 bg-white px-5 py-5 text-right text-lg font-black text-espresso shadow-sm transition hover:border-blush-300 hover:bg-blush-50"
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black text-gold-100 drop-shadow-sm">התאמה אישית עבורך</p>
                <h3 className="mt-2 text-4xl font-black text-white drop-shadow-sm">הטיפולים שהכי מתאימים לך</h3>
              </div>
              <button type="button" onClick={resetQuiz} className="rounded-full border border-white/30 bg-white/15 px-6 py-3 font-black text-white shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white/25">
                התחילי מחדש
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {recommendations.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="rounded-[2rem] bg-pearl p-6 text-espresso shadow-soft"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gold-100 px-4 py-2 text-xs font-black text-gold-700">
                    המלצה {index + 1}
                  </div>
                  <h4 className="text-2xl font-black text-espresso">{service.name}</h4>
                  <p className="mt-3 min-h-24 leading-7 text-espresso/70">{getRecommendationReason(service, answers)}</p>
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
